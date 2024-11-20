<script setup lang="ts">
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import type { StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement, StripeElements } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ApiService from '~/services/apiService';
import { useSubscriptionStore } from '@/stores/subscription';
import { useCarRegistrationSearchStore } from '@/stores/carRegistrationSearch';

const auth = useAuthStore();
const plan = usePlanStore();
const subscriptionStore = useSubscriptionStore();
const registrationSearchStore = useCarRegistrationSearchStore();

interface BillingDetails {
    name: string;
}

const envConfig = useRuntimeConfig();

const apiService = new ApiService();
const stripePromise = loadStripe(envConfig.public.stripe_public_key as string);
const loading = ref(false);
const cardComplete = ref(false);
const termsAccepted = ref(false);
const cardholderName = ref('');
const buttonProcess = ref('PROCESS');

let elements: StripeElements;
let cardNumberElement: StripeCardNumberElement;
let cardExpiryElement: StripeCardExpiryElement;
let cardCvcElement: StripeCardCvcElement;
const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);
const formValidationMessage = ref<string | null>(null);
const customerId = ref('');
const paymentMethodId = ref('');

const isFormValid = computed(() => {
    return termsAccepted.value && cardholderName.value && cardComplete.value;
});


const style = {
    base: {
        color: '#32325D',
        fontSize: '16px',
        '::placeholder': {
            color: '#AAB7C4',
        }
    },
    invalid: {
        color: '#FA755A',
        iconColor: '#FA755A',
    },
};

onMounted(async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    if (stripe) {
        elements = stripe.elements();
        cardNumberElement = elements.create('cardNumber', { style: { base: { color: '#32325D', fontSize: '16px' } } });
        cardNumberElement.mount('#card-number-element');
        cardExpiryElement = elements.create('cardExpiry', { style });
        cardExpiryElement.mount('#card-expiry-element');
        cardCvcElement = elements.create('cardCvc', { style });
        cardCvcElement.mount('#card-cvc-element');

    }
});
async function handleCheckoutClick() {
    buttonProcess.value = "PROCESSING...";
    try {
        resetError();
        // Validate form inputs
        if (!cardholderName.value) {
            formValidationMessage.value = "Cardholder's name is required.";
            buttonProcess.value = "PROCESS";
            return;
        }
        if (!termsAccepted.value) {
            formValidationMessage.value = "You must accept the terms and conditions.";
            buttonProcess.value = "PROCESS";
            return;
        }
        loading.value = true;
        const stripe = await stripePromise;
        if (!stripe || !elements) {
            console.error('Stripe.js has not yet loaded.');
            buttonProcess.value = "PROCESS";
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardNumberElement,
            billing_details: {
                name: cardholderName.value,
            },
        });

        if (error) {
            console.error(error);
            (errorMessage.value as any) = error.message;
            buttonProcess.value = "PROCESS";
            return;
        }
        const response = await apiService.post('payment/token/create', {
            payment_method_id: paymentMethod.id,
            billing_details: { name: cardholderName.value },
            plan: plan.getSelectedPlan,
        });

        
        if ((response as any).payload.paymentStatus !== 'succeeded') {
            const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment((response as any).payload.clientSecret, {
                payment_method: paymentMethod.id,
            });
            if (confirmError) {
                buttonProcess.value = "PROCESS";
                (errorMessage.value as any) = confirmError.message;
                return;
            }
        }
        const customer_id = (response as any).payload.customerId;
        customerId.value = customer_id;
        paymentMethodId.value = paymentMethod.id;

        // handling single offer plan
        if(plan.getSelectedPlan){
            let selectedPlan = plan.getSelectedPlan;
            if(selectedPlan.plan_code === "single-offer"){
                let payload = response.payload;
                if (payload?.hasSubscription) {
                    await subscriptionStore.setHasSubscription(payload.hasSubscription);
                }
                setTimeout(() => {
                    buttonProcess.value = "DONE!";
                    successMessage.value = "Payment done successfully.";
                    navigateTo('/report');
                }, 3000);
            }else{
                debugger
                await createSubscription(selectedPlan);
            }
        }
    } catch (error) {

        if(!error.data?.success){
            errorMessage.value = error.data.message;

        }
        console.error({ error });
        buttonProcess.value = "PROCESS";
    } finally {
        loading.value = false;
        buttonProcess.value = "PROCESS";
    }
}

async function createSubscription(selectedPlan) {
    const user = auth.getCurrentUser;
    buttonProcess.value = "ALMOST THERE!";
    try {
        const response = await apiService.post("payment/process", {
            customer_id: customerId.value,
            payment_method_id: paymentMethodId.value,
            email: user.email,
            billing_details: {
                name: cardholderName.value,
            },
            plan_id: selectedPlan.id,
        });
        if(response.success){
            buttonProcess.value = "DONE!";
        }
        let payload = response.payload;
        if (payload?.hasSubscription) {
            await subscriptionStore.setHasSubscription(payload.hasSubscription);
        }

        if (payload?.subscription) {
            await subscriptionStore.setCurrentSubscription(payload.subscription);
        }

        if (payload?.plan) {
            await plan.setSelectedPlan(payload.plan);
        }

        if(payload?.car_data){
            // vehicle MOT History
            const vehicleMotHistoryObj = payload.car_data.find(item => item.MotHistory);

            if (vehicleMotHistoryObj && vehicleMotHistoryObj.setMOTHistory) {
                await registrationSearchStore.setMOTHistory(vehicleMotHistoryObj.MotHistory.RecordList);
            } else {
                console.error("Vehicle MOT History not found in car data");
            }
            // vehicle History
            const vehicleHistoryObj = payload.car_data.find(item => item.VehicleHistory);

            if (vehicleHistoryObj && vehicleHistoryObj.VehicleHistory) {
                await registrationSearchStore.setVehicleHistory(vehicleHistoryObj.VehicleHistory);
            } else {
                console.error("Vehicle History not found in car data");
            }

            // vehicle General
            const vehicleTechDetailsObj = payload.car_data.find(item => item.TechnicalDetails);

            if (vehicleTechDetailsObj && vehicleTechDetailsObj.vehicleTechnicalDetailsObj) {
                await registrationSearchStore.setVehicleGeneralInfo(vehicleTechDetailsObj.vehicleTechnicalDetailsObj.General);
            } else {
                console.error("Vehicle General not found in car data");
            }

            // vehicle Performance
            const technicalDetailsObj = payload.car_data.find(item => item.TechnicalDetails);

            if (technicalDetailsObj && technicalDetailsObj.vehicleTechnicalDetailsObj) {
                await registrationSearchStore.setPerformance(technicalDetailsObj.vehicleTechnicalDetailsObj.Performance);
            } else {
                console.error("Vehicle Performance not found in car data");
            }

            // vehicle Dimesion
            const vehicleTechnicalDetailsObj = payload.car_data.find(item => item.TechnicalDetails);

            if (vehicleTechnicalDetailsObj && vehicleTechnicalDetailsObj.vehicleTechnicalDetailsObj) {
                await registrationSearchStore.setVehicleDimension(vehicleTechnicalDetailsObj.vehicleTechnicalDetailsObj.Dimensions);
            } else {
                console.error("Vehicle Dimension not found in car_data");
            }
            // vehicle SmmtDetails
            const vehicleSetSmmtDetailsObj = payload.car_data.find(item => item.SmmtDetails);

            if (vehicleSetSmmtDetailsObj && vehicleSetSmmtDetailsObj.SmmtDetails) {
                await registrationSearchStore.setSmmtDetails(vehicleSetSmmtDetailsObj.SmmtDetails);
            } else {
                console.error("SmmtDetails not found in car data");
            }

            // vehicle ClassificationDetails
            const vehicleClassificationDetailsObj = payload.car_data.find(item => item.ClassificationDetails);

            if (vehicleClassificationDetailsObj && vehicleClassificationDetailsObj.ClassificationDetails) {
                await registrationSearchStore.setClassificationDetails(vehicleClassificationDetailsObj.ClassificationDetails);
            } else {
                console.error("ClassificationDetails not found in car data");
            }

            // vehicle registration
            const vehicleRegistrationObj = payload.car_data.find(item => item.VehicleRegistration);

            if (vehicleRegistrationObj && vehicleRegistrationObj.VehicleRegistration) {
                await registrationSearchStore.setVehicleRegistration(vehicleRegistrationObj.VehicleRegistration);
            } else {
                console.error("VehicleRegistration not found in car_data");
            }

            // vehicle status
            const vehicleStatusObj = payload.car_data.find(item => item.VehicleStatus);

            if (vehicleStatusObj && vehicleStatusObj.VehicleStatus && vehicleStatusObj.VehicleStatus.MotVed) {
                await registrationSearchStore.setMotVed(vehicleStatusObj.VehicleStatus.MotVed);
            } else {
                console.error("Vehicle status not found in car data");
            }
        }
        
        // if (selectedPlan.plan_code === '48h-basic-subscription') {
        //     navigateTo('/vehicle/basic-report');
        // } else if (selectedPlan.plan_code === '48h-export-subscription') {
        //     navigateTo('/vehicle/export-report');
        // } else {
        //     navigateTo('/vehicle/single-offer-report');
        // }
        setTimeout(() => {
            successMessage.value = "Payment done successfully.";
            navigateTo('/report');
        }, 3000);
        buttonProcess.value = "REDIRECTING!";
        
    } catch (error) {
        buttonProcess.value = "FAILED!";
        console.error("Error creating subscription: ", error);
        if (error.data && error.data.success === false) {
            errorMessage.value = error.data.message;
        } else {
            errorMessage.value = "An unexpected error occurred while creating the subscription.";
        }
    }
}

function resetError() {
    errorMessage.value = null;
    formValidationMessage.value = null;
}

watch(errorMessage, (newErrorMessage) => {
    if (newErrorMessage) {
        setTimeout(() => {
            errorMessage.value = null;
        }, 5000);
    }
});

const planPrice = computed(() => {
  const selectedPlan = plan.getSelectedPlan;

  if (!selectedPlan) return '0';
  return selectedPlan.plan_code !== 'single-offer' 
    ? selectedPlan.amount_trial 
    : selectedPlan.amount_premium;
});

</script>
<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
            <OrderSummary />
            <div>
                <div class="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                   
                    <div class="flex flex-row items-center justify-between ">
                        <h1 class="text-lg font-bold px-2">Make Payment</h1>
                        <span class="text-[#0F1829] text-xs rounded bg-[#FF7400] px-2 py-0.5"
                            >£{{ planPrice }}</span>
                    </div>
                        <form @submit.prevent="handleCheckoutClick">
                            <div class="alert alert-danger" v-if="errorMessage">
                                <span class="alert alert-danger">{{ errorMessage }}</span>
                            </div>
                            <div class="alert alert-success" v-if="successMessage">
                                <span class="alert alert-success">{{ successMessage }}</span>
                            </div>
                            <div class="mb-4 w-full">
                                <label for="cardholder-name" class="block mb-2 text-sm font-bold">Cardholder's Name</label>
                                <div class="flex items-center py-1 border-2 border-[#4A2EB6] w-full overflow-hidden ">
                                    <div class="px-2">
                                        <img src="/assets/svg/cardName.svg" alt="" />
                                    </div>
                                    <input v-model="cardholderName" type="text" id="cardholder-name"
                                        placeholder="John Strawzen"
                                        class="w-full px-3 py-2 uppercase focus:border-none focus:outline-none bg-transparent" />
                                </div>
                            </div>
                            <div class="mb-4 w-full">
                                <label for="card-number-element" class="block mb-2 text-sm font-bold">Card Number</label>
                                <div class="flex items-center py-1 border-2 border-[#4A2EB6] overflow-hidden ">
                                    <div class="px-2">
                                        <img src="/assets/svg/cardNumber.svg" alt="" />
                                    </div>
                                    <div id="card-number-element" class="px-3 py-2 border-none w-full">
                                    </div>
                                </div>
                            </div>
                            <div class="flex mb-4 space-x-3 w-full">
                                <div class="w-1/2">
                                    <label for="card-expiry-element" class="block mb-2 text-sm font-bold">Expiry</label>
                                    <div class="flex items-center py-1 border-2 border-[#4A2EB6] overflow-hidden ">
                                        <div class="px-2">
                                            <img src="/assets/svg/cardExpiry.svg" alt="" />
                                        </div>
                                        <div id="card-expiry-element" class="px-3 py-2 border-none w-full">
                                        </div>
                                    </div>
                                </div>

                                <div class="w-1/2">
                                    <label for="card-cvc-element" class="block mb-2 text-sm font-bold">CVV</label>
                                    <div class="flex items-center py-1 border-2 border-[#4A2EB6] overflow-hidden ">
                                        <div class="px-2">
                                            <img src="/assets/svg/cardCvv.svg" alt="" />

                                        </div>
                                        <div id="card-cvc-element" class="px-3 py-2 border-none w-full">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flex items-center justify-center w-full space-x-2">
                                <input type="checkbox" v-model="termsAccepted" id="agree-terms" class="mr-2 w-5 h-5"
                                    style="border: solid #4A2EB6 !important;" />
                                <label for="agree-terms" class="flex-1">I agree to the
                                    <a href="/terms" target="_blank" class="text-primary-yellow"> terms & conditions</a> of
                                    service.
                                </label>
                            </div>

                            <div v-if="formValidationMessage" class="text-red-500 mt-2">
                                {{ formValidationMessage }}
                            </div>

                            <div class="flex items-centder justify-dcenter h-12 mt-5">
                                <button type="submit"
                                    class="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 
                                    focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    {{ buttonProcess }}
                                </button>


                            </div>

                            <div v-show="errorMessage"
                                class="absolute w-[25.5rem] h-[30.5rem] top-80 bg-white z-10 flex items-center justify-center p-5">
                                <p class="text-red-500 ">{{ errorMessage }}</p>
                                <span
                                    class="absolute top-5 right-5 rounded-full  bg-red-500 h-7 w-7 flex items-center justify-center cursor-pointer hover:bg-red-600"
                                    @click="resetError">
                                    <font-awesome-icon :icon="faTimes" class="text-white" /> 
                                </span>
                            </div> 
                        </form> 
                </div>

            </div>
        </div>
    </section>



</template>
<style scoped>
/* Add your styles here */
#card-number-element>div,
#card-expiry-element div,
#card-cvc-element>div {
    background-color: transparent;
    border: none;
    outline: none;
    width: 100% !important;
    padding: 0 10px;
    color: #000 !important;
}

input {
    background: none;
    border: none;
    outline: none;
}

input:focus {
    outline: none;
    border: none;
}
</style>
