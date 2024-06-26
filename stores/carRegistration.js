import ApiService from '../services/apiService';
const apiService = new ApiService();

export const useCarRegistrationrStore = defineStore('car_registration', {
    state: () => ({ reg_number: "" }),
    persist: {
        paths: ["reg_number"]
    },
    getters: {
        
    },
    actions: {
        async submitCarRegistrationNumber() {
            try {
                const response = await apiService.get(`check-car-number?reg_number=${this.reg_number}`, {
                    "reg_number": this.reg_number
                });
                console.log("response: ", response);
                // if(response.payload){
                //     this.setCommonSetter(response.payload);
                // }
            } catch (error) {
                throw error;
            }
        },
    },
})