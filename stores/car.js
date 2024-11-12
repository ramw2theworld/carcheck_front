import ApiService from '@/services/apiService';
const apiService = new ApiService();

export const useCarStore = defineStore('car', {
    state: () => ({ 
        requestCounts: 0,
        userCarsList: null,
    }),
    persist: {
        paths: ["requestCounts", "userCarsList"]
    },
    getters: {
    },
    actions: {
       async fetchRequestCounts(){
            try {
                const response = await apiService.get(`fetch-user-request-counts`);
                if(response.data){
                    this.requestCounts = response.data;
                }
                return this.requestCounts;
            } catch (error) {
                console.error("Failed to fetch request counts:", error);
                throw error;
            }
        },

        async fetchCarsUserList(){
            try {
                const response = await apiService.get(`v1/fetch-users-car-detail`);
                let res = response.data;
                if(res){
                    this.userCarsList = res;
                }
                return this.userCarsList;
            } catch (error) {
                console.error("Failed to fetch User's car list: ", error);
                throw error;
            }
        }
    },
})
