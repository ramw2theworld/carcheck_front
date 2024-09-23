<script setup lang="ts">
import carDefaultImage from '/images/car-icon.png';
import ApiService from '~/services/apiService';
const carRegistrationSearchStore = useCarRegistrationSearchStore();
const tokenStore = useTokenStore();
const subscriptionStore = useSubscriptionStore();
const planStore = usePlanStore();
const authStore = useAuthStore();

const vbrand_logo = computed(() => carRegistrationSearchStore.vbrand_logo);
const apiService = new ApiService();

const errorMessage = ref(null);
const reportText = ref("Download Report")

onMounted(() => {
    // console.log("vbrand_logo: ", vbrand_logo.value);
});

const downloadReport = async () => {
    reportText.value = "Downloading...";
    if (tokenStore.getToken && tokenStore.getStatus) {
        let subscription = await subscriptionStore.getUserSubscription();
        let hasSubscription = await subscriptionStore.getHasSubscription();

        if ((hasSubscription.request_count > 0) && hasSubscription.active) {
            try {
                let report_type="";
                if(subscription?.plan?.plan_code=="48h-export-subscription"){
                    report_type = "export";
                }else if(subscription?.plan?.plan_code=="48h-basic-subscription"){
                    report_type = "basic";
                }else{
                    report_type = "single-offer";
                }
                const response = await apiService.post('users/download-report', {
                    email: authStore.user?.email,
                    report_type: report_type
                }, { responseType: 'blob' });

                if (response.success && response.payload) {
                    const downloadUrl = response.payload;

                    const link = document.createElement('a');
                    link.href = downloadUrl;
                    link.download = `report-${reportDate()}.pdf`;
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    reportText.value = "Downloaded";
                } else {
                    reportText.value = "Download Report";
                    errorMessage.value = "Failed to retrieve the report data";
                    console.error("Error: Invalid response status", response.success);
                }

            } catch (error) {
                reportText.value = "Download Report";
                if(error.data)
                    errorMessage.value = error.data.error;
            }
        } else {
            reportText.value = "Download Report";
            console.error("No remaining report downloads available.");
            navigateTo('/payment/plans')
        }
    } else {
        navigateTo('/auth/login');
    }
};

const reportDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

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
                    <button @click.prevent="downloadReport"
                        class="rounded bg-orange-500 text-white text-lg px-20 py-2 mt-6">{{ reportText }}</button>
                    
                    <p v-if="errorMessage" id="standard_error_help" class="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium"></span> {{ errorMessage }}</p>
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