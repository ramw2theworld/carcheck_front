export const useCarRegistrationSearchStore = defineStore('carRegistrationSearch', {
    state: () => ({ 
        reg_number: "" 
    }),
    getters: {
        
    },
    actions: {
        async searchCarRegNumber(form) {
            try {
                const { payload } = await $fetch('http://localhost:8000/api/login', {
                    method: 'POST',
                    body: {
                        ...form,
                    },
                });

                this.setCommonSetter(payload);
            } catch (error) {
                throw error;
            }
        },

    },
})