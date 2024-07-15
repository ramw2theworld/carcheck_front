export const useSubscriptionStore = defineStore('subscription', {
    state: () => ({ 
        hasSubscription: {
            active: false,
            auth: false,
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