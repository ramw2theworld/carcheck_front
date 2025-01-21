export default defineNuxtRouteMiddleware((to, from)=>{
    const email = localStorage.getItem('email-for-token');
    if(!email){
        return navigateTo("/auth/forgot-password")
    }
})