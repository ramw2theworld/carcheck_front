<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";

const isTableVisible = ref(true);
const toggleTableVisibility = () => {
  isTableVisible.value = !isTableVisible.value;
};

const carRegistrationSearchStore = useCarRegistrationSearchStore();
const valuationLists = computed(() => carRegistrationSearchStore.vehicleValuationsList);
const chartData = ref([]); // Initialize as an empty array
const isClient = ref(false); // To track whether we're on the client side

onMounted(async () => {
  isClient.value = true;
  await carRegistrationSearchStore.fetchValuationList();
  if (valuationLists.value) {
    mapValuationToChart();
    console.log("chartData after mapValuationToChart:", chartData.value); // Check here

  }
});

function mapValuationToChart() {
  const valuations = valuationLists.value || {}; // Handle if valuations are undefined
  chartData.value = [
    { label: "OTR (On The Road)", value: Number(valuations.OTR) || 0 },
    { label: "Dealer Forecourt", value: Number(valuations.DealerForecourt) || 0 },
    { label: "Trade Retail", value: Number(valuations.TradeRetail) || 0 },
    { label: "Private Clean", value: Number(valuations.PrivateClean) || 0 },
    { label: "Private Average", value: Number(valuations.PrivateAverage) || 0 },
    { label: "Part Exchange", value: Number(valuations.PartExchange) || 0 },
    { label: "Auction", value: Number(valuations.Auction) || 0 },
    { label: "Trade Average", value: Number(valuations.TradeAverage) || 0 },
    { label: "Trade Poor", value: Number(valuations.TradePoor) || 0 },
  ];

  console.log("Mapped chartData: ", chartData.value);
}

function getChartHeight() {
  if (typeof window === 'undefined') {
    return 50; // Fallback height for SSR
  }

  const screenWidth = window.innerWidth;
  if (screenWidth >= 1024) {
    return 25;
  } else if (screenWidth >= 768) {
    return 40;
  } else {
    return 50;
  }
}

const chartDatax = [
  { label: "OTR (On The Road)", value: 30000 },
  { label: "Dealer Forecourt", value: 12371 },
  { label: "Trade Retail", value: 23444 },
  { label: "Private Clean", value: 30000 },
  { label: "Private Average", value: 23523 },
  { label: "Part Exchange", value: 64645 },
  { label: "Auction", value: 34555 },
  { label: "Trade Average", value: 34543 },
  { label: "Trade Poor", value: 52335 },
];
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

    <div v-show="isTableVisible" class="text-black my-10 w-full">
      {{ chartData }}
      <hr>
      {{ chartDatax }}
      <chart-bar :data="chartDatax" :height="getChartHeight()" width="100%" />

      <div v-if="isClient && chartData.value && chartData.value.length > 0">
        {{ chartData }}
        <!-- Display chart only after chartData is populated -->
        <chart-bar :data="chartData.value" :height="getChartHeight()" width="100%" />
      </div>
      <div v-else>
        <p>Loading chart data...</p>
      </div>
    </div>
  </report-wrapper>
</template>
