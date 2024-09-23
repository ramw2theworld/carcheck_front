<script lang="ts" setup>
const isTableVisible = ref(true)
const carRegistrationSearchStore = useCarRegistrationSearchStore();
import Hashed from '@/components/Includes/Hashed.vue';

const subscriptionStore = useSubscriptionStore();
const hasSubscription = computed(() => subscriptionStore.hasSubscription);

const toggleTableVisibility = () => {
  isTableVisible.value = !isTableVisible.value;
}

const MOTVed = computed(() => carRegistrationSearchStore.motVed);
console.log("motVed:: ", MOTVed.value);

onMounted(async () => {
  await carRegistrationSearchStore.fetchVehicleMotVed();
  const emissions = MOTVed.value?.VedCo2Emissions || 0;
  setco2label(emissions);
})


const co2label = ref(226)
const getClass = (min: number, max: number) => {
  const isActive = co2label.value >= min && co2label.value <= max
  return isActive ? 'border-4 border-black py-6' : 'py-7'
}

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
  if (co2label.value >= 0 && co2label.value <= 100) return 'calc(6.89%)'
  if (co2label.value >= 101 && co2label.value <= 120) return 'calc(19.2%)'
  if (co2label.value >= 121 && co2label.value <= 140) return 'calc(31.52%)'
  if (co2label.value >= 141 && co2label.value <= 165) return 'calc(43.84%)'
  if (co2label.value >= 166 && co2label.value <= 185) return 'calc(56.16%)'
  if (co2label.value >= 186 && co2label.value <= 225) return 'calc(68.48%)'
  if (co2label.value >= 226) return 'calc(80.79%)'
}

function setco2label(value: number) {
  co2label.value = value
}
</script>


<template>
  <!-- h-[55rem] -->
  <report-wrapper class="py-9">
    <div @click="toggleTableVisibility" class="cursor-pointer text-black flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <svg width="23" height="31" viewBox="0 0 23 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="11.6741" cy="7.22998" rx="6.00804" ry="6" fill="white" />
          <path
            d="M0 1.46634V2.32268H2.94835V1.46634C2.94835 0.656919 2.29055 0 1.48005 0C0.669546 0 0 0.656919 0 1.46634Z"
            fill="#0F1829" />
          <path
            d="M6.76539 26.1008H18.6998V2.0646C18.6998 0.926725 17.7718 0 16.6324 0H3.54688C3.84054 0.422305 4.01673 0.926725 4.01673 1.46634V29.7608C4.01673 29.8781 4.06372 29.9719 4.1342 30.054L5.46154 29.7608C6.36601 29.5613 6.78889 28.7637 6.78889 28.1067C6.78889 27.6962 6.63618 27.3091 6.35427 26.9923C6.21331 26.8281 6.17807 26.6052 6.2603 26.4175C6.34252 26.2181 6.54221 26.1008 6.75365 26.1008H6.76539ZM11.2643 1.84172C14.1421 1.84172 16.4914 4.18786 16.4914 7.06188C16.4914 9.9359 14.1421 12.282 11.2643 12.282C8.3864 12.282 6.03712 9.9359 6.03712 7.06188C6.03712 4.18786 8.37465 1.84172 11.2643 1.84172ZM6.57745 16.2705H15.4108C15.7044 16.2705 15.9511 16.5168 15.9511 16.8101C15.9511 17.1034 15.7044 17.3497 15.4108 17.3497H6.57745C6.28379 17.3497 6.03712 17.1034 6.03712 16.8101C6.03712 16.5168 6.28379 16.2705 6.57745 16.2705ZM14.1304 19.5316C14.1304 19.8249 13.8837 20.0712 13.5901 20.0712H8.40989C8.11623 20.0712 7.86956 19.8249 7.86956 19.5316C7.86956 19.2383 8.11623 18.992 8.40989 18.992H13.5901C13.8837 18.992 14.1304 19.2383 14.1304 19.5316ZM6.03712 22.2531C6.03712 21.9599 6.28379 21.7135 6.57745 21.7135H15.4108C15.7044 21.7135 15.9511 21.9599 15.9511 22.2531C15.9511 22.5464 15.7044 22.7927 15.4108 22.7927H6.57745C6.28379 22.7927 6.03712 22.5464 6.03712 22.2531Z"
            fill="#0F1829" />
          <path
            d="M11.2656 11.2028C13.5562 11.2028 15.4121 9.34932 15.4121 7.06183C15.4121 4.77435 13.5562 2.9209 11.2656 2.9209C8.97507 2.9209 7.11914 4.77435 7.11914 7.06183C7.11914 9.34932 8.97507 11.2028 11.2656 11.2028ZM10.7253 4.23474V3.73032C10.7253 3.43705 10.972 3.1907 11.2656 3.1907C11.5593 3.1907 11.806 3.43705 11.806 3.73032V4.23474C12.6047 4.44589 13.192 5.10281 13.192 5.87703C13.192 6.1703 12.9454 6.41665 12.6517 6.41665C12.358 6.41665 12.1114 6.1703 12.1114 5.87703C12.1114 5.52511 11.7237 5.23185 11.2656 5.23185C10.8075 5.23185 10.4199 5.52511 10.4199 5.87703C10.4199 6.22895 10.8075 6.52222 11.2656 6.52222C12.0174 6.52222 12.7104 6.92107 13.0158 7.53106C13.2273 7.94164 13.2508 8.39913 13.0863 8.82144C12.9101 9.27893 12.5107 9.65432 12.0057 9.84201C11.9352 9.86547 11.8764 9.8772 11.806 9.90066V10.4051C11.806 10.6983 11.5593 10.9447 11.2656 10.9447C10.972 10.9447 10.7253 10.6983 10.7253 10.4051V9.91239C10.2084 9.78335 9.76208 9.44316 9.51541 8.97394C9.43319 8.82144 9.3862 8.66894 9.36271 8.50471C9.31572 8.21144 9.51541 7.9299 9.80907 7.88298C10.1027 7.83606 10.3846 8.03548 10.4316 8.32875C10.4316 8.37567 10.4551 8.43432 10.4786 8.48125C10.6078 8.73932 10.925 8.89182 11.2656 8.89182C11.3831 8.89182 11.5123 8.86836 11.6298 8.83317C11.8412 8.75105 12.0056 8.61029 12.0761 8.43432C12.1114 8.34048 12.1349 8.19971 12.0526 8.02375C11.9234 7.77741 11.6063 7.61318 11.2656 7.61318C10.2084 7.61318 9.33921 6.83895 9.33921 5.88876C9.33921 5.10281 9.92653 4.45762 10.7253 4.24647V4.23474Z"
            fill="#0F1829" />
          <path
            d="M20.9315 30.2297C21.8007 30.2297 22.5173 29.5258 22.5173 28.646V27.1797H7.70503C7.81075 27.473 7.86948 27.7897 7.86948 28.1181C7.86948 28.9628 7.50534 29.7252 6.89453 30.2297H20.9315Z"
            fill="#0F1829" />
        </svg>


        <p class="text-2xl font-bold flex items-center justify-center">
          TAX CALCULATION
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
    <div v-show="isTableVisible" class="text-black space-y-14">
      <div>
        <table class="w-full text-black mt-8">
          <tbody>
            <tr>
              <th>Vehicle class</th>
              <td v-if="hasSubscription?.active">Honda</td>
              <td v-else>
                <Hashed />
              </td>
            </tr>
            <tr>
              <th>Band</th>
              <td v-if="hasSubscription?.active">Honda</td>
              <td v-else>
                <Hashed />
              </td>
            </tr>
            <tr>
              <th>Single payment (12 months)</th>
              <td v-if="hasSubscription?.active">Honda</td>
              <td v-else>
                <Hashed />
              </td>
            </tr>
            <tr>
              <th>Single six month payment</th>
              <td v-if="hasSubscription?.active">Honda</td>
              <td v-else>
                <Hashed />
              </td>
            </tr>
            <tr>
              <th>Total payable by 12 monthly instalments</th>
              <td v-if="hasSubscription?.active">Honda</td>
              <td v-else>
                <Hashed />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="bg-[#FF7400] w-full flex items-center justify-center py-2">
          <h3 class="text-xl font-semibold text-white">Lorem ipsum dolor sit amet. <a href="#" class="underline">check
              the full
              report</a></h3>
        </div>
      </div>

      <div class="flex items-center justify-center relative lg:px-20 mt-20">
        <div v-if="co2label >= 0"
          class="hidden lg:block absolute -top-6 bg-black text-white text-sm py-1 w-[8.95rem] text-center"
          :style="{ left: getLabelPosition() }">
          YOUR LABEL
        </div>
        <div class="grid grid-cols-7 gap-0  relative w-[70rem]">
          <!-- A -->
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

      <div>
        <table class="w-full text-black">
          <thead>
            <tr class="header-row">
              <th colspan="2">
                <div class="flex items-center justify-between w-full">
                  <p>CO2 EMISSIONS LABEL
                  </p>
                  <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="24" height="23" rx="3" fill="#0F1829" />
                    <path
                      d="M21.1943 11.3634C20.5114 9.87013 17.8337 5.00073 12.0007 5.00073C6.16768 5.00073 3.48993 9.87013 2.80708 11.3634C2.71542 11.5635 2.66797 11.781 2.66797 12.0011C2.66797 12.2212 2.71542 12.4388 2.80708 12.6389C3.48993 14.1306 6.16768 19 12.0007 19C17.8337 19 20.5114 14.1306 21.1943 12.6373C21.2858 12.4374 21.3331 12.2202 21.3331 12.0003C21.3331 11.7805 21.2858 11.5633 21.1943 11.3634V11.3634ZM12.0007 17.4445C7.09551 17.4445 4.80664 13.2712 4.22334 12.0089C4.80664 10.7295 7.09551 6.5562 12.0007 6.5562C16.8942 6.5562 19.1839 10.7116 19.778 12.0003C19.1839 13.2891 16.8942 17.4445 12.0007 17.4445Z"
                      fill="white" />
                    <path
                      d="M12 8.11194C11.2309 8.11194 10.4791 8.34001 9.83957 8.7673C9.20008 9.19459 8.70166 9.80192 8.40734 10.5125C8.11301 11.223 8.036 12.0049 8.18605 12.7593C8.3361 13.5136 8.70646 14.2065 9.2503 14.7503C9.79414 15.2942 10.487 15.6645 11.2414 15.8146C11.9957 15.9646 12.7776 15.8876 13.4881 15.5933C14.1987 15.299 14.806 14.8005 15.2333 14.161C15.6606 13.5216 15.8887 12.7697 15.8887 12.0006C15.8874 10.9697 15.4774 9.98127 14.7484 9.25227C14.0193 8.52327 13.031 8.11317 12 8.11194V8.11194ZM12 14.3338C11.5385 14.3338 11.0874 14.197 10.7037 13.9406C10.3201 13.6842 10.021 13.3198 9.8444 12.8935C9.66781 12.4672 9.6216 11.998 9.71163 11.5454C9.80166 11.0928 10.0239 10.6771 10.3502 10.3508C10.6765 10.0245 11.0922 9.80227 11.5448 9.71224C11.9974 9.62221 12.4665 9.66842 12.8929 9.84501C13.3192 10.0216 13.6836 10.3207 13.94 10.7044C14.1964 11.088 14.3332 11.5391 14.3332 12.0006C14.3332 12.6194 14.0874 13.2129 13.6498 13.6504C13.2123 14.088 12.6188 14.3338 12 14.3338Z"
                      fill="white" />
                  </svg>

                </div>

              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>CO2 Emissions</th>
              <td v-if="MOTVed.value?.VedCo2Emissions">{{ MOTVed.value?.VedCo2Emissions }}</td>
              <td v-else><Hashed /></td>
            </tr>
            <tr>
              <th>CO2 Label</th>
              <td v-if="MOTVed.value?.VedCo2Band">{{ MOTVed.value?.VedCo2Band }}</td>
              <td v-else><Hashed /></td>
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