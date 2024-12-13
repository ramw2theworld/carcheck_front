<script setup>
import SearchBar from "~/components/SearchBar.vue";
import { isEmpty } from '~/utils/checkObjEmpty'

import { ref } from 'vue';

const isMenuOpen = ref(false);
const errors = ref([]);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
const token = useTokenStore();
const auth = useAuthStore();
// console.log("auth.user", auth.getCurrentUser.name)

const makeLogout = async () => {
  try {
    await auth.logout();
    navigateTo('/')
  } catch (error) {
    console.log("login error: ", error);
    error.value = error.data.errors
  }
}
console.log("hello auth: ", auth.getCurrentUser);
</script>

<template>
  <nav>
    <div class="flex flex-wrap items-center justify-between mx-auto py-8 md:px-24 lg:py-11 px-8 bg-[#EEEEEE]">
      <AppLogo />
      <button data-collapse-toggle="navbar-cta" type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-cta" aria-expanded="false" @click="toggleMenu">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div :class="{ 'hidden': !isMenuOpen, 'flex': isMenuOpen }"
        class="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-cta">
        <ul
          class="flex flex-col md:items-center items-start font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
          <li>
            <NuxtLink to="/how-it-works"
              class="block py-2 px-3 md:p-0 rounded md:bg-transparent md:hover:text-orange-500 active:text-orange-500"
              aria-current="page">How It Works</NuxtLink>
          </li>
          <li>
              <NuxtLink to="/about"
              class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About Us</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/pricing"
              class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</NuxtLink>
          </li>
          <li>
            <NuxtLink href="/reports" v-if="!isEmpty(auth.user)"
              class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Reports</NuxtLink>
          </li>
          <li>
            <SearchBar />
          </li>
          <li>
            <NuxtLink to="/dashboard" v-if="!isEmpty(auth.getCurrentUser)" @click.prevent="makeLogout"
              class="block py-2 px-3 md:p-0 rounded md:bg-transparent md:hover:text-orange-500 active:text-orange-500"
              aria-current="page">Logout</NuxtLink>

            <NuxtLink to="/auth/login" v-else
              class="block py-2 px-3 md:p-0 rounded md:bg-transparent md:hover:text-orange-500 active:text-orange-500"
              aria-current="page">Login</NuxtLink>

          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
