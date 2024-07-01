<script setup>
const auth = useAuthStore();

definePageMeta({
    title: 'Register',
  middleware: ['guest'],
});


const form = reactive({
    name: null,
    email: null,
    password: null
});
const errors = ref([]);

const handleRegisterSubmit = async () => {
    try {
        await auth.createNewUser(form);
    } catch (error) {
        console.log("Register error: ", error);
        errors.value = error.data.errors
    }
}

</script>

<template>
    <div>
        <div class="min-h-screen flex items-center">
            <div class="w-full">
                <div class="card bg-white p-8 rounded-lg shadow-xl md:w-3/4 mx-auto lg:w-1/3">
                    <h3 class="text-center text-2xl font-semibold"> User Registration</h3>

                    <form @submit.prevent="handleRegisterSubmit">
                        <div class="mb-6">
                            <FormLabel for="fullname">Fullname</FormLabel>
                            <FormInputText id="fullname" v-model="form.name" placeholder="Enter full name" type="text" required/>
                            <span class="text-red-500" v-if="errors.name">{{ errors.name[0] }}</span>
                        </div>
                        <div class="mb-6">
                            <FormLabel for="email">Email</FormLabel>
                            <FormInputText id="email" v-model="form.email" placeholder="user@email.com" type="text" required/>
                            <span class="text-red-500" v-if="errors.email">{{ errors.email[0] }}</span>
                        </div>
                        <div class="mb-6">
                            <FormLabel for="password">Password</FormLabel>
                            <FormInputText id="password" v-model="form.password" placeholder="password"
                                type="password" required/>

                            <span class="text-red-500" v-if="errors.password">{{ errors.password[0] }}</span>
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
                        <ButtonPrimary>Submit</ButtonPrimary>
                    </form>
                    <SocialLogin></SocialLogin>

                </div>
            </div>

        </div>
    </div>
</template>