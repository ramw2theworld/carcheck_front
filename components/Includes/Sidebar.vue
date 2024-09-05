<template>
    <aside class="w-64 bg-gray-800 text-white" aria-label="Sidebar"> 
        <div class="overflow-y-auto py-4 px-3 rounded">
            <ul class="space-y-2">
                <!-- Dashboard Link -->
                <li>
                    <router-link to="/dashboard"
                        class="flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-700">
                        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 3H5a2 2 0 00-2 2v6h8V3zM3 19a2 2 0 002 2h6V13H3v6zM13 21h6a2 2 0 002-2v-6h-8v8zM21 3h-6v8h8V5a2 2 0 00-2-2z">
                            </path>
                        </svg>
                        <span class="ml-3">Dashboard</span>
                    </router-link>
                </li>

                <!-- Management Dropdown -->
                <li>
                    <button @click="toggleDropdown('management')"
                        class="flex items-center p-2 w-full text-base font-normal rounded-lg hover:bg-gray-700">
                        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"></path>
                        </svg>
                        <span class="flex-1 ml-3 text-left">Management</span>
                        <svg :class="dropdowns.management ? 'rotate-180' : ''" class="w-4 h-4 transition-transform"
                            fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7">
                            </path>
                        </svg>
                    </button>
                    <ul v-show="dropdowns.management" class="pl-8 mt-2 space-y-2">
                        <li>
                            <router-link to="/users" class="flex items-center p-2 text-base font-normal text-white hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <!-- User Icon -->
                            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 14a4 4 0 11-8 0 4 4 0 018 0zm2 2H6c-2.21 0-4 1.79-4 4v3h20v-3c0-2.21-1.79-4-4-4z"/>
                            </svg>
                            <span class="ml-3">Users</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/reports" class="flex items-center p-2 text-base font-normal text-white hover:text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                            <!-- Reports Icon -->
                            <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v4H5a2 2 0 01-2-2v-2h6zm12 4h-6v-4h6v2a2 2 0 01-2 2zM11 4h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2V6a2 2 0 012-2zm-6 8h2 a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2 2 0 012-2zm12-4h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2v-8a2 2 0 012-2z"/>
                            </svg>
                            <span class="ml-3">Reports</span>
                            </router-link>
                        </li>
                    </ul>
                </li>

                <!-- Settings Link -->
                <li>
                    <router-link to="/settings"
                        class="flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-700">
                        <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 1v4m0 10v4M4.22 4.22l2.83 2.83m6.83-2.83l2.83 2.83m-12 6.83l2.83 2.83m6.83-2.83l2.83 2.83M3 12h4m10 0h4M4.22 19.78l2.83-2.83m6.83 2.83l2.83-2.83">
                            </path>
                        </svg>
                        <span class="ml-3">Settings</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'Sidebar',
    setup() {
        const dropdowns = ref({
            management: false,
        });

        function toggleDropdown(key) {
            dropdowns.value[key] = !dropdowns.value[key];
        }

        return {
            dropdowns,
            toggleDropdown,
        };
    },
}
</script>

<style scoped>
/* Applied grey background with bg-gray-800 and text color white */
</style>
