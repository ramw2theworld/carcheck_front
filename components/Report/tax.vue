<script lang="ts" setup>
import Hashed from '@/components/Includes/Hashed.vue';

const isTableVisible = ref(true);
const carRegistrationSearchStore = useCarRegistrationSearchStore();
const subscriptionStore = useSubscriptionStore();
const hasSubscription = computed(() => subscriptionStore.hasSubscription);

const MOTVed = computed(() => carRegistrationSearchStore.motVed);
const vehicleRegistration = computed(() => carRegistrationSearchStore.vehicleRegistration);

const co2label = ref(227);

const toggleTableVisibility = () => {
  isTableVisible.value = !isTableVisible.value;
};

const getClass = (min: number, max: number) => {
  const isActive = co2label.value >= min && co2label.value <= max;
  return isActive ? 'border-4 border-black py-6' : 'py-7';
};

const co2Bands = [
  { label: "A", min: 0, max: 100, color: "#31B554", co2Value: 100 },
  { label: "B-C", min: 101, max: 120, color: "#55BB50", co2Value: 120 },
  { label: "D-E", min: 121, max: 140, color: "#92D33E", co2Value: 140 },
  { label: "F-G", min: 141, max: 165, color: "#BFC522", co2Value: 165 },
  { label: "H-I", min: 166, max: 185, color: "#FAAD1C", co2Value: 185 },
  { label: "J-K", min: 186, max: 225, color: "#F77725", co2Value: 225 },
  { label: "L", min: 226, max: Infinity, color: "#E01E20", co2Value: 226 },
];

const getLabelPosition = () => {
  if (co2label.value >= 0 && co2label.value <= 100) return 'calc(6.89%)';
  if (co2label.value >= 101 && co2label.value <= 120) return 'calc(19.2%)';
  if (co2label.value >= 121 && co2label.value <= 140) return 'calc(31.52%)';
  if (co2label.value >= 141 && co2label.value <= 165) return 'calc(43.84%)';
  if (co2label.value >= 166 && co2label.value <= 185) return 'calc(56.16%)';
  if (co2label.value >= 186 && co2label.value <= 225) return 'calc(68.48%)';
  return 'calc(80.79%)';
};

function setco2label(value: number) {
  co2label.value = value;
}

onMounted(async () => {
  await carRegistrationSearchStore.fetchVehicleMotVed();
  await carRegistrationSearchStore.fetchVehicleRegistration();
  const emissions = (MOTVed.value?.VedCo2Emissions) 
                    ? MOTVed.value.VedCo2Emissions 
                    : 227;
  
  setco2label(emissions);
});

</script>

<template>
  <report-wrapper class="py-9">
    <!-- Toggle table visibility -->
    <div @click.prevent="toggleTableVisibility" class="cursor-pointer text-black flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <!-- Your SVG Icon -->
        <p class="text-2xl font-bold flex items-center justify-center">TAX CALCULATION</p>
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
    </div>

    <div v-show="isTableVisible" class="text-black space-y-14">
      <!-- Vehicle Data Table -->
      <div>
        <table class="w-full text-black mt-8">
          <tbody>
            <tr>
              <th>Vehicle class</th>
              <td>{{ vehicleRegistration?.VehicleClass || 'N/A' }}</td>
            </tr>
            <tr>
              <th>Band</th>
              <td>{{ MOTVed?.VedCo2Band || 'N/A' }}</td>
            </tr>
            <tr>
              <th>Single payment (12 months)</th>
              <td v-if="hasSubscription?.active">{{ MOTVed?.VedRate?.Standard?.TwelveMonth || 'N/A' }}</td>
              <td v-else>
                <Hashed/>
              </td>
            </tr>
            <tr>
              <th>Single six-month payment</th>
              <td v-if="hasSubscription?.active">{{ MOTVed?.VedRate?.Standard?.SixMonth || 'N/A' }}</td>
              <td v-else>
                <Hashed/>
              </td>
            </tr>
            <tr>
              <th>Total payable by 12 monthly instalments</th>
              <td v-if="hasSubscription?.active">{{ MOTVed?.VedRate?.Standard?.SixMonth || 'N/A' }}</td>
              <td v-else>
                <Hashed/>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="bg-[#FF7400] w-full flex items-center justify-center py-2">
          <h3 class="text-xl font-semibold text-white">Lorem ipsum dolor sit amet. <a href="#" class="underline">check the full report</a></h3>
        </div>
      </div>

      <!-- CO2 Band Visualization -->
      <div class="flex items-center justify-center relative lg:px-20 mt-20">
        <div v-if="co2label >= 0"
          class="hidden lg:block absolute -top-6 bg-black text-white text-sm py-1 w-[8.95rem] text-center"
          :style="{ left: getLabelPosition() }">
          YOUR LABEL
        </div>

        <div class="grid grid-cols-7 gap-0 relative w-[70rem]">
          <!-- Looping through co2Bands -->
          <div v-for="band in co2Bands" :key="band.label" :class="getClass(band.min, band.max)"
            :style="{ backgroundColor: band.color }" class="flex flex-col items-center text-center space-y-3 text-2xl"
            @click="setco2label(band.co2Value)">
            <div class="text-white font-bold border-b w-full">{{ band.label }}</div>
            <div class="text-white">{{ band.min }}</div>
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 6" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M6 6L11 1" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <div class="text-white">{{ band.max === Infinity ? band.co2Value + "+" : band.max }}</div>
          </div>
        </div>
      </div>

      <!-- CO2 Emission Details Table -->
      <div>
        <table class="w-full text-black">
          <thead>
            <tr class="header-row">
              <th colspan="2">
                <div class="flex items-center justify-between w-full">
                  <p>CO2 EMISSIONS LABEL</p>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>CO2 Emissions</th>
              <td v-if="MOTVed?.VedCo2Emissions || vehicleRegistration?.Co2Emissions">{{ MOTVed?.VedCo2Emissions ||  vehicleRegistration?.Co2Emissions}}</td>
            </tr>
            <tr>
              <th>CO2 Label </th>
              <td v-if="MOTVed?.VedCo2Band">{{ MOTVed?.VedCo2Band }}</td>
              <td v-else>N/A</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </report-wrapper>
</template>

<style scoped>
table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  text-align: left;
  width: 50%;
}

th {
  font-weight: bold;
  padding: 0.25rem 1.5rem;
}

td {
  padding: 0.68rem 1.5rem;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

.header-row th {
  text-transform: uppercase;
}

.grid {
  grid-template-columns: repeat(7, 1fr);
}
</style>
