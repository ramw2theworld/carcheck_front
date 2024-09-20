<script setup lang="ts">
import { defineProps } from 'vue'
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
const reportText = ref("")

onMounted(() => {
    console.log("vbrand_logo: ", vbrand_logo.value);
});

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

const reportDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const downloadReport = async () => {
    carRegistrationSearchStore.setFullReportText("Downloading...");
    if (tokenStore.getToken && tokenStore.getStatus) {
        let subscription = await subscriptionStore.getUserSubscription();
        let hasSubscription = await subscriptionStore.getHasSubscription();
        console.log("subs: ", subscription);
        console.log("hasSubs: ", hasSubscription);

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

                    carRegistrationSearchStore.setFullReportText("Downloaded");
                } else {
                    carRegistrationSearchStore.setFullReportText("Get full report");
                    errorMessage.value = "Failed to retrieve the report data";
                    console.error("Error: Invalid response status", response.success);
                }

            } catch (error) {
                carRegistrationSearchStore.setFullReportText("Get full report");
                errorMessage.value = error.message || "Error occurred while downloading.";
                if(error.data)
                    errorMessage.value = error.data.error;
            }
        }
        else{
            carRegistrationSearchStore.setFullReportText("Get full report");
            navigateTo('/payment/plans');
        }

        
    }else{
        carRegistrationSearchStore.setFullReportText("Get full report");
        navigateTo('/auth/login');
    }
}

watch(
  () => carRegistrationSearchStore.getFullReportText,
  (textVal) => {
    if (textVal) {
      console.log('Full report text updated:', textVal);
    }
  },
  { immediate: true }
);
</script>
<template>
    <button
        @click.prevent="downloadReport"
        :class="['bg-[#FF7400] text-white text-xl rounded-lg py-2', width]">
        {{ getFullReport }}
    </button>
    {{ errorMessage }}
</template>