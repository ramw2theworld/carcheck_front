import ApiService from '../services/apiService';
const apiService = new ApiService();

export const useCarRegistrationSearchStore = defineStore('carRegistrationSearch', {
    state: () => ({ 
        reg_number: "",
        basicCarDetails: {
            vehicleImageUrl: null,
            VehicleStatus: null,
            VehicleDetails: null,
            MotHistory: null,
            TechnicalDetails: null,

        },
    }),
    getters: {
        getCarDetail(state){
            return state.basicCarDetails;
        }
    },
    persist: {
        paths: [
            "reg_number",
            "basicCarDetails",
        ]
    },
    actions: {
        async searchCarRegNumber(reg_number) {
            try {
                const response = await apiService.get(`v1/car-check/${reg_number}`);
                if(response.payload){
                    let payload = response.payload;
                    if(payload[0].VehicleImages){
                        let ImageDetails = payload[0].VehicleImages;
                        if(ImageDetails.ImageDetailsList){
                            this.setVehicleImageUrl(ImageDetails.ImageDetailsList[0].ImageUrl)
                        }
                    }
                }

                console.log("hello there: ", response);
            } catch (error) {
                throw error;
            }
        },

        setBasicCarDetails(basicCarDetails){
            this.basicCarDetails = basicCarDetails;
        },

        setVehicleImageUrl(imageUrl){
            this.basicCarDetails.vehicleImageUrl = imageUrl;
        }

    },
})