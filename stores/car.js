import ApiService from "~/services/apiService";

export const useCarStore = defineStore('car', {
    state: () => ({ 
        requestCounts: 0,
        request_count_trial: 0,
        one_off_request_count: 0,
        userCarsList: null,
        userReports: null,
        custom_plans: null,
    }),
    persist: {
        paths: ["requestCounts", "userCarsList", "userReports"]
    },
    getters: {
    },
    actions: {
        setRequestCounts(counts){
            this.requestCounts = counts;
        },
       async fetchRequestCounts(){
            debugger
            try {
                const response = await ApiService.get(`fetch-user-request-counts`);
                if(response.payload){
                    this.requestCounts = response.payload;
                }
                return this.requestCounts;
            } catch (error) {
                console.error("Failed to fetch request counts:", error);
                throw error;
            }
        },

        async fetchCarsUserList(){
            try {
                const response = await ApiService.get(`v1/fetch-users-car-detail`);
                let res = response.data;
                if(res){
                    this.userCarsList = res;
                }
                return this.userCarsList;
            } catch (error) {
                console.error("Failed to fetch User's car list: ", error);
                throw error;
            }
        },

        async fetchCarsUserReports(){
            try {
                const response = await ApiService.get(`v1/fetch-all-user-car-reports`);
                let res = response.data;
                if(res){
                    this.userReports = res;
                }
                return this.userReports;
            } catch (error) {
                console.error("Failed to fetch User's car reports list: ", error);
                throw error;
            }
        },

        async fetchAllCustomPlans(){
            try {
                const response = await ApiService.get(`custom-plans`);
                let res = response.data;
                
                if(res){
                    this.custom_plans = res;
                }
                return this.custom_plans;
            } catch (error) {
                console.error("Failed to fetch all custom plans: ", error);
                throw error;
            }
        },

        async buyCustomPlan(custom_plan){
            try {
                const response = await ApiService.post(`buy-custom-plan`,{
                    plan_code: custom_plan.plan_code
                });
                let res = response.data;
            } catch (error) {
                console.error("Failed to buy custom plan", error);
                throw error;
            }
        },
    },
})
