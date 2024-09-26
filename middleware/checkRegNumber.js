import { useCarRegistrationSearchStore } from '@/stores/carRegistrationSearch'

export default defineNuxtRouteMiddleware((to, from) => {
  const carRegistrationSearchStore = useCarRegistrationSearchStore();
  // console.log("hello there: ", carRegistrationSearchStore.reg_number);
  // console.log("hello Mithune: ", localStorage.getItem('reg_number'));

  // if(!carRegistrationSearchStore.reg_number || !localStorage.getItem('reg_number')){
  //   return navigateTo('/405');
  // }
});