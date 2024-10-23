import ApiService from '../services/apiService';
import { defineStore } from 'pinia';
const apiService = new ApiService();

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
                const response = await apiService.post('login', form);
                if(response && response.payload){
                    let res = response.payload;
                    const tokenStore = useTokenStore();
                    const subscriptionStore = useSubscriptionStore();
                    const hasSubscriptionStore = useSubscriptionStore();

                    tokenStore.setToken(res.access_token, res.refresh_token);
                    if(res.subscription && res.subscription.plan){
                        await subscriptionStore.setCurrentSubscription(res.subscription);
                    }
                    if(res.hasSubscription){
                        await hasSubscriptionStore.setHasSubscription(res.hasSubscription);
                    }
                    // this.setCommonSetter(res);
                    this.setUser(res.user);
                    return response;
                }
            } catch (error) {
                throw error;
            }
        },

        async createNewUser(form) {
            try {
                const response = await apiService.post('users', form);
                if(response.payload){
                    this.setCommonSetter(response.payload);
                }
                return response;
            } catch (error) {
                throw error;
            }
        },

        async logout() {
            const tokenStore = useTokenStore();
            const carRegistrationSearchStore = useCarRegistrationSearchStore();
            try {
                let logout = await apiService.post('logout', null, tokenStore.token);
                this.removeUser();
                tokenStore.removeToken();
                const subscription = useSubscriptionStore();
                subscription.setHasSubscription({
                    auth: false,
                    active: false,
                    subscription_type: null,
                    request_count: 0,
                });
                localStorage.clear();
                sessionStorage.clear();

                if ('caches' in window) {
                    caches.keys().then((names) => {
                        names.forEach(name => caches.delete(name));
                    });
                }
                // clear pinia storage
                carRegistrationSearchStore.$reset();
                this.$reset();

                window.location.reload(true);

                // navigateTo('/auth/login');
            } catch (error) {
                throw error;
            }
        },

        async fetchUserRolesAndPermissions() {
            const tokenStore = useTokenStore();
            try {
                let response = await apiService.get('user/fetch-users-role-and-permissions', tokenStore.token);
                console.log("res: ", response);
                // navigateTo('/auth/login');
            } catch (error) {
                throw error;
            }
        },

        async fetchUserCars(page = 1, perPage = 1) {
            const tokenStore = useTokenStore();
            try {
                let response = await apiService.get(`v1/user/cars?page=${page}&perPage=${perPage}`, tokenStore.token);
                if (!response) {
                    throw new Error('Invalid data structure');
                }
                console.log("Err: ", response);
                return response;
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
        },
        removeUser() {
            console.log("remove user");
            this.user = {}
        }
    }
});
