import ApiService from '../services/apiService';

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
                if(response.payload){
                    this.setCommonSetter(response.payload);
                }
            } catch (error) {
                throw error;
            }
        },

        async createNewUser(form) {
            try {
                const response = await apiService.post('create-new-user', form);
                if(response.payload){
                    this.setCommonSetter(response.payload);
                }
            } catch (error) {
                throw error;
            }
        },

        async logout() {
            const tokenStore = useTokenStore();
            try {
                await apiService.post('logout', null, tokenStore.token);
                
                this.removeUser();
                tokenStore.removeToken();

                navigateTo('/auth/login');
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
