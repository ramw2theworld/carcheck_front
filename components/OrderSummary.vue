<script setup>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faClock, faHeadphones, faCarOn, faRectangleAd } from "@fortawesome/free-solid-svg-icons";
import { features } from "~/static/orderSummary.json";
import { usePlanStore } from '@/stores/plan';
const planStore = usePlanStore();
const selectedPlan = planStore.selectedPlan;
const planFeatures = ref(null);


if (selectedPlan) {
    if (selectedPlan.plan_code === "48h-basic-subscription") {
        planFeatures.value = features.basic_extra_features;
    }
    else if (selectedPlan.plan_code === "48h-export-subscription") {
        planFeatures.value = features.export_extra_features;
    }
    else {
        planFeatures.value = features.single_offer_extra_features;
    }
}

</script>
<template>
    <div class="flex flex-col">
        <div class="mx-auto mt-5 w-full">
            <div class="bg-white shadow-lg rounded-lg border border-gray-200 w-full">
                <div class="px-5 py-4 border-b border-gray-200">
                    <h3 class="font-semibold text-gray-800">Order Summary</h3>
                </div>

                <div class="w-full p-5">
                    <div class="w-full p-4">
                        <ul role="list" class="space-y-4 text-gray-500 dark:text-gray-400">
                            <li class="flex space-x-2 rtl:space-x-reverse items-center"
                                v-for="(feature, index) in planFeatures" :key="index">
                                <svg class="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                    viewBox="0 0 20 20">
                                    <path
                                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                <span class="leading-tight">{{ feature.title }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="flex justify-around px-7 py-1 border-t border-gray-200">
                    <div class=""><span class="text-xs text-green-500">
                            <font-awesome-icon :icon="faClock" />
                            Get 5 reports after 48H for £39.90/month</span></div>
                    <div class="">
                        <span class="text-xs text-green-500">
                            <i class="fas fa-arrow-right"></i> 
                            <font-awesome-icon :icon="faHeadphones"></font-awesome-icon>
                            Access to a Professional customer service</span></div>
                </div>
                <div class="flex justify-around px-7 py-1 border-t border-gray-200">
                    <div class=""><span class="text-xs text-green-500">
                        <font-awesome-icon :icon="faCarOn"></font-awesome-icon> 
                        Obtain a real quote from any of your vehicles</span></div>
                    <div class=""><span class="text-xs text-green-500">
                        <font-awesome-icon :icon="faRectangleAd"></font-awesome-icon>  Consult our Guides to sell and buy your cars</span></div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped></style>
