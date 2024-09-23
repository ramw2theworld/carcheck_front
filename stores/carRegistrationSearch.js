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
            getFullReportText: "Get full report"
        }
    },
    getters: {
        getCarDetail(state) {
            return state.basicCarDetails;
        },
    },
    actions: {
        async fetchVehicleImageUrl() {
            let code = systematicFourCharCode('VehicleImageUrl');
            const encryptedData = localStorage.getItem(code);
            if (encryptedData) {
                try {
                    const decrypted = await decryptData(`${code}`, JSON.parse(encryptedData));
                    this.vehicleImageUrl = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt vehicle image url:", error);
                }
            }
            return this.vehicleImageUrl;
        },
        async fetchVehicleLogo() {
            let code = systematicFourCharCode('VehicleLogo');
            const encryptedData = localStorage.getItem(code);
            
            if (!encryptedData) {
                console.log("No encrypted data found for VehicleLogo");
                return null;
            }
        
            try {
                const decrypted = await decryptData(`${code}`, JSON.parse(encryptedData));
                // Ensure vbrand_logo is updated in state
                this.$patch({ vbrand_logo: JSON.parse(decrypted) });
            } catch (error) {
                console.error("Failed to decrypt Vehicle logo: ", error);
            }
            
            return this.vbrand_logo;
        },
        async fetchSmmtDetails() {
            let code = systematicFourCharCode('SmmtDetails');
            const encryptedData = localStorage.getItem(code);
            if (encryptedData) {
                try {
                    const decrypted = await decryptData(`${code}`, JSON.parse(encryptedData));
                    this.smmtDetails = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt SmmtDetails:", error);
                }
            }
            return this.smmtDetails;
        },
        async fetchVehicleDimension() {
            let code = systematicFourCharCode('VehicleDimension');
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
            let code = systematicFourCharCode('VehicleRegistration');
            const encryptedData = localStorage.getItem(code);
            if (encryptedData) {
                try {
                    const decrypted = await decryptData(`${code}`, JSON.parse(encryptedData));
                    this.vehicleRegistration = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle Registration:", error);
                }
            }
            return this.vehicleRegistration
        },
        async fetchVehicleMotVed() {
            let code = systematicFourCharCode('VehicleMotVed');
            const encryptedData = localStorage.getItem(code);
            if (encryptedData) {
                try {
                    const decrypted = await decryptData(`${code}`, JSON.parse(encryptedData));
                    this.motVed = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle MotVed: ", error);
                }
            }
            console.log("motVED: ", this.motVed);
            return this.motVed;
        },
        async fetchVehicleGeneralInfo() {
            let code = systematicFourCharCode('VehicleGeneralInfo');
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
            let code = systematicFourCharCode('Performance');
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
                    this.MOTHistory = JSON.parse(decrypted);
                } catch (error) {
                    console.error("Failed to decrypt Vehicle MOT History: ", error);
                }
            }
            return this.MOTHistory;
        },

        async fetchFullReportText() {
            return this.getFullReportText;
        },
        
        // Search and store vehicle registration details
        async searchCarRegNumber(car_reg_number) {
            try {
                this.reg_number = car_reg_number;

                const response = await apiService.get(`v1/car-check/${car_reg_number}`);
                if (response.payload && Array.isArray(response.payload)) {
                    let combinedPayload = response.payload.reduce((acc, item) => {
                        return { ...acc, ...item };
                    }, {});

                    // Update store state with fetched data
                    await this.setVehicleImageUrl(combinedPayload);
                    await this.setVehicleLogo(combinedPayload);
                    await this.setSmmtDetails(combinedPayload);
                    await this.setVehicleDimension(combinedPayload);
                    await this.setVehicleRegistration(combinedPayload);
                    await this.setMotVed(combinedPayload);
                    await this.setVehicleGeneralInfo(combinedPayload);
                    await this.setPerformance(combinedPayload);
                    await this.setClassificationDetails(combinedPayload);
                    await this.setVehicleHistory(combinedPayload);
                    await this.setMOTHistory(combinedPayload);

                    localStorage.setItem('reg_number', this.reg_number);
                }
            } catch (error) {
                console.log("Error while fetching car details:", error);
                throw error;
            }
        },

        // Set data in localStorage with encryption
        async setVehicleImageUrl(combinedPayload) {
            let code = systematicFourCharCode('VehicleImageUrl');
            if (combinedPayload.VehicleImages.ImageDetailsCount > 0) {
                const data = JSON.stringify(combinedPayload.VehicleImages.ImageDetailsList[0].ImageUrl);
                const encryptedData = await encryptData(code, data);
                localStorage.setItem(code, JSON.stringify(encryptedData));
            }
        },
        async setVehicleLogo(combinedPayload) {
            let code = systematicFourCharCode('VehicleLogo');
            if (combinedPayload.vbrand_logo) {
                const data = JSON.stringify(combinedPayload.vbrand_logo);
                const encryptedData = await encryptData(code, data);
                localStorage.setItem(code, JSON.stringify(encryptedData));
            }
        },
        async setSmmtDetails(combinedPayload) {
            let code = systematicFourCharCode('SmmtDetails');
            if (combinedPayload.SmmtDetails) {
                const data = JSON.stringify(combinedPayload.SmmtDetails);
                const encryptedData = await encryptData(code, data);
                localStorage.setItem(code, JSON.stringify(encryptedData));
            }
        },
        async setVehicleDimension(combinedPayload) {
            let code = systematicFourCharCode('VehicleDimension');
            if (combinedPayload.TechnicalDetails && combinedPayload.TechnicalDetails.Dimensions) {
                const data = JSON.stringify(combinedPayload.TechnicalDetails.Dimensions);
                const encryptedData = await encryptData(code, data);
                localStorage.setItem(code, JSON.stringify(encryptedData));
            }
        },
        async setVehicleRegistration(combinedPayload) {
            let code = systematicFourCharCode('VehicleRegistration');
            if (combinedPayload.VehicleRegistration) {
                const data = JSON.stringify(combinedPayload.VehicleRegistration);
                const encryptedData = await encryptData(code, data);
                localStorage.setItem(code, JSON.stringify(encryptedData));
            }
        },
        async setMotVed(combinedPayload) {
            let code = systematicFourCharCode('VehicleMotVed');
            if (combinedPayload.VehicleStatus && combinedPayload.VehicleStatus.MotVed) {
                const data = JSON.stringify(combinedPayload.VehicleStatus.MotVed);
                const encryptedData = await encryptData(code, data);
                localStorage.setItem(code, JSON.stringify(encryptedData));
            }
        },
        async setVehicleGeneralInfo(combinedPayload) {
            let code = systematicFourCharCode('VehicleGeneralInfo');
            if (combinedPayload.TechnicalDetails && combinedPayload.TechnicalDetails.General) {
                const data = JSON.stringify(combinedPayload.TechnicalDetails.General);
                const encryptedData = await encryptData(code, data);
                localStorage.setItem(code, JSON.stringify(encryptedData));
            }
        },
        async setPerformance(combinedPayload) {
            let code = systematicFourCharCode('Performance');
            if (combinedPayload.TechnicalDetails && combinedPayload.TechnicalDetails.Performance) {
                const data = JSON.stringify(combinedPayload.TechnicalDetails.Performance);
                const encryptedData = await encryptData(code, data);
                localStorage.setItem(code, JSON.stringify(encryptedData));
            }
        },
        async setClassificationDetails(combinedPayload) {
            let code = systematicFourCharCode('VehicleClassificationDetails');
            if (combinedPayload.ClassificationDetails) {
                const data = JSON.stringify(combinedPayload.ClassificationDetails);
                const encryptedData = await encryptData(code, data);
                localStorage.setItem(code, JSON.stringify(encryptedData));
            }
        },
        async setVehicleHistory(combinedPayload) {
            let code = systematicFourCharCode('VehicleHistory');
            if (combinedPayload.VehicleHistory) {
                const data = JSON.stringify(combinedPayload.VehicleHistory);
                const encryptedData = await encryptData(code, data);
                localStorage.setItem(code, JSON.stringify(encryptedData));
            }
        },
        async setMOTHistory(combinedPayload) {
            let code = systematicFourCharCode('MOTHistory');
            if (combinedPayload.MotHistory) {
                const data = JSON.stringify(combinedPayload.MotHistory.RecordList);
                const encryptedData = await encryptData(code, data);
                localStorage.setItem(code, JSON.stringify(encryptedData));
            }
        },
        async setFullReportText(text) {
            this.getFullReportText = text;
        },
    },
    persist: {
        paths: ["reg_number", "getFullReportText"],
    },
});
