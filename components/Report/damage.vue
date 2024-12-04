<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useSubscriptionStore } from '@/stores/subscription';
import Hashed from '@/components/Includes/Hashed.vue';

// Toggle table visibility
const isTableVisible = ref(true);
const toggleTableVisibility = () => {
  isTableVisible.value = !isTableVisible.value;
};

// Subscription check
const subscriptionStore = useSubscriptionStore();
const hasSubscription = computed(() => subscriptionStore.hasSubscription);
const subscription = computed(()=> subscriptionStore.subscription);

// Car registration store
const carRegistrationSearchStore = useCarRegistrationSearchStore();
const MOTHistory = ref([]); // Initialize MOTHistory as an empty array

// Fetch MOTHistory on mounted
onMounted(async () => {
  try {
    // Await the result of fetchMOTHistory
    const motHistoryResult = await carRegistrationSearchStore.fetchMOTHistory();
    
    MOTHistory.value = motHistoryResult || []; // Ensure it's always an array
  } catch (error) {
    console.error("Error fetching MOT History:", error);
  }
});

// Filter failed tests
console.log("mot history: ", MOTHistory.value)
const failedTests = computed(() => {
  // Ensure MOTHistory is an array before filtering
  return Array.isArray(MOTHistory.value)
    ? MOTHistory.value.filter(entry => entry.TestResult === 'Fail')
    : [];
});

// Helper function to get failure category (from FailureReasonList)
function getFailureCategory(failureList) {
  if (failureList && failureList.length > 0) {
    return failureList.map(failure => failure).join(", ");
  }
  return "No failure category";
}

// Helper function to get failure type (from AnnotationDetailsList or custom)
function getFailureType(annotationList) {
  if (annotationList && annotationList.length > 0) {
    return annotationList.map(annotation => annotation.Type).join(", ");
  }
  return "No specific type";
}
</script>


<template>
  <report-wrapper class="py-11">
    <div @click="toggleTableVisibility" class="cursor-pointer text-black flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <svg width="34" height="16" viewBox="0 0 34 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_245_136)">
            <path
              d="M24.861 12.5833L25.9599 10.4092H29.1462C28.519 9.65057 27.5692 9.16663 26.5044 9.16663C25.173 9.16663 24.0166 9.92849 23.4494 11.0386H8.76488C8.29082 10.4011 7.53071 9.98828 6.67335 9.98828C5.23577 9.98828 4.07129 11.1501 4.07129 12.5825C4.07129 14.0149 5.23658 15.1767 6.67335 15.1767C7.46831 15.1767 8.17899 14.8212 8.6563 14.2614L23.5199 14.2557C24.1074 15.2963 25.2257 15.996 26.5036 15.9984C27.5676 15.9968 28.5157 15.5136 29.143 14.7558H25.9583L24.8594 12.5817L24.861 12.5833ZM7.54124 14.1329H5.74711L4.85004 12.5833L5.74711 11.0345H7.54124L8.43831 12.5833L7.54124 14.1329Z"
              fill="#141414" />
            <path
              d="M32.6574 9.75565L32.1023 5.26686C31.9954 4.40481 31.3503 3.88775 30.3682 3.88775H29.1559L25.391 0.504996C25.0279 0.180213 24.5587 0.000855329 24.0709 0.000855329H16.4211C14.7048 4.74115e-05 13.0395 0.584172 11.7016 1.65709L7.43504 5.077L1.69527 6.50459C0.958654 6.6888 0.440835 7.34887 0.440835 8.10669V9.75404C0.197727 9.75485 0 9.95279 0 10.1944V12.3757C0 12.6868 0.252021 12.938 0.56482 12.938H2.98779C2.97645 12.8209 2.96996 12.7029 2.96996 12.5834C2.96996 10.5474 4.63201 8.89037 6.67411 8.89037C7.64249 8.89037 8.57359 9.27494 9.26077 9.94067H22.8351C23.156 9.49631 23.5506 9.11982 23.9963 8.82332C24.724 8.3321 25.6016 8.04448 26.5465 8.04448C29.0603 8.04448 31.0983 10.0764 31.0983 12.5826C31.0983 12.7021 31.0926 12.8201 31.0829 12.9372H32.6542C32.9654 12.9372 33.2174 12.6852 33.2174 12.3749V10.318C33.2223 10.0077 32.9686 9.75404 32.6574 9.75404V9.75565ZM21.3043 4.77888H10.6319L12.6756 3.14123C13.7858 2.24929 15.165 1.76535 16.5905 1.76535H21.3043V4.77888ZM23.0774 4.77888V1.76616H23.7719C24.0125 1.76616 24.2443 1.85503 24.4226 2.0158L26.6 4.77807H23.0774V4.77888Z"
              fill="#141414" />
          </g>
          <defs>
            <clipPath id="clip0_245_136">
              <rect width="33.2174" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>


        <p class="text-2xl font-bold flex items-center justify-center">
          DAMAGE HISTORY
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
    <div v-show="isTableVisible" class="flex flex-row w-full pt-4 space-x-8">
      <div class="lg:w-2/3">
        
        <template v-if="subscription?.plan?.plan_code ==='48h-basic-subscription' && hasSubscription?.onTrial">
          <table class="w-full text-black mt-8">
            <thead>
              <tr class="header-row">
                <th colspan="2">DAMAGE 1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Date</th>
                <td>
                  <Hashed />
                </td>
              </tr>
              <tr>
                <th>Category</th>
                <td>
                  <Hashed />
                </td>
              </tr>
              <tr>
                <th>Type</th>
                <td>
                  <Hashed />
                </td>
              </tr>
              
            </tbody>
          </table>
          <table class="w-full text-black mt-8 mb-2" >
            <thead>
              <tr class="header-row">
                <th colspan="2">DAMAGE 1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Date</th>
                <td>
                  <Hashed />
                </td>
              </tr>
              <tr>
                <th>Category</th>
                <td>
                  <Hashed />
                </td>
              </tr>
              <tr>
                <th>Type</th>
                <td>
                  <Hashed />
                </td>
              </tr>
              
            </tbody>
          </table>
        </template>

        <template v-for="(test, index) in failedTests" :key="index" v-else-if="hasSubscription?.active">
          <table class="w-full text-black mt-8" >
            <thead>
              <tr class="header-row">
                <th colspan="2">DAMAGE {{ index + 1 }}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Date</th>
                <td v-if="hasSubscription?.active">{{ test.TestDate }}</td>
                <td v-else>
                  <Hashed />
                </td>
              </tr>
              <tr>
                <th>Category</th>
                <td v-if="hasSubscription?.active">{{ getFailureCategory(test.FailureReasonList) }}</td>
                <td v-else>
                  <Hashed />
                </td>
              </tr>
              <tr>
                <th>Type</th>
                <td v-if="hasSubscription?.active">{{ getFailureType(test.AnnotationDetailsList) }}</td>
                <td v-else>
                  <Hashed />
                </td>
              </tr>
            </tbody>
          </table>
        </template>

        <template v-else>
          <table class="w-full text-black mt-8">
            <thead>
              <tr class="header-row">
                <th colspan="2">DAMAGE 1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Date</th>
                <td>
                  <Hashed />
                </td>
              </tr>
              <tr>
                <th>Category</th>
                <td>
                  <Hashed />
                </td>
              </tr>
              <tr>
                <th>Type</th>
                <td>
                  <Hashed />
                </td>
              </tr>
              
            </tbody>
          </table>
          <table class="w-full text-black mt-8 mb-2" >
            <thead>
              <tr class="header-row">
                <th colspan="2">DAMAGE 1</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Date</th>
                <td>
                  <Hashed />
                </td>
              </tr>
              <tr>
                <th>Category</th>
                <td>
                  <Hashed />
                </td>
              </tr>
              <tr>
                <th>Type</th>
                <td>
                  <Hashed />
                </td>
              </tr>
              
            </tbody>
          </table>
        </template>

        <div class="bg-[#EF343A] w-full flex items-center justify-center py-2">
          <h3 class="text-xl font-semibold">Lorem ipsum dolor sit amet.
            <Includes-get-full-report get-full-report="check the full
              report"></Includes-get-full-report>
          </h3>
        </div>
      </div>
      <div class="hidden h-full w-1/3 md:flex justify-center">
        <img src="/images/png/report/damage.png" alt="">
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
</style>