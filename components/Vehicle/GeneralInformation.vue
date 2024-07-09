<script setup>
import { computed } from 'vue';
import carDefaultImage from '~/assets/png/car-find-section-bg-1.jpeg';
import { useCarRegistrationSearchStore } from '@/stores/carRegistrationSearch';

const store = useCarRegistrationSearchStore();

// Reactive references that update when the store state changes
const vehicleImageUrl = computed(() => store.vehicleImageUrl || carDefaultImage);
const vehicleStatus = computed(() => store.vehicleStatus);

// const vehicleDetails = computed(() => store.vehicleDetails);
// const vehicleManufactureDate = computed(() => store.vehicleRegistration?.YearOfManufacture);
// const technicalDetails = computed(() => store.technicalDetails);

</script>

<template>
  <div class="flex flex-row justify-left px-20 py-10">
    <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
      <h5 class="mb-3 text-base font-semibold text-green-900 md:text-xl dark:text-white">
        General information
        {{  vehicleStatus  }}
      </h5>
      <div class="flex">
        <div class="w-2/5 p-2">
          <img :src="vehicleImageUrl" alt="" class="w-full rounded-lg">
        </div>
        <div class="w-3/5 p-2">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Make</td>
                  <!-- <td class="px-6 py-3">{{ vehicleDetails?.Make }}</td> -->
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Model</td>
                  <!-- <td class="px-6 py-3">{{ vehicleDetails?.Model }}</td> -->
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Colour</td>
                  <!-- <td class="px-6 py-3">{{ vehicleDetails?.Colour }}</td> -->
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Year of manufacture</td>
                  <!-- <td class="px-6 py-3">{{ vehicleManufactureDate }}</td> -->
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Top speed</td>
                  <!-- <td class="px-6 py-3">{{ technicalDetails?.Performance?.MaxSpeed?.Mph }} mph {{ technicalDetails?.Performance }}</td> -->
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">0 to 60 MPH</td>
                  <td class="px-6 py-3">13.3 seconds</td>
                </tr>
                <tr class="bg-white dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Gearbox</td>
                  <td class="px-6 py-3">MANUAL 5 GEARS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles if needed */
</style>
