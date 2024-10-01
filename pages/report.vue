<script lang="ts" setup>
import { onMounted } from 'vue';

const tokenStore = useTokenStore();
const authStore = useAuthStore();

const refreshToken = computed(() => tokenStore.refreshToken);

onMounted(async () => {
  // if (tokenStore.isTokenExpired) {
  //   debugger
  //     authStore.logout();
  // }
});

definePageMeta({
  title: 'Report',
  meta: [
    {
      hid: 'Car report generated.', name: 'Download all data of the car', content: 'Download all data of the car'
    }

  ],
  middleware: ['check-reg-number'],
});

</script>

<template>
  <div class="bg-white">

    <!-- Section 1 -->
    <ReportSection1 />

    <!-- Section 2 -->
    <ReportInfo />

    <!-- Section 3 -->
    <ReportMileage />

    <!-- Section 4 -->
    <ReportDamage />

    <!-- Section 5 -->
    <ReportMot />

    <!-- Section 6 -->
    <ReportVehicle />

    <!-- Section 7 -->
    <ReportFinance />

    <!-- Section 8 -->
    <ReportValuation />

    <!-- Section 9 -->
    <ReportTax />

    <!-- Section 10 -->
    <ReportRisk />

  </div>

</template>



<style></style>