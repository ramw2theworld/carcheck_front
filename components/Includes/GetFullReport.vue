<script setup lang="ts">
import { defineProps, ref, onMounted, computed, reactive, watch } from 'vue';
import carDefaultImage from '/images/car-icon.png';
import ApiService from '~/services/apiService';
import { navigateTo } from 'nuxt/app';

// Store initialization
const carRegistrationSearchStore = useCarRegistrationSearchStore();
const tokenStore = useTokenStore();
const subscriptionStore = useSubscriptionStore();
const authStore = useAuthStore();
const planStore = usePlanStore();

// Computed properties and refs
const vbrand_logo = computed(() => carRegistrationSearchStore.vbrand_logo);
const vehicleImageUrl = computed(() => carRegistrationSearchStore.vehicleImageUrl);
const apiService = new ApiService();
const errorMessage = ref<string | null>(null);
const showPasswordField = ref(false);
const reportText = ref<string>('');
const form = reactive({
    email: '',
    password: '',
});
const getFullReportButton = ref('Get full report');
const getFullReportY = ref('Get full report');
const hasSubscription = computed(() => subscriptionStore.hasSubscription);

// Props
const props = defineProps({
    getFullReport: {
        type: String,
        default: 'Get full report',
    },
    width: {
        type: String,
        default: 'w-72',
    },
});
// Helper function to format date
const reportDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

// Main function to handle report download
const downloadReport = async () => {
    getFullReportY.value = "Downloading...";
    const isAuthenticated = tokenStore.getToken && tokenStore.getStatus;
    
    if (!isAuthenticated) {
        return navigateTo('/auth/login');
    }

    try {
        const hasSubscription = await subscriptionStore.getHasSubscription();
        const subscription = await subscriptionStore.getUserSubscription();
        const user = authStore.user;
        let email = user?.email;
        const userSubscription = await subscriptionStore.fetchUserSubscription(email);

        await carRegistrationSearchStore.fetchVehicleDimension();
        await carRegistrationSearchStore.fetchVehicleGeneralInfo();
        await carRegistrationSearchStore.fetchPerformance();

        let car_data = [
            { vehicleStatus : carRegistrationSearchStore.vehicleStatus },
            { vehicleDetails : carRegistrationSearchStore.vehicleDetails },
            { MOTHistory : carRegistrationSearchStore.MOTHistory },
            { technicalDetails : carRegistrationSearchStore.technicalDetails },
            { classificationDetails : carRegistrationSearchStore.classificationDetails },
            { vehicleHistory : carRegistrationSearchStore.vehicleHistory },
            { vehicleValuationsList : carRegistrationSearchStore.vehicleValuationsList },
            { dimensions : carRegistrationSearchStore.dimensions },
            { general : carRegistrationSearchStore.general },
            { vehicleRegistration : carRegistrationSearchStore.vehicleRegistration },
            { motVed : carRegistrationSearchStore.motVed },
            { smmtDetails : carRegistrationSearchStore.smmtDetails },
            { performance : carRegistrationSearchStore.performance },
            { vbrand_logo : carRegistrationSearchStore.vbrand_logo },
            { vehicleImageUrl : carRegistrationSearchStore.vehicleImageUrl },
            { getFullReportText : carRegistrationSearchStore.getFullReportText },
            { stolenRecord : carRegistrationSearchStore.stolenRecord },
            { writeOff : carRegistrationSearchStore.writeOff },
            { riskRecords : carRegistrationSearchStore.riskRecords },
            { financeRecords : carRegistrationSearchStore.financeRecords }
        ];
        if (hasSubscription?.active || hasSubscription?.request_count > 0 || user.request_count > 0) {
            // let report_type = '';
            // if (subscription?.plan?.plan_code === '48h-export-subscription') {
            //     report_type = '48h-expert-subscription';
            // } else if (subscription?.plan?.plan_code === '48h-basic-subscription') {
            //     report_type = '48h-basic-subscription';
            // } else if (subscription?.plan?.plan_code === 'premium-3x') {
            //     report_type = subscription.plan.plan_code;
            // } else {
            //     report_type = 'single-offer';
            // }

            if(!subscription){
                errorMessage.value = "You don't have any active subscription. Please buy or upgrade plan.";
            }

            const response = await apiService.post(
                'users/download-report',
                {
                    email: authStore.user?.email,
                    report_type: subscription?.plan?.plan_code,
                    car_data: car_data
                },
                { responseType: 'blob' }
            );
            if (response.success && response.payload) {
                const payload = response.payload;
                const downloadUrl = payload.report_link;
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.download = `report-${reportDate()}.pdf`;
                link.target = '_blank';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                getFullReportY.value = "Downloaded";

            } else {
                throw new Error('Failed to retrieve the report data.');
                getFullReportButton.value = "Get full report";
                getFullReportY.value = "Get full report";
            }
        } else {
            getFullReportButton.value = "Get full report";
            getFullReportY.value = "Get full report";

            return navigateTo('/payment/plans');
        }
    } catch (error) {
        debugger
        getFullReportY.value = "Get full report";
        errorMessage.value = error?.data?.message || 'Error occurred during the subscription check.';
        getFullReportButton.value = "Get full report";
    }
    finally{
        setTimeout(()=>{
            errorMessage.value ="";
            getFullReportY.value = "Get full report";
        }, 3000);
    }
};

const handleGetFullReport = async () => {
    getFullReportY.value = "Processing...";
    try {
        const response = await apiService.post('users/check-email-exist', { email: form.email });
        if (response.success && response.payload) {
            let payload = response.payload;
            if(payload.user_type && payload.user_type=="newlyCreatedUser"){
                const tokenStore = useTokenStore();
                tokenStore.setToken(payload.access_token, payload.access_token);
                await authStore.setUser(payload.user);
                navigateTo('payment/plans');
            }else{
                showPasswordField.value = true;
            }
        } else {
            getFullReportY.value = "Get full report";
            throw new Error('Failed to retrieve the report data.');
        }
    } catch (error) {
        getFullReportY.value = "Get full report";
        errorMessage.value = error?.data?.message || 'Error occurred while verifying email.';
    }
};

const handleLoginSubmit = async () => {
    getFullReportY.value = "Processing...";

    try {
        const response = await authStore.makeLogin(form);
        if (!response.success){
            errorMessage.value = "Login failed.";
            getFullReportY.value = "Get full report";
        }else{
            let payload = response.payload;
            //make frontend log in
            const tokenStore = useTokenStore();
            tokenStore.setToken(payload.access_token, payload.access_token);
            await authStore.setUser(payload.user);

            if(payload.hasSubscription){
                let hasSubscription = payload.hasSubscription;

                if(hasSubscription.active){
                    downloadReport()
                }else{
                    navigateTo('payment/plans');
                }
            }else{
                navigateTo('payment/plans');
            }
            getFullReportY.value = "Get full report";
        }
    } catch (error) {
        getFullReportY.value = "Get full report";
        errorMessage.value = error?.data?.message || 'Something went wrong. Please try again!';
    }
};

// Watch for updates to the full report text
watch(
    () => carRegistrationSearchStore.getFullReportText,
    (textVal) => {
        if (textVal) {
            reportText.value = textVal;
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="w-full">
    <form @submit.prevent="handleGetFullReport" v-if="(!authStore.user || Object.keys(authStore.user).length === 0) && !showPasswordField">
            <FormInputText id="email" v-model="form.email" placeholder="Enter your email address" type="text" />
            <button :class="['bg-[#FF7400] text-white text-xl rounded-lg py-2', width]">
                {{ getFullReportY }}
            </button>
        </form>

        <form @submit.prevent="handleLoginSubmit" v-else-if="showPasswordField">
            <FormInputText id="password" v-model="form.password" placeholder="Enter your password" type="password" />
            <button :class="['bg-[#FF7400] text-white text-xl rounded-lg py-2', width]">
                {{ getFullReportY }}
            </button>
        </form>

        <button v-else @click.prevent="downloadReport"
            :class="['bg-[#FF7400] text-white text-xl rounded-lg py-2', width]">
            {{ getFullReportY }}
        </button> 
        <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
        <NuxtLink to="/payment/plans" v-if="hasSubscription?.active"
        class="pull-right">
            Buy More
        </NuxtLink>
    </div>
</template>