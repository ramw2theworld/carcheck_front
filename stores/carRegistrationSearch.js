import ApiService from '../services/apiService';
const apiService = new ApiService();
import { defineStore } from 'pinia';
import Cookie from 'js-cookie';
import { decryptData, encryptData } from '~/composables/useCrypto';
import { attributes } from '~/static/encryptAndDecryptKeys.json';



export const useCarRegistrationSearchStore = defineStore('carRegistrationSearch', {
    state: () => {
        return {
            reg_number: "",
            vehicleLogo: null,
            vehicleImageUrl: null,
            vehicleStatus: null,
            vehicleDetails: null,
            MOTHistory: [],
            technicalDetails: null,
            classificationDetails: null,
            vehicleHistory: null,
            dimensions: null,
            general: null,
            vehicleRegistration: null,
            motVed: null,
            smmtDetail: null,
        }
      },
    getters: {
        getCarDetail(state){
            return state.basicCarDetails;
        },
        async fetchVehicleImageUrl() {
            const encryptedData = localStorage.getItem('WJV');
            if (encryptedData) {
                try {
                    const decrypted = await decryptData('veh-WJV-01', JSON.parse(encryptedData));
                    this.vehicleImageUrl = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt vehicle image url:", error);
                }
            }
        },
        async fetchVehicleLogo() {
            const encryptedData = localStorage.getItem('WM');
            if (encryptedData) {
                try {
                    const decrypted = await decryptData('veh-WM-06', JSON.parse(encryptedData));
                    this.vbrand_logo = JSON.parse(decrypted);
                    console.log("logo: ", this.vbrand_logo);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle logo: ", error);
                }
            }
        },
        async fetchAndDecryptMOTHistory() {
            const encryptedData = localStorage.getItem('MOThistory');
            if (encryptedData) {
                try {
                    const decrypted = await decryptData('motHistorySecret', JSON.parse(encryptedData));
                    this.decryptedMOTHistory = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt MOT history:", error);
                }
            }
        },
        
    },
    persist: {
        paths: [
            "reg_number",
            "vehicleLogo",
            "vehicleImageUrl",
            "vehicleStatus",
            "vehicleDetails",
            "MOTHistory",
            "technicalDetails",
            "dimensions",
            "general",
            "classificationDetails",
            "vehicleHistory",
            "vehicleRegistration",
            "motVed",
            "smmtDetail",
        ]
    },
    actions: {
        async searchCarRegNumber(car_reg_number) {
            try {
                this.car_reg_number = this.reg_number;
                const response = await apiService.get(`v1/car-check/${car_reg_number}`);
                if(response.payload && Array.isArray(response.payload)){
                    let combinedPayload = response.payload.reduce((acc, item) => {
                        return {...acc, ...item};
                    }, {});
                    this.setVehicleImageUrl(combinedPayload);
                    this.setVehicleLogo(combinedPayload);
                    // this.setVehicleStatus(combinedPayload);
                    // this.setVehicleDetails(combinedPayload);

                    // this.setTechnicalDetails(combinedPayload);

                    // this.setClassificationDetails(combinedPayload);

                    // this.setVehicleDimension(combinedPayload);
                    // this.setVehicleGeneralInfo(combinedPayload);
                    // this.setVehicleRegistration(combinedPayload);
                    // this.setVehicleHistory(combinedPayload);

                    // this.setMOTHistory(combinedPayload);

                    // this.setMotVed(combinedPayload);
                    // this.setSmmtDetail(combinedPayload);
                }

            } catch (error) {
                console.log("error while fetching car details: ", error);
                throw error;
            }
        },

        async setVehicleImageUrl(combinedPayload){
            if (combinedPayload.VehicleImages.ImageDetailsCount > 0) {
                const passphrase = 'veh-WJV-01';
                const data = JSON.stringify(combinedPayload.VehicleImages.ImageDetailsList[0].ImageUrl);
                const encryptedData = await encryptData(passphrase, data);

                localStorage.setItem('WJV', JSON.stringify(encryptedData));
            }
        },
        async setVehicleLogo(combinedPayload){
           if(combinedPayload.vbrand_logo){
                const passphrase = 'veh-WM-06';
                const data = JSON.stringify(combinedPayload.vbrand_logo);
                const encryptedData = await encryptData(passphrase, data);
                localStorage.setItem('WM', JSON.stringify(encryptedData));
           }
        },
        setVehicleStatus(combinedPayload){
            console.log("Setting vehicle status with:", combinedPayload.VehicleStatus);
            this.vehicleStatus = combinedPayload.VehicleStatus;
            console.log("New vehicle status state:", this.vehicleStatus);
            debugger
        },
        setVehicleDetails(combinedPayload){
            this.vehicleDetails = combinedPayload.VehicleDetails;
        },
        
        setTechnicalDetails(combinedPayload){
            this.technicalDetails = combinedPayload.TechnicalDetails;
        },
        setClassificationDetails(combinedPayload){
            this.classificationDetails = combinedPayload.ClassificationDetails;
        },
        setVehicleHistory(combinedPayload){
            this.vehicleHistory = combinedPayload.VehicleHistory;
        },
        setVehicleDimension(combinedPayload){
            this.dimensions = combinedPayload.TechnicalDetails.Dimensions;
        },
        setVehicleGeneralInfo(combinedPayload){
            this.general = combinedPayload.TechnicalDetails.General;

        },
        setVehicleRegistration(combinedPayload){
            this.vehicleRegistration = combinedPayload.VehicleRegistration;
        },
        setMotVed(combinedPayload){
            this.motVed = combinedPayload.VehicleStatus.MotVed;
        },
        setSmmtDetail(combinedPayload){
            Cookie.set('smmtDetail', JSON.stringify(combinedPayload.SmmtDetails), { expires: 7, path: '' });
        },
        async setMOTHistory(combinedPayload){
            if (combinedPayload.MotHistory && Array.isArray(combinedPayload.MotHistory.RecordList)) {
                // Specify your passphrase (consider a more secure way to handle this in production)
                const passphrase = 'motHistorySecret';

                // Convert the record list to a JSON string and encrypt it
                const data = JSON.stringify(combinedPayload.MotHistory.RecordList);
                const encryptedData = await encryptData(passphrase, data);

                // Store the encrypted data as a JSON string
                localStorage.setItem('MOThistory', JSON.stringify(encryptedData));
            }
        },
    },
})