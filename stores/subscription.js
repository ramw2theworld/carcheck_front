export const useSubscriptionStore = defineStore('subscription', {
    state: () => {
        return {
            hasSubscription: {
                auth: false,
                active: false,
                subscription_type: null,
            },
            subscription: null,
        }
    },
    getters: {
        getCurrentSubscription: (state) => state.hasSubscription,
    },
    actions: {
        setCurrentSubscription(subscription) {
            this.hasSubscription = subscription
        },

        // fetch subscription 
        async fetchUserSubscription() {
            const tokenStore = useTokenStore();
            try {
                let response = await apiService.get(`v1/user/subscription`, tokenStore.token);
                if (!response) {
                    throw new Error('Invalid data structure');
                }
                console.log("Err: ", response);
                return response;
            } catch (error) {
                throw error;
            }
        },
    },
})