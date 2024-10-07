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

// Computed properties and refs
const vbrand_logo = computed(() => carRegistrationSearchStore.vbrand_logo);
const apiService = new ApiService();
const errorMessage = ref<string | null>(null);
const showPasswordField = ref(false);
const reportText = ref<string>('');
const form = reactive({
    email: '',
    password: '',
});
const getFullReportButton = ref('Get full report');
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
console.log("check auth: ", authStore.user);
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
    carRegistrationSearchStore.setFullReportText('Downloading...');
    const isAuthenticated = tokenStore.getToken && tokenStore.getStatus;

    if (!isAuthenticated) {
        carRegistrationSearchStore.setFullReportText('Get full report');
        return navigateTo('/auth/login');
    }

    try {
        const hasSubscription = await subscriptionStore.getHasSubscription();
        const subscription = await subscriptionStore.getUserSubscription();
        const user = authStore.user;
        debugger;

        if (hasSubscription?.active || hasSubscription?.request_count > 0 || user.request_count > 0) {
            let report_type = '';
            if (subscription?.plan?.plan_code === '48h-export-subscription') {
                report_type = 'export';
            } else if (subscription?.plan?.plan_code === '48h-basic-subscription') {
                report_type = 'basic';
            } else {
                report_type = 'single-offer';
            }

            const response = await apiService.post(
                'users/download-report',
                {
                    email: authStore.user?.email,
                    report_type: report_type,
                },
                { responseType: 'blob' }
            );
            debugger
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
                carRegistrationSearchStore.setFullReportText('Downloaded');
            } else {
                throw new Error('Failed to retrieve the report data.');
            }
        } else {
            carRegistrationSearchStore.setFullReportText('Get full report');
            return navigateTo('/payment/plans');
        }
    } catch (error) {
        debugger
        carRegistrationSearchStore.setFullReportText('Get full report');
        errorMessage.value = error?.data?.message || 'Error occurred during the subscription check.';
    }
};

const handleGetFullReport = async () => {
    try {
        const response = await apiService.post('users/check-email-exist', { email: form.email });
        if (response.success && response.payload) {
            debugger
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
            debugger
            throw new Error('Failed to retrieve the report data.');
        }
    } catch (error) {
        debugger
        errorMessage.value = error?.data?.message || 'Error occurred while verifying email.';
    }
};

const handleLoginSubmit = async () => {
    try {
        const response = await authStore.makeLogin(form);
        debugger
        if (!response.success){
            errorMessage.value = "Login failed."
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
        }
    } catch (error) {
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
        <!-- Show email input if the user has no subscription -->
        <form @submit.prevent="handleGetFullReport" v-if="!authStore.user && !hasSubscription?.active && !showPasswordField">
            <FormInputText id="email" v-model="form.email" placeholder="Enter your email address" type="text" />
            <button :class="['bg-[#FF7400] text-white text-xl rounded-lg py-2', width]">
                {{ getFullReport }}
            </button>
        </form>

        <!-- Show password input and submit login if email is verified -->
        <form @submit.prevent="handleLoginSubmit" v-else-if="showPasswordField">
            <FormInputText id="password" v-model="form.password" placeholder="Enter your password" type="password" />
            <button :class="['bg-[#FF7400] text-white text-xl rounded-lg py-2', width]">
                {{ getFullReport }}
            </button>
        </form>

        <!-- Show download button if the user is authenticated -->
        <button v-else @click.prevent="downloadReport"
            :class="['bg-[#FF7400] text-white text-xl rounded-lg py-2', width]">
            {{ getFullReport }}
        </button> 
        <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    </div>
</template>