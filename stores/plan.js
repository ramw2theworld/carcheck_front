import ApiService from '@/services/apiService';
const apiService = new ApiService();

export const usePlanStore = defineStore('plan', {
    state: () => ({ 
        selectedPlan: null,
        plans: [],
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
        },

        async fetchPlans(){
            try {
                const response = await apiService.get(`plans`);
                if(response.data){
                    this.plans = response.data;
                }

            } catch (error) {
                console.error("Failed to fetch plans:", error);
                throw error;
            }
        }
    },
})
