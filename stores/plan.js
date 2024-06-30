export const usePlanStore = defineStore('plan', {
    state: () => ({ 
        plans: {
            basic: 5,
            standerd: 15,
            premium: 25,
        },
        selectedPlan: null,
    }),
    persist: {
        paths: ["selectedPlan"]
    },
    getters: {
        
    },
    actions: {
        setSelectedPlan(){
            this.selectedPlan = ""
        }
    },
})