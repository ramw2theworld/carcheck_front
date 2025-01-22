<script setup>
import { ref } from 'vue';
import { usePlanStore } from "@/stores/plan";
const planStore = usePlanStore();
const isMonthlyActive = ref(true);
const plans = ref([]);
import featureData from '@/features.json';

onMounted(async () =>{
  await planStore.fetchPlans();
  plans.value = planStore.plans
        .map(item => ({
            ...item,
            price: (parseFloat(item.amount_premium) / 100).toFixed(2)
        }))
        .filter(item => item.status === "active");
});
console.log(plans.value);

const toggleBilling = (type) => {
  isMonthlyActive.value = (type === 'monthly');
};

const basic_features = reactive(featureData.features.basic_features);
const standard_features = reactive(featureData.features.standerd_features);
const premium_features = reactive(featureData.features.premium_features);

</script>

<template>
  <div class="bg-[#EEEEEE] py-20">
    <div class="flex flex-row items-center justify-between md:px-40 px-10">
      <div>
        <h3 class="text-2xl text-gray-800 w-52 text-start">We have the best</h3>
        <h3 class="text-2xl font-bold text-gray-800 w-52 text-start">Plans aro<span
            class="border-t-orange-500 border-t-4">un</span>d</h3>
      </div>

      <div class="border-2 rounded p-0.5 border-[#0F1829]">
        <button :class="{ 'bg-[#0F1829] text-white': isMonthlyActive, 'text-[#0F1829]': !isMonthlyActive }"
          class="px-4 py-2 rounded" @click="toggleBilling('monthly')">
          Monthly billing
        </button>
        <button :class="{ 'bg-[#0F1829] text-white': !isMonthlyActive, 'text-[#0F1829]': isMonthlyActive }"
          class="px-4 py-2" @click="toggleBilling('yearly')">
          Yearly billing
        </button>
      </div>
    </div>
    <div class="flex md:flex-row flex-col items-stretch justify-center mt-10 gap-4 md:gap-8 px-32" style="min-height: 500px;">
      
      <div v-for="plan in plans" :key="plan.plan_code" class="items-center border-2 border-[#0F1829] rounded-xl px-8 py-6 w-full">
        <h1 class="text-lg font-bold text-[#0F1829] px-2">{{ plan.name }}</h1>
        <div class="flex flex-row items-center justify-start mt-6">
          <div class="flex flex-row items-start justify-center">
            <h3 class="text-4xl text-[#0F1829]">£{{ plan.amount_trial }}</h3>
          </div>
          
          <div class="flex flex-col items-center justify-center ml-4">
            <span class="text-sm text-[#0F1829] font-thin -ml-2">Per User</span>
            <span class="text-sm text-[#0F1829] font-thin">Per Month</span>
          </div>
        </div>
        <h1 class="text-sm font-thin text-[#0F1829] mt-8">Generate up to <span class="font-bold"> 7 reports</span></h1>
        <button class="bg-[#0F1829] text-lg text-white px-4 py-2 rounded mt-2 block w-64">Start Checking</button>
        <button class="text-[#0F1829] text-lg px-4 py-2 rounded mt-2 border border-[#0F1829] block w-64">Read
          More</button>
        <h2 class="text-[#0F1829] text-xl mt-8">Included</h2>
        <p class="text-[#0F1829] text-sm font-thin">What’s included with our plan</p>
        
        <div class="flex flex-col items-start justify-start mt-2 gap-2"
          v-if="plan.plan_code == '48h-basic-subscription'">
          <div v-for="b_feature in basic_features" :key="b_feature.id"
                        class="flex flex-row items-center justify-start">
                        <!-- <img :src="getFeatureIcon(b_feature.icon)" :alt="b_feature.title" class="w-6 orange-filter" /> -->
                        <!-- <img src="`../assets/svg/${b_feature.icon}`" alt="Check Mark" class="w-6" /> -->
                        <img :src="`../assets/svg/${b_feature.icon}`" :alt="b_feature.title || 'Check Mark'" class="w-6" />

                        <h3 :class="{
                'text-white': selectedPlan === plan.plan_code,
                'text-[#0F1829]': selectedPlan !== plan.plan_code
            }" class="text-[#0F1829] text-sm ml-2">{{ b_feature.title }}</h3>
          </div>
          <!-- <div class="flex flex-row items-center justify-start">
            <img src="../assets/svg/damage-check-icon.svg" alt="Check Mark" class="w-6" />
            <h3 class="text-[#0F1829] text-sm ml-2">Damage Check</h3>
          </div>
          <div class="flex flex-row items-center justify-start">
            <img src="../assets/svg/history-owner.svg" alt="Check Mark" class="w-6" />
            <h3 class="text-[#0F1829] text-sm ml-2">Owner History</h3>
          </div>
          <div class="flex flex-row items-center justify-start">
            <img src="../assets/svg/check-mileage.svg" alt="Check Mark" class="w-6" />
            <h3 class="text-[#0F1829] text-sm ml-2">Mileage History</h3>
          </div>
          <div class="flex flex-row items-center justify-start">
            <img src="../assets/svg/check-stolen.svg" alt="Check Mark" class="w-6" />
            <h3 class="text-[#0F1829] text-sm ml-2">Stolen Check</h3>
          </div>
          <div class="flex flex-row items-center justify-start">
            <img src="../assets/svg/check-Mot.svg" alt="Check Mark" class="w-6" />
            <h3 class="text-[#0F1829] text-sm ml-2">Mot Check</h3>
          </div> -->
        </div>

        <!-- standard plan  -->
        <div class="flex flex-col items-start justify-start mt-2 gap-2"
                    v-if="plan.plan_code == '48h-expert-subscription'">
                    <div v-for="b_feature in standard_features" :key="b_feature.id"
                        class="flex flex-row items-center justify-start">
                        <img :src="`../assets/svg/${b_feature.icon}`" :alt="b_feature.title || 'Check Mark'" class="w-6" />
                        <h3 :class="{
            'text-white': selectedPlan === plan.plan_code,
            'text-[#0F1829]': selectedPlan !== plan.plan_code
        }" class="text-[#0F1829] text-sm ml-2">{{ b_feature.title }}</h3>
                    </div>
                </div>
                <!-- premium plan  -->
                <div class="flex flex-col items-start justify-start mt-2 gap-2" v-if="plan.plan_code == 'premium'">
                    <div v-for="premium_feature in premium_features" :key="premium_feature.id"
                        class="flex flex-row items-center justify-start">
                        <img :src="`../assets/svg/${premium_feature.icon}`" :alt="premium_feature.title || 'Check Mark'" class="w-6 orange-filter" />
                        <h3 :class="{
            'text-white': selectedPlan === plan.plan_code,
            'text-[#0F1829]': selectedPlan !== plan.plan_code
        }" class="text-[#0F1829] text-sm ml-2">{{ premium_feature.title }}</h3>
                    </div>
                </div>

      </div>

    </div>
    <img src="/svg/plan-end-track.svg" alt="Plan End Track" class="w-full mt-20" />
  </div>
</template>
<!-- 
<div class="items-center border-2 bg-[#0F1829] rounded-xl px-8 py-6">
  <div class="flex flex-row items-center justify-between">
    <h1 class="text-lg font-bold text-[#ffffff] px-2">Standard Plan</h1>
    <span class="text-[#0F1829] text-xs rounded bg-[#FF7400] px-2 py-0.5">Most Popular</span>
  </div>
  <div class="flex flex-row items-center justify-start mt-6">
    <div class="flex flex-row items-start justify-center">
      <h3 class="text-4xl text-[#ffffff]">$15</h3>
    </div>
    <div class="flex flex-col items-center justify-center ml-2">
      <span class="text-xs text-[#ffffff] font-thin -ml-2">Per User</span>
      <span class="text-xs text-[#ffffff] font-thin">Per Month</span>
    </div>
  </div>
  <h1 class="text-sm font-thin text-[#ffffff] mt-8">Generate up to <span class="font-bold"> 10 reports</span></h1>
  <button class="bg-[#FF7400] text-lg text-white px-4 py-2 rounded mt-2 block w-64">Start Checking</button>
  <button class="text-[#ffffff] text-lg px-4 py-2 rounded mt-2 border border-[#ffffff] block w-64">Read
    More</button>
  <h2 class="text-[#ffffff] text-xl mt-8">Included</h2>
  <p class="text-[#ffffff] text-sm font-thin">What’s included with our plan</p>
  <div class="flex flex-col items-start justify-start mt-4 gap-2">
    <div class="flex flex-row items-center justify-start">
      <img src="../assets/svg/damage-check-icon.svg" alt="Check Mark" class="w-6" />
      <h3 class="text-[#ffffff] text-sm ml-2">Damage Check</h3>
    </div>
    <div class="flex flex-row items-center justify-start">
      <img src="../assets/svg/history-owner.svg" alt="Check Mark" class="w-6" />
      <h3 class="text-[#ffffff] text-sm ml-2">Owner History</h3>
    </div>
    <div class="flex flex-row items-center justify-start">
      <img src="../assets/svg/check-mileage.svg" alt="Check Mark" class="w-6" />
      <h3 class="text-[#ffffff] text-sm ml-2">Mileage History</h3>
    </div>
    <div class="flex flex-row items-center justify-start">
      <img src="../assets/svg/check-stolen.svg" alt="Check Mark" class="w-6" />
      <h3 class="text-[#ffffff] text-sm ml-2">Stolen Check</h3>
    </div>
    <div class="flex flex-row items-center justify-start">
      <img src="../assets/svg/check-Mot.svg" alt="Check Mark" class="w-6" />
      <h3 class="text-[#ffffff] text-sm ml-2">Mot Check</h3>
    </div>
  </div>
</div>
<div class="items-center border-2 border-[#0F1829] rounded-xl px-8 py-6">
  <h1 class="text-lg font-bold text-[#0F1829] px-2">Premium Plan</h1>
  <div class="flex flex-row items-center justify-start mt-6">
    <div class="flex flex-row items-start justify-center">
      <h3 class="text-4xl text-[#0F1829]">$25</h3>
    </div>
    <div class="flex flex-col items-center justify-center ml-4">
      <span class="text-sm text-[#0F1829] font-thin -ml-2">Per User</span>
      <span class="text-sm text-[#0F1829] font-thin">Per Month</span>
    </div>
  </div>
  <h1 class="text-sm font-thin text-[#0F1829] mt-8">Generate up to <span class="font-bold"> 10 reports</span></h1>
  <button class="bg-[#0F1829] text-lg text-white px-4 py-2 rounded mt-2 block w-64">Start Checking</button>
  <button class="text-[#0F1829] text-lg px-4 py-2 rounded mt-2 border border-[#0F1829] block w-64">Read
    More</button>
  <h2 class="text-[#0F1829] text-xl mt-8">Included</h2>
  <p class="text-[#0F1829] text-sm font-thin">What’s included with our plan</p>
  <div class="flex flex-col items-start justify-start mt-2 gap-2">
    <div class="flex flex-row items-center justify-start">
      <img src="../assets/svg/damage-check-icon.svg" alt="Check Mark" class="w-6" />
      <h3 class="text-[#0F1829] text-sm ml-2">Damage Check</h3>
    </div>
    <div class="flex flex-row items-center justify-start">
      <img src="../assets/svg/history-owner.svg" alt="Check Mark" class="w-6" />
      <h3 class="text-[#0F1829] text-sm ml-2">Owner History</h3>
    </div>
    <div class="flex flex-row items-center justify-start">
      <img src="../assets/svg/check-mileage.svg" alt="Check Mark" class="w-6" />
      <h3 class="text-[#0F1829] text-sm ml-2">Mileage History</h3>
    </div>
    <div class="flex flex-row items-center justify-start">
      <img src="../assets/svg/check-stolen.svg" alt="Check Mark" class="w-6" />
      <h3 class="text-[#0F1829] text-sm ml-2">Stolen Check</h3>
    </div>
    <div class="flex flex-row items-center justify-start">
      <img src="../assets/svg/check-Mot.svg" alt="Check Mark" class="w-6" />
      <h3 class="text-[#0F1829] text-sm ml-2">Mot Check</h3>
    </div>
  </div>
</div> -->
