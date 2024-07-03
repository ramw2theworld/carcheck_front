export const usePlanStore = defineStore('plan', {
    state: () => ({ 
        selectedPlan: null,
    }),
    persist: {
        paths: ["selectedPlan"]
    },
    getters: {
        getSelectedPlan: (state) => state.selectedPlan,
    },
    actions: {
        setSelectedPlan(plan) {
            this.selectedPlan = plan;
        }
    },
})
