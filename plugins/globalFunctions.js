export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('globalFunction', (message) => {
        console.log(`Global Function Message: ${message}`);
    });
});