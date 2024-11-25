<script setup>
import { useCarStore } from '@/stores/car';
const carStore = useCarStore();

onMounted(async () => {
  try {
        await carStore.fetchRequestCounts();
        await carStore.fetchCarsUserList();
    } catch (error) {
        console.error("Failed to fetch data on mounted:", error);
    }
});

definePageMeta({
  layout: 'admin',
  title: 'Admin Dashboard page',
  meta: [
    { hid: 'User dashboard to fetch all cars searched', name: 'User dashboard to fetch all cars searched', content: 'User dashboard to fetch all cars searched' }

  ],
  middleware: ['auth'],
});

const userRequestCountLeft = computed(() => carStore.requestCounts);
const userCarsList = computed(() => carStore.userCarsList);
</script>
<template>
    <div>
        <p>Admin Page</p>
        <hr>
        <p>Request count(s): {{ userRequestCountLeft.request_count }}</p>
        <p>Trial Request count(s): {{ userRequestCountLeft.request_count_trial }}</p>
        <p>One off Request count(s): {{ userRequestCountLeft.one_off_request_count }}</p>

        <div v-for="(car, index) in userCarsList" :key="index" class="p-4 mb-4 text-sm 
          text-blue-800 rounded-lg 
            bg-blue-50 dark:bg-gray-800 
            dark:text-blue-400 w-1/3" 
          role="alert">

            <h3>Details</h3>
            <p>Model: {{ car.details.model }}</p>  
            <p>Reg Number: {{ car.details.reg_number }}</p>  
            <p>Fuel Type: {{ car.details.FuelType }}</p>  
            <p>Date first Registered: {{ car.details.DateFirstRegistered }}</p>  
            <img v-if="car.details.ImageUrl" :src="car.details.ImageUrl" alt="{{ car.details.model }}" height="150px" width="90px">
            <img v-if="car.details.vbrand_logo" :src="car.details.vbrand_logo" alt="{{ car.details.model }}" height="150px" width="90px">
        </div>
    </div>
</template>