import ApiService from '../services/apiService';
import { defineStore } from 'pinia';
import { decryptData, encryptData } from '~/composables/useCrypto';
import { systematicFourCharCode } from '~/composables/useGenerateLocalstorageCode';

const apiService = new ApiService();

export const useCarRegistrationSearchStore = defineStore('carRegistrationSearch', {
    state: () => {
        return {
            reg_number: "",
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
            smmtDetails: null,
            performance: null,
            vbrand_logo: null,
        }
      },
    getters: {
        getCarDetail(state){
            return state.basicCarDetails;
        },
        async fetchVehicleImageUrl() {
            let code = systematicFourCharCode('VehicleImageUrl')
            const encryptedData = localStorage.getItem(code);
            if (encryptedData) {
                try {
                    const decrypted = await decryptData(`${code}`, JSON.parse(encryptedData));
                    this.vehicleImageUrl = JSON.parse(decrypted);
                    
                } catch (error) {
                    console.error("Failed to decrypt vehicle image url:", error);
                }
            }
        },
        async fetchVehicleLogo() {
            let code = systematicFourCharCode('VehicleLogo');
            const encryptedData = localStorage.getItem(code);
            if (encryptedData) {
                try {
                    const decrypted = await decryptData(`${code}`, JSON.parse(encryptedData));
                    this.vbrand_logo = JSON.parse(decrypted);
                    console.log("logo: ", this.vbrand_logo);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle logo: ", error);
                }
            }
        },
        async fetchSmmtDetails() {
            let code = systematicFourCharCode('SmmtDetails')
            const encryptedData = localStorage.getItem(code);
            if (encryptedData) {
                try {
                    const decrypted = await decryptData(`${code}`, JSON.parse(encryptedData));
                    this.smmtDetails = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt SmmtDetails:", error);
                }
            }
        },
        async fetchVehicleDimension() {
            let code = systematicFourCharCode('VehicleDimension')
            const encryptedData = localStorage.getItem(code);
            if (encryptedData) {
                try {
                    const decrypted = await decryptData(`${code}`, JSON.parse(encryptedData));
                    this.dimensions = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle Dimensions:", error);
                }
            }
        },
        async fetchVehicleRegistration() {
            let code = systematicFourCharCode('VehicleRegistration')
            const encryptedData = localStorage.getItem(code);
            if (encryptedData) {
                try {
                    const decrypted = await decryptData(`${code}`, JSON.parse(encryptedData));
                    this.vehicleRegistration = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle Registration:", error);
                }
            }
        },
        async fetchVehicleMotVed() { 
            let code = systematicFourCharCode('VehicleMotVed') 
            const encryptedData = localStorage.getItem(code);
            if (encryptedData) {
                try {
                    const decrypted = await decryptData(`${code}`, JSON.parse(encryptedData));
                    this.motVed = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle MotVed: ", error);
                }
            }
        },
        async fetchVehicleGeneralInfo() {  
            let code = systematicFourCharCode('VehicleGeneralInfo')
            const encryptedData = localStorage.getItem(code);
            if (encryptedData) {
                try {
                    const decrypted = await decryptData(`${code}`, JSON.parse(encryptedData));
                    this.general = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle General Information: ", error);
                }
            }
        },
        async fetchPerformance() {  
            let code = systematicFourCharCode('Performance')
            const encryptedData = localStorage.getItem(code);
            if (encryptedData) {
                try {
                    const decrypted = await decryptData(`${code}`, JSON.parse(encryptedData));
                    this.performance = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle Technical Performance: ", error);
                }
            }
        },
        async fetchClassificationDetails() {  
            let code = systematicFourCharCode('VehicleClassificationDetails');
            const encryptedData = localStorage.getItem(code);
            if (encryptedData) {
                try {
                    const decrypted = await decryptData(`${code}`, JSON.parse(encryptedData));
                    this.classificationDetails = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle Classification Information: ", error);
                }
            }
        },
        async fetchVehicleHistory() {  
            let code = systematicFourCharCode('VehicleHistory');
            const encryptedData = localStorage.getItem(code);
            if (encryptedData) {
                try {
                    const decrypted = await decryptData(`${code}`, JSON.parse(encryptedData));
                    this.vehicleHistory = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle History: ", error);
                }
            }
        },
        async fetchMOTHistory() {  
            let code = systematicFourCharCode('MOTHistory');
            const encryptedData = localStorage.getItem(code);
            if (encryptedData) {
                try {
                    const decrypted = await decryptData(`${code}`, JSON.parse(encryptedData));
                    this.vehicleHistory = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle MOT History: ", error);
                }
            }
        },
        
    },
    persist: {
        paths: [
            "reg_number",
        ]
    },
    actions: {
        async searchCarRegNumber(car_reg_number) {
            try {
                this.car_reg_number = car_reg_number;

                const response = await apiService.get(`v1/car-check/${car_reg_number}`);
                if(response.payload && Array.isArray(response.payload)){
                    let combinedPayload = response.payload.reduce((acc, item) => {
                        return {...acc, ...item};
                    }, {});
                    this.setVehicleImageUrl(combinedPayload);
                    this.setVehicleLogo(combinedPayload);
                    this.setSmmtDetails(combinedPayload);
                    this.setVehicleDimension(combinedPayload);
                    this.setVehicleRegistration(combinedPayload);
                    this.setMotVed(combinedPayload);
                    this.setVehicleGeneralInfo(combinedPayload);
                    this.setPerformance(combinedPayload);
                    this.setClassificationDetails(combinedPayload);
                    this.setVehicleHistory(combinedPayload);
                    this.setMOTHistory(combinedPayload);
                }

            } catch (error) {
                console.log("error while fetching car details: ", error);
                throw error;
            }
        },

        async setVehicleImageUrl(combinedPayload){
            let code = systematicFourCharCode('VehicleImageUrl')
            if (combinedPayload.VehicleImages.ImageDetailsCount > 0) {
                const data = JSON.stringify(combinedPayload.VehicleImages.ImageDetailsList[0].ImageUrl);
                const encryptedData = await encryptData(code, data);

                localStorage.setItem(code, JSON.stringify(encryptedData));
            }
        },
        async setVehicleLogo(combinedPayload){
            let code = systematicFourCharCode('VehicleLogo')
           if(combinedPayload.vbrand_logo){
                const data = JSON.stringify(combinedPayload.vbrand_logo);
                const encryptedData = await encryptData(code, data);
                localStorage.setItem(code, JSON.stringify(encryptedData));
           }
        },
        async setSmmtDetails(combinedPayload){
            let code = systematicFourCharCode('SmmtDetails')
            if (combinedPayload.SmmtDetails) {
                const data = JSON.stringify(combinedPayload.SmmtDetails);
                const encryptedData = await encryptData(code, data);
                localStorage.setItem(code, JSON.stringify(encryptedData));
            }
        },
        async setVehicleDimension(combinedPayload){
            let code = systematicFourCharCode('VehicleDimension')
            if (combinedPayload.TechnicalDetails) {
                let technical = combinedPayload.TechnicalDetails;
                if(technical.Dimensions){
                    const data = JSON.stringify(technical.Dimensions);
                    const encryptedData = await encryptData(code, data);
                    localStorage.setItem(code, JSON.stringify(encryptedData));
                }
            }
        },
        async setVehicleRegistration(combinedPayload){
            let code = systematicFourCharCode('VehicleRegistration');
            if (combinedPayload.VehicleRegistration) {
                const data = JSON.stringify(combinedPayload.VehicleRegistration);
                const encryptedData = await encryptData(code, data);
                localStorage.setItem(code, JSON.stringify(encryptedData));
            }
        },
        async setMotVed(combinedPayload){
            let code = systematicFourCharCode('VehicleMotVed')
            let vStatus = combinedPayload.VehicleStatus;
            if (vStatus) {
                if(vStatus.MotVed){
                    const data = JSON.stringify(vStatus.MotVed);
                    const encryptedData = await encryptData(code, data);
                    localStorage.setItem(code, JSON.stringify(encryptedData));
                }
            }
        },
        async setVehicleGeneralInfo(combinedPayload){
            let code = systematicFourCharCode('VehicleGeneralInfo')
            if (combinedPayload.TechnicalDetails) {
                const data = JSON.stringify(combinedPayload.TechnicalDetails?.General);
                const encryptedData = await encryptData(code, data);

                localStorage.setItem(code, JSON.stringify(encryptedData));
            }
        },
        async setPerformance(combinedPayload){
            let code = systematicFourCharCode('Performance')
            if (combinedPayload.TechnicalDetails) {
                const data = JSON.stringify(combinedPayload.TechnicalDetails?.Performance);
                const encryptedData = await encryptData(code, data);

                localStorage.setItem(code, JSON.stringify(encryptedData));
            }
        },
        async setClassificationDetails(combinedPayload){
            let code = systematicFourCharCode('VehicleClassificationDetails');
            if (combinedPayload.ClassificationDetails) {
                const data = JSON.stringify(combinedPayload.ClassificationDetails);
                const encryptedData = await encryptData(code, data);
                localStorage.setItem(code, JSON.stringify(encryptedData));
            }
        },
        async setVehicleHistory(combinedPayload){
            let code = systematicFourCharCode('VehicleHistory');
            if (combinedPayload.VehicleHistory) {
                const data = JSON.stringify(combinedPayload.VehicleHistory);
                const encryptedData = await encryptData(code, data);
                localStorage.setItem(code, JSON.stringify(encryptedData));
            }
        },
        async setMOTHistory(combinedPayload){
            let code = systematicFourCharCode('MOTHistory');
            if (combinedPayload.MotHistory) {
                const data = JSON.stringify(combinedPayload.MotHistory.RecordList);
                const encryptedData = await encryptData(code, data);
                localStorage.setItem(code, JSON.stringify(encryptedData));
            }
        },
    },
})