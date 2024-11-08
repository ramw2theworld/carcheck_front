<script setup>
import { ref, reactive } from 'vue';
const auth = useAuthStore();
const token = useTokenStore();
const { $event } = useNuxtApp();
const subscriptionStore = useSubscriptionStore();
const loginSubmit = ref("Submit");
const isProcessing = ref(false);
const errorMessage = ref(null);

definePageMeta({
    title: 'Login',
    meta: [
        { hid: 'Login for fetching Registration number details', name: 'Login for fetching Registration number details', content: 'Login for fetching Registration number details' }
    ],
    middleware: ['guest'],
});

const form = reactive({
    email: "",
    password: "",
    procedure: "login_form"
});

const errors = reactive({
    email: null,
    password: null
});

// Validate form
const validateForm = () => {
    errors.email = null;
    errors.password = null;

    if (!form.email) {
        errors.email = "Email is required";
    }
    if (!form.password) {
        errors.password = "Password is required";
    }

    return !errors.email && !errors.password;
};

const handleLoginSubmit = async () => {
    errorMessage.value = null;

    if (!validateForm()) return;

    isProcessing.value = true;
    loginSubmit.value = "Processing...";

    try {
        let response = await auth.makeLogin(form);
        if (response.success && response.payload) {
            const { hasSubscription, subscription, user } = response.payload;
            await subscriptionStore.setHasSubscription(hasSubscription);
            await subscriptionStore.setCurrentSubscription(subscription);
            await auth.setUser(user);

            if (hasSubscription.active || user.request_count > 0) {
                const reg_number = localStorage.getItem('reg_number');
                reg_number ? navigateTo('/report') : navigateTo('/');
            } else {
                navigateTo('/payment/plans');
            }
        } else {
            throw new Error("Invalid login credentials");
        }
    } catch (error) {
        debugger
        errorMessage.value = error?.data?.message || error?.response?.message || "An unexpected error occurred while trying to log in.";
        console.log("error:", errorMessage.value);
    } finally {
        loginSubmit.value = "Submit";
        isProcessing.value = false;
    }
};

// Navigation helpers
const navigateToRegister = () => navigateTo('/auth/register');
const navigateToForgotPassword = () => navigateTo('/auth/forgot-password');
</script>
<template>
    <div class="min-h-screen flex items-center">
        <div class="w-full">
            <div
                class="card bg-white p-8 rounded-lg shadow-xl border-2 border-dark-500 border-solid py-4 md:w-3/4 mx-auto lg:w-1/3">
                <h3 class="text-center text-2xl font-semibold">User Login</h3>

                <form @submit.prevent="handleLoginSubmit">
                    <div class="mb-6">
                        <FormLabel for="email">Email</FormLabel>
                        <FormInputText id="email" v-model="form.email" placeholder="Enter your email address"
                            type="text" />
                        <span v-if="errors.email" class="text-red-500">{{ errors.email }}</span>
                    </div>

                    <div class="mb-6">
                        <FormLabel for="password">Password</FormLabel>
                        <FormInputText id="password" v-model="form.password" placeholder="Enter password"
                            type="password" />
                        <span v-if="errors.password" class="text-red-500">{{ errors.password }}</span>
                    </div>

                    <div class="row mb-2" v-if="errorMessage">
                        <div class="alert alert-danger">
                            <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> {{ errorMessage }}</p>
                        </div>

                    </div>

                    <div class="flex justify-between items-center">
                        <ButtonPrimary :disabled="isProcessing">{{ loginSubmit }}</ButtonPrimary>
                        <span @click="navigateToRegister" class="cursor-pointer">
                            <i class="fa fa-user"></i> Create new user
                        </span>
                    </div>

                    <div class="flex justify-center items-center mt-4">
                        <span @click="navigateToForgotPassword"
                            class="text-blue-500 hover:text-blue-700 cursor-pointer">
                            Forgot Password
                        </span>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
</template>