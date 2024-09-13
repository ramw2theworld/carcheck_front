import ApiService from '@/services/apiService';
const apiService = new ApiService();

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
        async fetchUserSubscription(email) {
            try {
                const response = await apiService.post('payment/subscription', {
                    email: email
                });
                console.log(response);
                return response;
                
            } catch (error) {
                throw error;
            }
        },

        // cancel subscription 
        async cancelSubscription(original_id) {
            try {
                const response = await apiService.post('payment/subscription/cancel', {
                    original_id: original_id
                });
                console.log(response);
                return response;
                
            } catch (error) {
                throw error;
            }
        },
    },
})