<script setup>
import { ref, reactive } from 'vue';
const auth = useAuthStore();
const resetToken = ref("Submit");
const isProcessing = ref(false);
const errorMessage = ref(null);

definePageMeta({
    title: 'Forget password',
    meta: [
        { hid: 'Login for fetching Registration number details', name: 'Login for fetching Registration number details', content: 'Login for fetching Registration number details' }
    ],
    middleware: ['guest'],
});

const form = reactive({
    email: "",

});

const errors = reactive({
    email: null,
});

// Validate form
const validateForm = () => {
    errors.email = null;

    if (!form.email) {
        errors.email = "Email is required";
    }

    return !errors.email;
};

const handleResetPasswordSubmit = async () => {
    errorMessage.value = null;

    if (!validateForm()) return;

    isProcessing.value = true;
    resetToken.value = "Processing...";

    try {
        let response = await auth.submitEmailForPasswordReset(form);
        if (response.success && response.data) {
            let eData = response.data;
            localStorage.setItem("email-for-token", eData.email)
            navigateTo('/auth/token');
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
                <h3 class="text-center text-2xl font-semibold">Email Verify</h3>

                <form @submit.prevent="handleResetPasswordSubmit">
                    <div class="mb-6">
                        <FormLabel for="email">Email</FormLabel>
                        <FormInputText id="email" v-model="form.email" placeholder="Enter your email address"
                            type="text" />
                        <span v-if="errors.email" class="text-red-500">{{ errors.email }}</span>
                    </div>

                    <div class="row mb-2" v-if="errorMessage">
                        <div class="alert alert-danger">
                            <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> {{ errorMessage }}</p>
                        </div>

                    </div>
                    
                    <div class="flex justify-between items-center">
                        <ButtonPrimary :disabled="isProcessing">{{ resetToken }}</ButtonPrimary>
                        <NuxtLink to="/auth/login">Back</NuxtLink>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>