<script setup>
import SearchBar from "~/components/SearchBar.vue";
import { ref } from 'vue';

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
const token = useTokenStore();
const auth = useAuthStore();
</script>

<template>
  <nav >
    <div class="border-b-2 flex flex-wrap items-center justify-between mx-auto py-8 md:px-24 px-8 bg-[#EEEEEE]">
      <AppLogo />
      <button data-collapse-toggle="navbar-cta" type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-cta" aria-expanded="false" @click="toggleMenu">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
      </button>
      <div :class="{'hidden': !isMenuOpen, 'flex': isMenuOpen}" class="items-center justify-between w-full md:flex md:w-auto md:order-1" id="navbar-cta">
        <ul class="flex flex-col md:items-center items-start font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
          <li>
            <NuxtLink to="/"
                      class="block py-2 px-3 md:p-0 rounded md:bg-transparent md:hover:text-orange-500 active:text-orange-500"
                      aria-current="page">How It Works</NuxtLink>
          </li>
          <li>
            <a href="#"
               class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About US</a>
          </li>
          <li>
            <a href="#"
               class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</a>
          </li>
          <li>
            <a href="#"
               class="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500 md:dark:hover:text-orange-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Reports</a>
          </li>
          <li>
            <SearchBar />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
