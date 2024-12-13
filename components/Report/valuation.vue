<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
const carRegistrationSearchStore = useCarRegistrationSearchStore();
const subscriptionStore = useSubscriptionStore();


const isTableVisible = ref(true);
const toggleTableVisibility = () => {
  isTableVisible.value = !isTableVisible.value;
};

const valuationLists = computed(() => carRegistrationSearchStore.vehicleValuationsList);
const hasSubscription = computed(()=> subscriptionStore.hasSubscription);

const chartData = ref([]); 
const isClient = ref(false); 
const chartLoaded = ref(false);

onMounted(async () => {
  isClient.value = true;
  await carRegistrationSearchStore.fetchValuationList();
  console.log("hello there valuations: ", valuationLists.value);
  if (valuationLists.value && Array.isArray(valuationLists.value)) {
    mapValuationToChart();
    console.log("chartData after mapValuationToChart:", chartData.value);
  }else{
    console.warn("Valuation data is not available or invalid format.");
  }
});

watch(chartData, (newValue) => {
  if (newValue.length > 0) {
    chartLoaded.value = true; 
  }
});

function mapValuationToChart() {
  console.log("hello there chor: ", valuationLists.value);
  if (valuationLists.value) {
    chartData.value = valuationLists.value.map((item) => ({
      label: item.label,
      value: item.value || 0,
    }));
  }
}

function getChartHeight() {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1024) return 25;
  if (screenWidth >= 768) return 40;
  return 50;
}
</script>



<template>
  <report-wrapper>
    <!-- Toggle table visibility -->
    <div @click="toggleTableVisibility" class="cursor-pointer text-black flex flex-col md:flex-row items-center justify-between">
      <div class="flex items-center space-x-4">
        <p class="text-2xl font-bold flex items-center justify-center">VALUATION DETAILS</p>
        <span>
          <svg v-if="isTableVisible" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 6L11 1" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <svg v-else width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6L6 1" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 1L11 6" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </div>

      <small>Unlock all valuation details on the full report</small>
      <button class="bg-[#FF7400] text-white text-xl w-72 rounded-lg py-2">Get full report</button>
    </div>

    {{ chartData }}
    <div v-show="isTableVisible" class="text-black my-10 w-full">
      <div v-if="isClient && chartData.length > 0">
        {{ chartData }} {{hasSubscription.active}}
        <chart-bar v-if="chartData.length > 0" :data="chartData" :hasSubscription="hasSubscription.active" :height="getChartHeight()" width="100%" />
      </div>
      <div v-else>
        <p>Loading data...</p>
      </div>
    </div>
  </report-wrapper>
</template>
