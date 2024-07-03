export const useSubscriptionStore = defineStore('subscription', {
    state: () => ({ 
        hasSubscription: {} 
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