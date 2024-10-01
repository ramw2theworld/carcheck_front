<script lang="ts" setup>
import { onMounted, computed, ref, watch } from 'vue';
import { useSubscriptionStore } from '@/stores/subscription';
import Hashed from '../Includes/Hashed.vue';

const isTableVisible = ref(true)
const dateFirstRegistered = ref("");

const carRegistrationSearchStore = useCarRegistrationSearchStore();
const smmtDetail = computed(() => carRegistrationSearchStore.smmtDetails);
const vehicleRegistration = computed(() => carRegistrationSearchStore.vehicleRegistration);

const subscriptionStore = useSubscriptionStore();
const hasSubscription = computed(()=> subscriptionStore.hasSubscription);
onMounted(async () => {
  await carRegistrationSearchStore.fetchSmmtDetails();
  await carRegistrationSearchStore.fetchVehicleRegistration();
});

const toggleTableVisibility = () => {
  isTableVisible.value = !isTableVisible.value
}

watch(vehicleRegistration, (newValue) => {
  if (newValue && newValue.DateFirstRegistered) {
    const registeredDate = newValue.DateFirstRegistered;
    dateFirstRegistered.value = new Date(registeredDate).toISOString().split('T')[0]; 
  }
}, { immediate: true });
</script>

<template>
  <report-wrapper class="py-7">
    <div @click="toggleTableVisibility" class="cursor-pointer text-black flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <svg width="31" height="21" viewBox="0 0 31 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M30.0368 10.528V7.68835C30.0368 7.17745 29.6001 6.73905 29.0693 6.73905H29.0607C28.5299 6.73905 28.1069 7.17745 28.1069 7.68835V10.0023C28.0059 9.99404 27.9665 9.96272 27.898 9.96272H27.1942V8.03445C27.1942 6.84783 26.1874 5.86062 24.9545 5.86062H22.2112C22.1581 4.78606 21.1804 3.80874 19.9817 3.80874H18.2625V3.12478H19.1786C20.1273 3.12478 20.9013 2.52653 20.9013 1.75852V1.41571C20.9013 0.647701 20.1256 0 19.1786 0H12.6664C11.7178 0 10.9575 0.647701 10.9575 1.41571V1.75852C10.9575 2.52653 11.7195 3.12478 12.6664 3.12478H13.6973V3.80874H12.0671C10.8684 3.80874 9.89068 4.78606 9.8376 5.86062H7.09437C5.86146 5.86062 4.86828 6.84783 4.86828 8.03445V11.9174H3.54975V7.78394C3.54975 7.16756 3.02406 6.64346 2.38363 6.64346H2.36993C1.7295 6.64346 1.2175 7.16756 1.2175 7.78394V10.0023C0.506863 10.0946 0 10.6615 0 11.3488V15.3668C0 16.0541 0.506863 16.621 1.2175 16.7133V19.1278C1.2175 19.7442 1.73121 20.2188 2.36993 20.2188H2.38363C3.02406 20.2188 3.54975 19.7442 3.54975 19.1278V14.8477H4.86828V18.8773C4.86828 20.0639 5.86146 21.0016 7.09437 21.0016H16.5159C17.4697 21.0016 19.7711 18.0713 21.2694 18.0713H24.9562C26.1891 18.0713 27.1959 17.1336 27.1959 15.9469V12.8947H27.8997C27.9682 12.8947 28.0076 12.9128 28.1086 12.9046V15.2185C28.1086 15.7294 28.5316 16.1184 29.0624 16.1184H29.071C29.6018 16.1184 30.0385 15.7294 30.0385 15.2185V12.3788C30.0385 11.9866 29.7816 11.652 29.422 11.5185C29.422 11.4971 29.4238 11.4773 29.4238 11.4559C29.4238 11.4345 29.4238 11.413 29.4238 11.3916C29.7816 11.2581 30.0385 10.9236 30.0385 10.5313L30.0368 10.528ZM22.8243 15.8233H19.9492C19.5142 15.8233 18.3378 16.8089 17.7727 17.2819C16.7539 18.1356 16.0176 18.752 15.1956 18.752H9.12354C8.53448 18.752 8.05844 18.2922 8.05844 17.7269C8.05844 17.1616 8.53619 16.7018 9.12354 16.7018H15.1032C15.3651 16.6045 15.9679 16.0755 16.3737 15.7343C17.5262 14.7686 18.718 13.7715 19.9492 13.7715H22.8243C23.4133 13.7715 23.8894 14.2313 23.8894 14.7966C23.8894 15.3619 23.4116 15.8217 22.8243 15.8217V15.8233Z"
            fill="#0F1829" />
        </svg>

        <p class="text-2xl font-bold flex items-center justify-center">
          VEHICLE INFOS
        </p>
        <span>
          <svg v-if="isTableVisible" width="12" height="7" viewBox="0 0 12 7" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 6L11 1" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <svg v-else width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6L6 1" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 1L11 6" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

        </span>
      </div>

      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="8" fill="#BDBDBD" />
        <rect x="6.66602" y="6.22229" width="2.66666" height="7.1111" rx="1.33333" fill="white" />
        <rect x="6.66602" y="2.66663" width="2.66667" height="2.66667" rx="1.33333" fill="white" />
      </svg>

    </div>

    <transition name="collapse">
      <div v-show="isTableVisible">
        <table class="w-full text-black mt-4">
          <thead>
            <tr class="header-row">
              <th colspan="2">General Informations</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Colour</th>
              <td>{{ vehicleRegistration?.Colour }}</td>
            </tr>
            <tr>
              <th>Fuel Type</th>
              <td>{{ smmtDetail?.FuelType }}</td>
            </tr>
            <tr>
              <th>Make</th>
              <td>{{ vehicleRegistration?.Make }}</td>
            </tr>
            <tr>
              <th>Model</th>
              <td>
                <span v-if="vehicleRegistration" >{{ vehicleRegistration?.Model }}</span>
                <Hashed v-else></Hashed>
              </td>
            </tr>
            <tr>
              <th>First registered</th>
              <td>
                <span v-if="dateFirstRegistered" >{{ dateFirstRegistered }}</span>
                <span>{{ '2002-12-09' }}</span>

              </td>
            </tr>
          </tbody>
        </table>

        <div class="items-center justify-center flex space-x-1 bg-[#FF7400] text-xl py-2">
          <p>Unlock 87 more rows with the</p>
          <a href="#" class="underline">full report</a>
        </div>
      </div>
    </transition>
  </report-wrapper>
</template>

<style scoped>
.collapse-enter-active,
.collapse-leave-active {
  transition: max-height 1s ease;
  overflow: hidden;
}

.collapse-enter,
.collapse-leave-to {
  max-height: 0;
}

table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 0.58rem 1.5rem;
  text-align: left;
  width: 50%;
}

th {
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

.header-row th {
  text-transform: uppercase;
}
</style>
