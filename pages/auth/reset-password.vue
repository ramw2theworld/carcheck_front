<script setup>
import { ref, reactive } from 'vue';
const auth = useAuthStore();
const resetPassword = ref("Submit");
const isProcessing = ref(false);
const errorMessage = ref(null);

definePageMeta({
    title: 'Reset password',
    meta: [
        { hid: 'Login for fetching Registration number details', name: 'Login for fetching Registration number details', content: 'Login for fetching Registration number details' }
    ],
    middleware: ['guest'],
});

const form = reactive({
    password: "",
    password_confirmation: "",
    email: localStorage.getItem("email-for-token")??null

});

const errors = reactive({
    password: null,
    password_confirmation: null,
});

// Validate form
const validateForm = () => {
    errors.password = null;
    errors.password_confirmation = null;

    if (!form.password) {
        errors.password = "Password is required";
    }
    if (!form.password_confirmation) {
        errors.password_confirmation = "Confirm password is required";
    }
    if (form.password && form.password_confirmation && form.password !== form.password_confirmation) {
        errors.password_confirmation = "Passwords do not match";
    }

    return !errors.password && !errors.password_confirmation;
};

const handleResetPasswordSubmit = async () => {
    errorMessage.value = null;

    if (!validateForm()) return;

    isProcessing.value = true;
    resetPassword.value = "Processing...";

    try {
        let response = await auth.handlePasswordResetSubmit(form);
        debugger
        if (response.success && response.data) {
            debugger;
            navigateTo('/auth/login');
        } else {
            throw new Error("Invalid Password or Confirm password");
        }
    } catch (error) {
        errorMessage.value = error?.data?.message || error?.response?.message || "An unexpected error occurred while trying to log in.";
        console.log("error:", errorMessage.value);
    } finally {
        resetPassword.value = "Submit";
        isProcessing.value = false;
    }
};

</script>
<template>
    <div class="min-h-screen flex items-center">
        <div class="w-full">
            <div
                class="card bg-white p-8 rounded-lg shadow-xl border-2 border-dark-500 border-solid py-4 md:w-3/4 mx-auto lg:w-1/3">
                <h3 class="text-center text-2xl font-semibold">Reset Password</h3>

                <form @submit.prevent="handleResetPasswordSubmit">
                    <div class="mb-6">
                        <FormLabel for="password">Password</FormLabel>
                        <FormInputText id="password" v-model="form.password" type="password" placeholder="Please enter your new password" />
                        <span v-if="errors.password" class="text-red-500">{{ errors.password }}</span>
                    </div>
                    <div class="mb-6">
                        <FormLabel for="password_confirmation">Confirm Password</FormLabel>
                        <FormInputText id="password_confirmation" v-model="form.password_confirmation" placeholder="Please repeat password" type="password" />
                        <span v-if="errors.password_confirmation" class="text-red-500">{{ errors.password_confirmation }}</span>
                    </div>

                    <div class="row mb-2" v-if="errorMessage">
                        <div class="alert alert-danger">
                            <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> {{ errorMessage }}</p>
                        </div>

                    </div>
                    
                    <div class="flex justify-between items-center">
                        <ButtonPrimary :disabled="isProcessing">{{ resetPassword }}</ButtonPrimary>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>