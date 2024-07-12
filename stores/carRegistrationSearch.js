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
            smmtDetails: null,
            performance: null,
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
        async fetchSmmtDetails() {
            const encryptedData = localStorage.getItem('TNNUE');
            if (encryptedData) {
                try {
                    const decrypted = await decryptData('veh-TNNUE-07', JSON.parse(encryptedData));
                    this.smmtDetails = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt SmmtDetails:", error);
                }
            }
        },
        async fetchVehicleDimension() {
            const encryptedData = localStorage.getItem('WUD');
            if (encryptedData) {
                try {
                    const decrypted = await decryptData('veh-WUD-08', JSON.parse(encryptedData));
                    this.dimensions = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle Dimensions:", error);
                }
            }
        },
        async fetchVehicleRegistration() {
            const encryptedData = localStorage.getItem('WSD');
            if (encryptedData) {
                try {
                    const decrypted = await decryptData('veh-WSD-09', JSON.parse(encryptedData));
                    this.vehicleRegistration = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle Registration:", error);
                }
            }
        },
        async fetchVehicleMotVed() {  
            const encryptedData = localStorage.getItem('WNU');
            if (encryptedData) {
                try {
                    const decrypted = await decryptData('veh-WNU-10', JSON.parse(encryptedData));
                    this.motVed = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle MotVed: ", error);
                }
            }
        },
        async fetchVehicleGeneralInfo() {  
            const encryptedData = localStorage.getItem('WHJ');
            if (encryptedData) {
                try {
                    const decrypted = await decryptData('veh-WHJ-11', JSON.parse(encryptedData));
                    this.general = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle General Information: ", error);
                }
            }
        },
        async fetchPerformance() {  
            const encryptedData = localStorage.getItem('PRFNC');
            if (encryptedData) {
                try {
                    const decrypted = await decryptData('veh-PRFNC-12', JSON.parse(encryptedData));
                    this.performance = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle General Information: ", error);
                }
            }
        },
        async fetchClassificationDetails() {  
            const encryptedData = localStorage.getItem('WDE');
            if (encryptedData) {
                try {
                    const decrypted = await decryptData('veh-WDE-12', JSON.parse(encryptedData));
                    this.classificationDetails = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle Classification Information: ", error);
                }
            }
        },
        async fetchVehicleHistory() {  
            const encryptedData = localStorage.getItem('WJY');
            if (encryptedData) {
                try {
                    const decrypted = await decryptData('veh-WJY-14', JSON.parse(encryptedData));
                    this.vehicleHistory = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle History: ", error);
                }
            }
        },
        async fetchMOTHistory() {  
            const encryptedData = localStorage.getItem('NPUH');
            if (encryptedData) {
                try {
                    const decrypted = await decryptData('veh-NPUH-02', JSON.parse(encryptedData));
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
            "smmtDetails",
            'performance',
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
        async setSmmtDetails(combinedPayload){
            if (combinedPayload.SmmtDetails) {
                const passphrase = 'veh-TNNUE-07';
                const data = JSON.stringify(combinedPayload.SmmtDetails);
                const encryptedData = await encryptData(passphrase, data);
                localStorage.setItem('TNNUE', JSON.stringify(encryptedData));
            }
        },
        async setVehicleDimension(combinedPayload){
            if (combinedPayload.TechnicalDetails) {
                let technical = combinedPayload.TechnicalDetails;
                if(technical.Dimensions){
                    const passphrase = 'veh-WUD-08';
                    const data = JSON.stringify(technical.Dimensions);
                    const encryptedData = await encryptData(passphrase, data);
                    localStorage.setItem('WUD', JSON.stringify(encryptedData));
                }
            }
        },
        async setVehicleRegistration(combinedPayload){
            if (combinedPayload.VehicleRegistration) {
                const passphrase = 'veh-WSD-09';
                const data = JSON.stringify(combinedPayload.VehicleRegistration);
                const encryptedData = await encryptData(passphrase, data);
                localStorage.setItem('WSD', JSON.stringify(encryptedData));
            }
        },
        async setMotVed(combinedPayload){
            let vStatus = combinedPayload.VehicleStatus;
            if (vStatus) {
                if(vStatus.MotVed){
                    const passphrase = 'veh-WNU-10';
                    const data = JSON.stringify(vStatus.MotVed);
                    const encryptedData = await encryptData(passphrase, data);
                    localStorage.setItem('WNU', JSON.stringify(encryptedData));
                }
            }
        },
        async setVehicleGeneralInfo(combinedPayload){
            if (combinedPayload.TechnicalDetails) {
                const passphrase = 'veh-WHJ-11';
                const data = JSON.stringify(combinedPayload.TechnicalDetails?.General);
                const encryptedData = await encryptData(passphrase, data);

                localStorage.setItem('WHJ', JSON.stringify(encryptedData));
            }
        },
        async setPerformance(combinedPayload){
            if (combinedPayload.TechnicalDetails) {
                const passphrase = 'veh-PRFNC-12';
                const data = JSON.stringify(combinedPayload.TechnicalDetails?.Performance);
                const encryptedData = await encryptData(passphrase, data);

                localStorage.setItem('PRFNC', JSON.stringify(encryptedData));
            }
        },
        async setClassificationDetails(combinedPayload){
            if (combinedPayload.ClassificationDetails) {
                const passphrase = 'veh-WDE-12';
                const data = JSON.stringify(combinedPayload.ClassificationDetails);
                const encryptedData = await encryptData(passphrase, data);
                localStorage.setItem('WDE', JSON.stringify(encryptedData));
            }
        },
        async setVehicleHistory(combinedPayload){
            if (combinedPayload.VehicleHistory) {
                const passphrase = 'veh-WJY-14';
                const data = JSON.stringify(combinedPayload.VehicleHistory);
                const encryptedData = await encryptData(passphrase, data);
                localStorage.setItem('WJY', JSON.stringify(encryptedData));
            }
        },
        async setMOTHistory(combinedPayload){
            if (combinedPayload.MotHistory) {
                const passphrase = 'veh-NPUH-02';
                const data = JSON.stringify(combinedPayload.MotHistory.RecordList);
                const encryptedData = await encryptData(passphrase, data);
                localStorage.setItem('NPUH', JSON.stringify(encryptedData));
            }
        },
    },
})