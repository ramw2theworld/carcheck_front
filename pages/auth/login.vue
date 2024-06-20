<script setup>
const auth = useAuthStore();
const token = useTokenStore();

definePageMeta({
  middleware: ['guest'],
});

const form = reactive({
    email: null,
    password: null
});
const errors = ref([]);

const handleLoginSubmit = async () => {
    try {
        await auth.makeLogin(form);
    } catch (error) {
        console.log("login error: ", error);
        errors.value = error.data.errors
    }
}
const removeToken = async () => {
    token.removeToken();
}
</script>

<template>
    <div>
        <div class="min-h-screen flex items-center">
            <div class="w-full">
                <div class="card bg-white p-8 rounded-lg shadow-xl md:w-3/4 mx-auto lg:w-1/3">
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
                        </div>
                        <ButtonPrimary>Submit</ButtonPrimary>
                        <ButtonPrimary @click.prevent="removeToken"> Remove token</ButtonPrimary>
                    </form>
                    <SocialLogin></SocialLogin>
                </div>
            </div>

        </div>
    </div>
</template>