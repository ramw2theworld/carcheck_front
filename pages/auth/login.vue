<script setup>
const auth = useAuthStore();
const token = useTokenStore();
const { $event } = useNuxtApp();
const subscriptionStore = useSubscriptionStore();
const planStore = usePlanStore();


definePageMeta({
  title: 'Login',
  meta: [
    { hid: 'Login for fetching Registration number details', name: 'Login for fetching Registration number details', content: 'Login for fetching Registration number details' }

  ],
  middleware: ['guest'],
});

const form = reactive({
    email: "admin@admin.com",
    password: "password01"
});
const errors = ref([]);
const errorMessage = ref(null);

const handleLoginSubmit = async () => {
    try {
        $event('user:loggedIn', {
            "user": "jello josldfls sldfjsl dflskdfjl askdjflksajdf"
        });

        let response = await auth.makeLogin(form);
        if(response.success){
            if(response.payload){
                let payload = response.payload;
                let hasSubscription = payload.hasSubscription;
                let subscription = payload.subscription;
                let user = payload.user;

                await subscriptionStore.setHasSubscription(hasSubscription);
                await subscriptionStore.setCurrentSubscription(subscription);
                await auth.setUser(user);

                if(hasSubscription.active){
                    console.log("subs: ", hasSubscription);
                    // if(subscription.plan.plan_code === "48h-export-subscription"){
                    //     navigateTo('/vehicle/export-report');
                    // }else if(subscription.plan.plan_code === "48h-basic-subscription"){
                    //     navigateTo('/vehicle/basic-report');
                    // }else{
                    //     navigateTo('/vehicle/single-offer-report');
                    // }
                    navigateTo('/report');
                }else{
                    navigateTo('/payment/plans');
                }
            }
        }else{
            errorMessage.value = "Something went wrong. Please verify your credential and try again.";
        }
    } catch (error) {
        console.log("login error: ", error);
        if(error?.data?.message)
            errors.value = error.data?.errors
        else
            errorMessage.value = error;
    }
}
const removeToken = async () => {
    token.removeToken();
}

const navigateToRegister = async () => {
    navigateTo('/auth/register');
}
</script>

<template>
    <div>
        <div class="min-h-screen flex items-center">
            <div class="w-full">
                <div class="card bg-white p-8 rounded-lg shadow-xl border-2 border-dark-500 border-solid py-4 md:w-3/4 mx-auto lg:w-1/3">

                    <h3 class="text-center text-2xl font-semibold"> User Login</h3>
                    <form @submit.prevent="handleLoginSubmit">
                        <div class="mb-6">
                            <FormLabel for="email">Email</FormLabel>
                            <FormInputText id="email" v-model="form.email" placeholder="user@email.com" type="text" />
                            <span class="text-red-500" v-if="errors.email">{{ errors.email[0] }}</span>
                        </div>
                        <div class="mb-6">
                            <FormLabel for="password">Password</FormLabel>
                            <FormInputText id="password" v-model="form.password" placeholder="password"
                                type="password" />

                            <span class="text-red-500" v-if="errors.password">{{ errors.password[0] }}</span>

                            <p><span class="text-red-500" v-if="errorMessage">{{ errorMessage }}</span></p>
                        </div>
                        <div class="flex justify-between items-center">
                            <ButtonPrimary>Submit</ButtonPrimary>
                            <span @click="navigateToRegister">
                                <i class="fa fa-user"></i> Create new user
                            </span>
                        </div>
                        <div class="flex justify-center items-center mt-4">
                            <span @click="navigateToForgotPassword" class="text-blue-500 hover:text-blue-700 cursor-pointer">
                                Forget Password
                            </span>
                        </div>
                    </form>
                    <!-- <SocialLogin></SocialLogin> -->
                </div>
            </div>

        </div>
    </div>
</template>