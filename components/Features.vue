<script lang="ts" setup>
import { defineProps } from 'vue';
import featureData from '../features.json';
const features = reactive(featureData.features.items);

const props = defineProps({
    moreFeatures: Array,
    addedMoreFeatures: Array,

});
</script>

<template>
    <div class="grid md:grid-cols-2 grid-cols-1 gap-x-6  mt-10">
        <!-- <div class="grid md:grid-cols-2 grid-cols-1 gap-x-6 mt-10">
            <div v-for="(feature, index) in features" :key="feature.id" class="flex flex-row items-center mt-3">
                <img :src="`/_nuxt/assets/svg/${feature.icon}`" class="h-8 w-8 mr-2" :alt="`Feature Icon ${index + 1}`">
                <p class="text-black-600 font-extralight mt-2 text-lg">{{ feature.title }}</p>
            </div>
        </div> -->
        
        <div class="flex flex-row items-center  mt-3">
            <img src="assets/svg/damage-check.svg" class="h-8 w-8 mr-2" alt="Feature Icon 1">
            <p class="text-black-600 font-extralight mt-2 text-lg">Damage Check</p>
        </div>
        <div class="flex flex-row items-center  mt-3">
            <img src="assets/svg/owner-history.svg" class="h-8 w-8 mr-2" alt="Feature Icon 2">
            <p class="text-black-600 font-extralight mt-2 text-lg">Owners History</p>
        </div>
        <div class="flex flex-row items-center  mt-3">
            <img src="assets/svg/milage-history.svg" class="h-8 w-8 mr-2" alt="Feature Icon 3">
            <p class="text-black-600 font-extralight mt-2 text-lg">Mileage History</p>
        </div>
        <div class="flex flex-row items-center  mt-3">
            <img src="assets/svg/car-features.svg" class="h-8 w-8 mr-2" alt="Feature Icon 4">
            <p class="text-black-600 font-extralight mt-2 text-lg">Car Features</p>
        </div>
        <div class="flex flex-row items-center  mt-3">
            <img src="assets/svg/theft-check.svg" class="h-8 w-8 mr-2" alt="Feature Icon 4">
            <p class="text-black-600 font-extralight mt-2 text-lg">Theft Check</p>
        </div>
        <div class="flex flex-row items-center  mt-3">
            <img src="assets/svg/warning.svg" class="h-8 w-8 mr-2" alt="Feature Icon 4">
            <p class="text-black-600 font-extralight mt-2 text-lg">MOT History</p>
        </div>
        <!-- {{ addedMoreFeatures.length }}
        <div class="flex flex-row items-center  mt-3" v-if="addedMoreFeatures">
            <img src="assets/svg/warning.svg" class="h-8 w-8 mr-2" alt="Feature Icon 4">
            <p class="text-black-600 font-extralight mt-2 text-lg">MOT History</p>
        </div> -->
        <div v-for="feature in addedMoreFeatures" :key="feature.id" class="flex flex-row items-center mt-3">
            <img :src="`/svg/${feature.icon}`" class="h-8 w-8 mr-2" :alt="`Feature Icon ${feature.id}`" />
            <p class="text-black-600 font-extralight mt-2 text-lg">{{ feature.title }}</p>
        </div>

        <!-- <div class="flex flex-row items-center  mt-3">
            <img src="assets/svg/outstanding-finances.svg" class="h-8 w-8 mr-2" alt="Feature Icon 4">
            <p class="text-black-600 font-extralight mt-2 text-lg">Finance History</p>
        </div>
        <div class="flex flex-row items-center  mt-3">
            <img src="assets/svg/tax-record-icon.svg" class="h-8 w-8 mr-2" alt="Feature Icon 4">
            <p class="text-black-600 font-extralight mt-2 text-lg">Tax Records</p>
        </div>
        <div class="flex flex-row items-center  mt-3">
            <img src="assets/svg/technical-data.svg" class="h-8 w-8 mr-2" alt="Feature Icon 4">
            <p class="text-black-600 font-extralight mt-2 text-lg">Technical data</p>
        </div> -->

        <!-- <div v-for="(feature, index) in features" :key="index" class="flex flex-row items-center mt-3">
            <img :src="`../assets/svg/${feature.icon}`" class="h-8 w-8 mr-2" :alt="`Feature Icon ${index + 1}`">
            <p class="text-black-600 font-extralight mt-2 text-lg">{{ feature.title }}</p>
        </div>  -->
   

    </div>
</template>