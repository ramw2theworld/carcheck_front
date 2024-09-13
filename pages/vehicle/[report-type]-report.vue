<script setup lang="ts">
import { useRouter } from 'vue-router';

const carRegistrationSearchStore = useCarRegistrationSearchStore();
const tokenStore = useTokenStore();
const subscriptionStore = useSubscriptionStore();
const planStore = usePlanStore(); 
const router = useRouter();

const vbrand_logo = computed(() => carRegistrationSearchStore.vbrand_logo);

onMounted(() => {
  console.log("vbrand_logo: ", vbrand_logo.value);
});

const downloadReport = () => {
    if (tokenStore.getToken && tokenStore.getStatus) { 
        let hasSubscription = subscriptionStore.getHasSubscription;

        if (hasSubscription) {
            if(hasSubscription.active){
                console.log("subs: ", subscriptionStore);
            }
            console.log("hello there for the stests sldfjlsdjflkflsjdfl");
            router.push('/payment/plans');
        } else if (planStore.selectedPlan) {
            router.push('/payment/checkout');
        } else {
            router.push('/payment/plans');
        }
    } else {
        router.push('/auth/login');
    }
};

const reportDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
import carDefaultImage from '/images/car-icon.png';

</script>


<template>
    <div>
        <div class="flex flex-row justify-center gap-28 py-10 border-2">
            <div class="flex flex-col justify-center items-center">
                <SearchBar />
                <p class="mt-6 text-xs"><span class="font-bold">Report Date:</span> {{ reportDate() }}</p>
                <p class="font-bold my-5 text-lg">BMW Model 2016</p>
                <img :src="vbrand_logo" v-if="vbrand_logo" class="w-26" alt="Brand Logo">
                <img :src="carDefaultImage" v-else alt="" class="w-full rounded-lg">
            </div>
            <div>
                <div class="flex flex-col justify-center items-center">
                    <h1 class="text-2xl font-bold">YOUR <span class="text-orange-500">CAR REPORT</span> IS READY!</h1>
                    <button @click.prevent="downloadReport" class="rounded bg-orange-500 text-white text-lg px-20 py-2 mt-6">Download Report</button>
                </div>
                <Features></Features>
            </div>
        </div>
        <!-- additional components follow the same pattern -->
        <VehicleGeneralInformation />
        <VehicleEngineAndFuel />
        <VehicleDamageHistory />
        <VehiclePlateChanged />
        <VehicleValuation />
        <VehicleRiskAssessments />
        <VehicleOwnerHistory />
        <VehicleRegistrations />
        <VehicleTaxCalculation />
        <VehicleFinanceCheck />
        <VehicleWriteOff />
        <VehicleMotHistory />
    </div>
</template>