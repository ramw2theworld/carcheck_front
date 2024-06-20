export const useAuthStore = defineStore('auth', {
    state: () => ({ user: {} }),
    getters: {
        getCurrentUser: (state) => state.user,
    },
    persist: {
        paths: ["user"]
    },
    actions: {
        setUser(user) {
            this.user = user;
        },
        async makeLogin(form) {
            try {
                const { payload } = await $fetch('http://localhost:8000/api/login', {
                    method: 'POST',
                    body: {
                        ...form,
                    },
                });

                this.setCommonSetter(payload);
            } catch (error) {
                throw error;
            }
        },

        async createNewUser(form) {
            try {
                const { payload } = await $fetch('http://localhost:8000/api/create-new-user', {
                    method: 'POST',
                    body: {
                        ...form,
                    },
                });

                this.setCommonSetter(payload);
            } catch (error) {
                throw error;
            }
        },

        async logout() {
            const tokenStore = useTokenStore();
            console.log("token: ", tokenStore.token)

            try {
                await $fetch('http://localhost:8000/api/logout', {
                    method: 'POST',
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${tokenStore.token}`,
                    }
                });

                this.removeUser();
                tokenStore.removeToken();

                navigateTo('/auth/login');
            } catch (error) {
                throw error;
            }
        },

        setCommonSetter(payload) {
            const token = useTokenStore();
            if (payload.access_token && payload.user) {
                token.setToken(payload.access_token);
                this.user = payload.user;
            }

            return navigateTo('/dashboard');
        },
        removeUser() {
            console.log("remove user");
            this.user = {}
        }
    }
});
