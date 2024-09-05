export const useSubscriptionStore = defineStore('subscription', {
    state: () => ({ 
        hasSubscription: {
            auth: false,
            active: false,
            subscription_type: null,
        }
    }),
    getters: {
        getCurrentSubscription: (state) => state.hasSubscription,
    },
    actions: {
        setCurrentSubscription(subscription) {
            this.hasSubscription = subscription
        },
    },
})