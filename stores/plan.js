import ApiService from "@/services/apiService";
import { defineStore } from "pinia";

export const usePlanStore = defineStore('plan', {
    state: () => ({ 
        selectedPlan: null,
        userPlan: null,
        plans: [],
    }),
    persist: {
        paths: ["selectedPlan", "userPlan"]
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
                const response = await ApiService.get(`plans`);
                if(response.data){
                    this.plans = response.data;
                }
                return response;
            } catch (error) {
                console.error("Failed to fetch plans:", error);
                throw error;
            }
        }
    },
})
