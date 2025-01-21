<script setup>
import { ref, reactive } from 'vue';
const auth = useAuthStore();
const resetToken = ref("Submit");
const isProcessing = ref(false);
const errorMessage = ref(null);

definePageMeta({
    title: 'Token for password reset',
    meta: [
        { hid: 'Login for fetching Registration number details', name: 'Login for fetching Registration number details', content: 'Login for fetching Registration number details' }
    ],
    middleware: ['check-email'],
});

const form = reactive({
    reset_token: "",
    email: ""

});

const errors = reactive({
    reset_token: null,
});

// Validate form
const validateForm = () => {
    errors.reset_token = null;

    if (!form.reset_token) {
        errors.reset_token = "Reset token is required";
    }

    return !errors.reset_token;
};

const handleTokenForPasswordResetSubmit = async () => {
    errorMessage.value = null;

    if (!validateForm()) return;

    isProcessing.value = true;
    resetToken.value = "Processing...";

    try {
        form.email = localStorage.getItem("email-for-token");
        let response = await auth.submitTokenForPasswordReset(form);
        if (response.success && response.data) {
            let eData = response.data;
            navigateTo('/auth/reset-password');
        } else {
            throw new Error("Invalid email");
        }
    } catch (error) {
        errorMessage.value = error?.data?.message || error?.response?.message || "An unexpected error occurred while trying to log in.";
        console.log("error:", errorMessage.value);
    } finally {
        resetToken.value = "Submit";
        isProcessing.value = false;
    }
};

</script>
<template>
    <div class="min-h-screen flex items-center">
        <div class="w-full">
            <div
                class="card bg-white p-8 rounded-lg shadow-xl border-2 border-dark-500 border-solid py-4 md:w-3/4 mx-auto lg:w-1/3">
                <h3 class="text-center text-2xl font-semibold">Token Verifying</h3>

                <form @submit.prevent="handleTokenForPasswordResetSubmit">
                    <div class="mb-6">
                        <FormLabel for="reset_token">Token</FormLabel>
                        <FormInputText id="reset_token" v-model="form.reset_token" placeholder="Enter your token"
                            type="text" />
                        <span v-if="errors.reset_token" class="text-red-500">{{ errors.reset_token }}</span>
                    </div>

                    <div class="row mb-2" v-if="errorMessage">
                        <div class="alert alert-danger">
                            <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> {{ errorMessage }}</p>
                        </div>

                    </div>
                    
                    <div class="flex justify-between items-center">
                        <ButtonPrimary :disabled="isProcessing">{{ resetToken }}</ButtonPrimary>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>