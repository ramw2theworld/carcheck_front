import ApiService from '@/services/apiService';
const apiService = new ApiService();

export const useSubscriptionStore = defineStore('subscription', {
    state: () => {
        return {
            hasSubscription: {
                auth: false,
                active: false,
                subscription_type: null,
                request_count: 0,

            },
            subscription: null,
        }
    },
    getters: {
        // getHasSubscription: (state) => state.hasSubscription,
    },
    actions: {
        async setHasSubscription(hasSubscription) {
            let code = systematicFourCharCode('hasSubscription')
            if (hasSubscription !=null || hasSubscription !="undefined") {
                const data = JSON.stringify(hasSubscription);
                const encryptedData = await encryptData(code, data);

                localStorage.setItem(code, JSON.stringify(encryptedData));
            }

            this.hasSubscription = hasSubscription;
        },
        async getHasSubscription() {
            let code = systematicFourCharCode('hasSubscription');
            const encryptedData = localStorage.getItem(code);
            if (encryptedData) {
                try {
                    const decrypted = await decryptData(`${code}`, JSON.parse(encryptedData));
                    this.hasSubscription = JSON.parse(decrypted);
                    
                } catch (error) {
                    console.error("Failed to decrypt current subscription:", error);
                }
            }
            return this.hasSubscription;
        },

        async setCurrentSubscription(subscription){
            let code = systematicFourCharCode('currentSubscription')
            if (subscription !=null || subscription !="undefined") {
                const data = JSON.stringify(subscription);
                const encryptedData = await encryptData(code, data);

                localStorage.setItem(code, JSON.stringify(encryptedData));
            }

            this.subscription = subscription;
        },
        async getUserSubscription() {
            let code = systematicFourCharCode('currentSubscription');
            const encryptedData = localStorage.getItem(code);
            if (encryptedData) {
                try {
                    const decrypted = await decryptData(`${code}`, JSON.parse(encryptedData));
                    this.subscription = JSON.parse(decrypted);
                    
                } catch (error) {
                    console.error("Failed to decrypt current subscription:", error);
                }
            }
            return this.subscription;
        },

        // fetch subscription 
        async fetchUserSubscription(email) {
            try {
                const response = await apiService.post('payment/subscription', {
                    email: email
                });
                console.log(response);
                let subscription = response.payload;
                // return response;
                let code = systematicFourCharCode('currentSubscription')
                if (subscription !=null || subscription !="undefined") {
                    const data = JSON.stringify(subscription);
                    const encryptedData = await encryptData(code, data);

                    localStorage.setItem(code, JSON.stringify(encryptedData));
                }

                return subscription;                
            } catch (error) {
                throw error;
            }
        },

        // cancel subscription 
        async cancelSubscription(original_id) {
            try {
                const response = await apiService.post('payment/subscription/cancel', {
                    original_id: original_id
                });
                console.log(response);
                return response;
                
            } catch (error) {
                throw error;
            }
        },
    },
})