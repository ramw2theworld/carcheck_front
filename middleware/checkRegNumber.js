import { useCarRegistrationSearchStore } from '@/stores/carRegistrationSearch'

export default defineNuxtRouteMiddleware((to, from) => {
  const carRegistrationSearchStore = useCarRegistrationSearchStore();

  if (!carRegistrationSearchStore.reg_number) {
    return navigateTo('/405');
  }
});