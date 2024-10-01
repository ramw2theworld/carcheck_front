import { useCarRegistrationSearchStore } from '@/stores/carRegistrationSearch';

export default defineNuxtRouteMiddleware((to, from) => {
  const carRegistrationSearchStore = useCarRegistrationSearchStore();
  if (process.client) {
    if (!carRegistrationSearchStore.reg_number || !localStorage.getItem('reg_number')) {
      return navigateTo({
        path: '/',
        query: { message: 'Please enter Car registration number' }
      });
    }
  }
  // if (!carRegistrationSearchStore.reg_number || !localStorage.getItem('reg_number')) {
  //   return navigateTo({ 
  //     path: '/', 
  //     query: { message: 'Please enter Car registration number' } 
  //   });
  // }
});
