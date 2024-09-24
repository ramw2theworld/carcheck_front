<script setup>
const auth = useAuthStore();
const { $listen } = useNuxtApp();

$listen('user:loggedIn', (user) => {
  console.log('A user was registered!', user)
})

definePageMeta({
  title: 'Register',
  meta: [
    { hid: 'Register for fetching Registration number details', name: 'Register for fetching Registration number details', content: 'Register for fetching Registration number details' }

  ],
  middleware: ['guest'],
});


const form = reactive({
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    password_confirmation: null,
});
const errors = ref({});
const errorMessage = ref('');
const successMessage = ref('');

const handleRegisterSubmit = async () => {
    try {
        console.log("form: ", form);
        if (form.password !== form.password_confirmation) {
            errors.value.password_confirmation = ['Passwords do not match'];
            return;
        }
        const response = await auth.createNewUser(form);
        successMessage.value = response.message;
        setTimeout(() => {
            successMessage.value = '';
            navigateTo('/auth/login');
        }, 3000);
    } catch (error) {
        console.error('Register error:', error.data);
        errorMessage.value = error.data?.message || 'An error occurred while registering user.';
        errors.value = error.data?.errors || {};
    }
}
</script>

<template>
    <div>
        <div class="min-h-screen flex items-center py-4">
            <div class="w-full">
                <div class="card bg-white p-8 rounded-lg shadow-xl border-2 border-dark-500 border-solid py-4 md:w-3/4 mx-auto lg:w-1/3">
                    <h3 class="text-center text-2xl font-semibold"> User Registration</h3>

                    <form @submit.prevent="handleRegisterSubmit">
                        <div v-if="successMessage" class="p-3 bg-green-200 text-green-800 rounded">
                            {{ successMessage }}
                        </div>
                        <div v-if="errorMessage" class="p-3 bg-red-100 text-red-800 rounded">
                            {{ errorMessage }}
                        </div>
                        <div class="mb-6">
                            <FormLabel for="first_name">First name    </FormLabel>
                            <FormInputText id="first_name" v-model="form.first_name" placeholder="Enter first name" type="text" required/>
                            <span class="text-red-500" v-if="errors['first_name']">{{ errors['first_name'][0] }}</span>

                        </div>
                        <div class="mb-6">
                            <FormLabel for="last_name">Last name</FormLabel>
                            <FormInputText id="last_name" v-model="form.last_name" placeholder="Enter last name" type="text" required/>
                            <span class="text-red-500" v-if="errors['last_name']">{{ errors['last_name'][0] }}</span>

                        </div>
                        <div class="mb-6">
                            <FormLabel for="email">Email</FormLabel>
                            <FormInputText id="email" v-model="form.email" placeholder="user@email.com" type="text" required/>
                            <span class="text-red-500" v-if="errors['email']">{{ errors['email'][0] }}</span>

                        </div>
                        <div class="mb-6">
                            <FormLabel for="password">Password</FormLabel>
                            <FormInputText id="password" v-model="form.password" placeholder="password"
                                type="password" required/>

                            <span class="text-red-500" v-if="errors['password']">{{ errors['password'][0] }}</span>
                        </div>
                        <div class="mb-6">
                            <FormLabel for="password_confirmation">Confirm Password</FormLabel>
                            <FormInputText id="password_confirmation" v-model="form.password_confirmation" placeholder="Confirm password"
                                type="password" required/>

                            <span class="text-red-500" v-if="errors.password_confirmation">{{ errors.password_confirmation[0]??errors.password_confirmation }}</span>
                        </div>
                        <div class="flex items-start mb-6">
                            <div class="flex items-center h-5">
                                <FormInputText id="remember" v-model="form.terms" placeholder="password"
                                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 
                                        dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                                        dark:focus:ring-offset-gray-800"
                                    type="checkbox" required/>
                            </div>
                            <FormLabel for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                Remember me</FormLabel>

                        </div>
                        <div class="flex items-start mb-6" v-if="(errorMessage && errors.length==0)">
                            <p class="text-danger text-red">{{ errorMessage }}</p>
                        </div>

                        <ButtonPrimary>Submit</ButtonPrimary>
                    </form>
                    <!-- <SocialLogin></SocialLogin> -->

                </div>
            </div>

        </div>
    </div>
</template>