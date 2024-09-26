<script lang="ts" setup>
// Swiper dependencies
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { format, differenceInCalendarDays, parse } from 'date-fns'; // Importing date-fns for date manipulation

const modules = [Autoplay, Pagination, Navigation];

import { useSubscriptionStore } from '@/stores/subscription';
const subscriptionStore = useSubscriptionStore();
const hasSubscription = computed(()=> subscriptionStore.hasSubscription);

const totalMotChecks = ref(0);
const failPercentage = ref(null);
const lastMotDate = ref(null);
const expiryDate = ref(null);
const totalAdviceItems = ref(0);
const totalFailedItems = ref(0);
const longestPeriodBetweenTests = ref(0);
const longestPeriodOffBetweenTest = ref(0);
const mostRecentMOT = ref(null);

const isTableVisible = ref(true);
const toggleTableVisibility = () => {
  isTableVisible.value = !isTableVisible.value;
};

const carRegistrationSearchStore = useCarRegistrationSearchStore();
const motHistory = computed(() => carRegistrationSearchStore.MOTHistory);

const previousMOT = computed(() => {
  return motHistory.value && motHistory.value.length > 1 ? motHistory.value[1] : null;
});

onMounted(async () => {
  try {
    await carRegistrationSearchStore.fetchMOTHistory();
    console.log("motHis: ", motHistory.value);
    if (motHistory.value && motHistory.value.length > 0) {
      expiryDate.value = motHistory.value[0].ExpiryDate;
      lastMotDate.value = motHistory.value[0].TestDate;
      totalMotChecks.value = motHistory.value.length;

      let index = 0; // Define the index, assuming you want the most recent MOT record
      mostRecentMOT.value = motHistory.value[index];

      let maxDifference = 0;

      motHistory.value.forEach((item, index) => {
        if (item.TestResult !== "Pass") {
          totalFailedItems.value += 1;
        }

        // calculate dates difference
        if (index < motHistory.value.length - 1) {
          const currentDate = parse(item.TestDate, 'dd/MM/yyyy', new Date());
          const nextDate = parse(motHistory.value[index + 1].TestDate, 'dd/MM/yyyy', new Date());
          const difference = differenceInCalendarDays(currentDate, nextDate);

          if (difference > maxDifference) {
            maxDifference = difference;
          }
        }
      });

      longestPeriodBetweenTests.value = maxDifference;
      calculateLongestPeriodBetweenTests();
    }

    calculateGauageMeterReading(motHistory);
  } catch (error) {
    console.error('Error fetching MOTHistory:', error);
  }
});

watch(
  () => motHistory.value,
  (motValue) => {
    if (motValue && motValue.length > 0) {
      calculateLongestPeriodBetweenTests(); 
    }
  },
  { immediate: true }
);

// calculate the longest period between tests
function calculateLongestPeriodBetweenTests() {
  if (motHistory.value.length > 1) {
    const dates = motHistory.value.map((record) => parse(record.TestDate, 'dd/MM/yyyy', new Date()));

    let maxDifference = 0;

    for (let i = 1; i < dates.length; i++) {
      const diff = differenceInCalendarDays(dates[i], dates[i - 1]);
      if (diff > maxDifference) {
        maxDifference = diff;
      }
    }

    longestPeriodBetweenTests.value = maxDifference;
  }
}

// calculate gauge meter fail and pass percentage
function calculateGauageMeterReading(motHistory) {
  let failCount = 0;
  let passCount = 0;

  if (motHistory.value && motHistory.value.length > 0) {
    motHistory.value.forEach(item => {
      if (item.TestResult === "Pass") {
        passCount += 1;
      } else {
        failCount += 1;
      }
    });

    let calculated = failCount / motHistory.value.length;
    failPercentage.value = Number((calculated * 100).toFixed());
    console.log("cal: ", failPercentage.value);
  }
}

// swiper setup

const breakpoints = {
  0: {
    slidesPerView: 6,
    spaceBetween: 20,
  },
  426: {
    slidesPerView: 8,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 13,
    spaceBetween: 20,
  },
  1025: {
    slidesPerView: 20,
    spaceBetween: 20,
  },
  1441: {
    slidesPerView: 20,
    spaceBetween: 20,
  },
  2561: {
    slidesPerView: 30,
    spaceBetween: 20,
  },
};

const navigationOptions = {
  nextEl: '.swiper-button-custom-next',
  prevEl: '.swiper-button-custom-prev',
};

let swiperInstance: { slideTo: (arg0: number, arg1: number) => void } | null = null;
let motHistoryIndex = ref(0);

const onSwiper = (swiper: { slideTo: (arg0: number, arg1: number) => void }) => {
  swiperInstance = swiper;

  const navigationNext = document.querySelector('.swiper-button-custom-next');
  const navigationPrev = document.querySelector('.swiper-button-custom-prev');

  if (navigationNext && navigationPrev) {
    navigationNext.addEventListener('click', () => {
      motHistoryIndex.value = motHistoryIndex.value++;
    });

    navigationPrev.addEventListener('click', () => {
      motHistoryIndex.value = motHistoryIndex.value--;
    });
    swiper.slideTo(motHistoryIndex.value, 800);
  }
};

const nextSlide = () => {
  if (motHistoryIndex.value < 100) {
    motHistoryIndex.value++;
  }
  if (swiperInstance) {
    swiperInstance.slideTo(motHistoryIndex.value, 800);
  }
};

const prevSlide = () => {
  if (motHistoryIndex.value > 0) {
    motHistoryIndex.value--;
  }
  if (swiperInstance) {
    swiperInstance.slideTo(motHistoryIndex.value, 800);
  }
};

function handleSliderIndexClick(index: number) {
  mostRecentMOT.value = motHistory.value[index];
}

function isMOThistoryLocked(index: number) {
  return index % 2 === 0;
}

// Helper functions for calculating mileage and days since last pass
function calculateMileageSinceLastPass(currentMOT, previousMOT) {
  if (!previousMOT) return 0;
  return currentMOT.OdometerReading - previousMOT.OdometerReading;
}

function calculateDaysSinceLastTest(currentMOT, previousMOT) {
  if (!previousMOT) return 0;
  return differenceInCalendarDays(new Date(currentMOT.TestDate), new Date(previousMOT.TestDate));
}


const displayedMOTHistory = computed(() => {
  if (hasSubscription.value.active) {
    return motHistory.value;
  } else {
    return motHistory.value.slice(0, 5);
  }
});


</script>

<template>
  <report-wrapper>
    <div @click="toggleTableVisibility"
      class="cursor-pointer text-black flex flex-col md:flex-row items-center justify-between">
      <!-- ------------------------------- -->
      <div class="flex items-center space-x-4">
        <svg width="23" height="28" viewBox="0 0 23 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.56511 21.1951H18.633V20.0436H7.56511V21.1951ZM18.633 14.4323H7.56511V15.5839H18.633V14.4323ZM18.633 8.53345H7.56511V9.82883H18.633V8.53345ZM4.15707 10.8446C4.23275 10.9205 4.33452 10.9625 4.4389 10.9625C4.45804 10.9625 4.47717 10.9607 4.49631 10.958C4.6207 10.9393 4.72943 10.8633 4.79119 10.7508L6.3108 7.97598C6.4204 7.77676 6.35168 7.52751 6.15684 7.41495C6.12813 7.39798 6.09769 7.3819 6.06638 7.3819H5.84718C5.74801 7.52573 5.66016 7.47391 5.60623 7.57308L4.34409 9.87528L3.32724 8.85684C3.16719 8.69693 2.91146 8.69961 2.75576 8.86399C2.60005 9.02837 2.60353 9.29102 2.76358 9.45093L4.15707 10.8446ZM20.3709 2.48981H19.3924C19.4045 2.63365 19.4176 2.53448 19.4298 2.57647L19.4898 2.75068L19.5107 2.80785L19.5141 2.80339C19.5185 2.81947 19.5202 2.83287 19.5246 2.84895L19.9491 4.30246C20.4301 4.58029 20.7354 5.08683 20.7354 5.68986L20.7353 23.6732C20.7353 24.5907 20.0873 25.5555 19.1948 25.5555H11.0918H2.98878C2.09632 25.5555 1.40045 24.5907 1.40045 23.6732L1.40054 5.68896C1.40054 5.12168 1.64236 4.63747 2.06858 4.35159L2.59831 2.52734C2.60527 2.50322 2.59223 2.63365 2.59918 2.48981H1.82415C0.80122 2.48981 9.50484e-05 3.22416 9.50484e-05 4.27655L0 25.0722C0 26.1246 0.801125 27.1377 1.82493 27.1377H20.4169C21.4416 27.1377 22.1349 26.1246 22.1349 25.0722L22.135 4.27655C22.135 3.22416 21.3956 2.48981 20.3709 2.48981ZM4.15707 22.2163C4.23275 22.2922 4.33452 22.3342 4.4389 22.3342C4.45804 22.3342 4.47717 22.3324 4.49631 22.3297C4.6207 22.311 4.72943 22.235 4.79119 22.1225L6.3108 19.3486C6.4204 19.1484 6.35168 18.8956 6.15684 18.783C5.96286 18.6705 5.71583 18.742 5.60623 18.9412L4.34409 21.2452L3.32724 20.2276C3.16719 20.0686 2.91146 20.0713 2.75576 20.2357C2.60005 20.4 2.60353 20.6627 2.76358 20.8226L4.15707 22.2163ZM4.15707 16.572C4.23275 16.6479 4.33452 16.6899 4.4389 16.6899C4.45804 16.6899 4.47717 16.6881 4.49631 16.6854C4.6207 16.6667 4.72943 16.5907 4.79119 16.4782L6.3108 13.7034C6.4204 13.5032 6.35168 13.2504 6.15684 13.1379C5.96286 13.0253 5.71583 13.0968 5.60623 13.296L4.34409 15.6L3.32724 14.5824C3.16719 14.4225 2.91146 14.4261 2.75576 14.5905C2.60005 14.7549 2.60353 15.0175 2.76358 15.1774L4.15707 16.572ZM4.29886 5.94268H17.7101C18.2407 5.94268 18.8252 5.35216 18.6713 4.79828L18.0989 3.01601C17.9354 2.44157 17.6683 2.05743 17.1377 2.05743H13.1878C13.0912 0.762043 12.1492 0 11.0045 0C9.85976 0 8.91772 0.762043 8.82117 2.05743H4.87121C4.34061 2.05743 4.07531 2.38172 3.91004 2.95883L3.33768 4.8626C3.18894 5.3611 3.76825 5.94268 4.29886 5.94268ZM11.0045 0.980024C11.6229 0.980024 12.1361 1.62593 12.2275 2.05743H9.7806C9.87368 1.62593 10.386 0.980024 11.0045 0.980024Z"
            fill="#0F1829" />
        </svg>

        <p class="text-2xl font-bold flex items-center justify-center">
          MOT HISTORY
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
      <!-- ------------------------------- -->
      <div class="flex flex-1 items-center justify-center space-x-4">
        <div>
          <p>Total MOT checks</p>
          <small><span class="font-extralight">Last MOT:</span> {{ mostRecentMOT?mostRecentMOT['TestDate']:'' }}</small>
        </div>
        <h3 class="text-3xl">{{ totalMotChecks }}</h3>
      </div>
      <!-- ------------------------------- -->
      <div class="flex flex-col items-center justify-start flex-1 space-y-1">
        <p>Lorem ipsum dolor sit amet.</p>
        <Includes-get-full-report get-full-report="Get full report"></Includes-get-full-report>
      </div>
      <!-- ------------------------------- -->
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="8" fill="#BDBDBD" />
        <rect x="6.66602" y="6.22229" width="2.66666" height="7.1111" rx="1.33333" fill="white" />
        <rect x="6.66602" y="2.66663" width="2.66667" height="2.66667" rx="1.33333" fill="white" />
      </svg>
      <!-- ------------------------------- -->
    </div>
    <div v-show="isTableVisible" class="text-black space-y-4 w-full">
      <div class="flex flex-col lg:flex-row items-center justify-center">
        <div class="w-full md:w-7/12 lg:w-1/3 relative">
          {{ failPercentage }}
          <chart-gauge v-if="failPercentage" :failRate="failPercentage" height="30" width="100%" />
          <chart-gauge v-else :failRate="0" height="30" width="100%" />
        </div>
        <div class="flex-1 lg:pl-10">
          <table class="w-full text-black mt-6">
            <thead>
              <tr class="header-row">
                <th colspan="2" class="bg-[#f9f9f9]">
                  OVERVIEW
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Expiry date</th>
                <td class="text-[#0DB31E]" style="font-weight: 600;">Valid until {{ expiryDate }}</td>
              </tr>
              <tr>
                <th>Total advice Items</th>
                <td>
                  96 </td>
              </tr>
              <tr>
                <th>Total failed items</th>
                <td>{{ totalFailedItems }}</td>
              </tr>
              <tr>
                <th>Longest period between tests</th>
                <td>{{ longestPeriodBetweenTests??"" }} Days</td>
              </tr>
              <tr>
                <th>Longest period off test</th>
                <td>109 Days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex items-center justify-between w-full lg:px-5">
        <div class="w-fit">
          <button @click="nextSlide"
            class="w-8 h-8 border border-black items-center justify-center flex rounded hover:bg-[#FF7400] transition-colors duration-300">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.16123 8.84323C6.06624 8.74836 6.01281 8.61965 6.0127 8.48539V8.22883C6.01425 8.09487 6.06746 7.96668 6.16123 7.87099L9.63161 4.40737C9.69499 4.34346 9.78128 4.30751 9.87129 4.30751C9.96131 4.30751 10.0476 4.34346 10.111 4.40737L10.5903 4.88674C10.6539 4.94896 10.6896 5.03413 10.6896 5.12305C10.6896 5.21196 10.6539 5.29713 10.5903 5.35936L7.58584 8.35711L10.5903 11.3549C10.6543 11.4183 10.6902 11.5045 10.6902 11.5946C10.6902 11.6846 10.6543 11.7709 10.5903 11.8342L10.111 12.3069C10.0476 12.3708 9.96131 12.4067 9.87129 12.4067C9.78128 12.4067 9.69499 12.3708 9.63161 12.3069L6.16123 8.84323Z"
                fill="#0F1829" />
            </svg>
          </button>
        </div>
        <div class="w-[90%]">
          <swiper :centeredSlides="false" :breakpoints="breakpoints" :autoplay="false" @swiper="onSwiper"
            :navigation="navigationOptions" :modules="modules" class="mySwiper selection:py-6">
            <swiper-slide v-for="(_, index) in totalMotChecks" :key="index" @click.prevent="handleSliderIndexClick(index)" class="cursor-pointer">

              <span v-if="isMOThistoryLocked(index)"
                class="h-8 w-8 items-center justify-center flex rounded bg-[#FFA500]">
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.54785 9.47011V6.63976C7.54785 4.55554 9.23744 2.86595 11.3217 2.86595C13.4059 2.86595 15.0955 4.55554 15.0955 6.63976V9.47011"
                    stroke="white" stroke-width="1.5" stroke-linecap="round" />
                  <path
                    d="M4.71777 9.4702H17.9261V18.3482C17.9261 19.1766 17.2545 19.8482 16.4261 19.8482H6.21777C5.38935 19.8482 4.71777 19.1766 4.71777 18.3482V9.4702Z"
                    stroke="white" stroke-width="1.5" stroke-linejoin="round" />
                  <rect x="13.6807" y="14.6592" width="0.00985118" height="0.00985118" stroke="white"
                    stroke-width="2.25" stroke-linejoin="round" />
                </svg>
              </span>
              <span v-else
                class="h-8 w-8 border items-center justify-center flex rounded border-[#FF7400] text-[#FF7400] hover:bg-[#FF7400] hover:text-white">
                <small>
                  #{{ index + 1 }}
                </small>
              </span>
            </swiper-slide>
          </swiper>
        </div>
        <div class="w-fit">
          <button @click="prevSlide"
            class="w-8 h-8 border border-black items-center justify-center flex rounded hover:bg-[#FF7400] transition-colors duration-300">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.16123 8.84323C6.06624 8.74836 6.01281 8.61965 6.0127 8.48539V8.22883C6.01425 8.09487 6.06746 7.96668 6.16123 7.87099L9.63161 4.40737C9.69499 4.34346 9.78128 4.30751 9.87129 4.30751C9.96131 4.30751 10.0476 4.34346 10.111 4.40737L10.5903 4.88674C10.6539 4.94896 10.6896 5.03413 10.6896 5.12305C10.6896 5.21196 10.6539 5.29713 10.5903 5.35936L7.58584 8.35711L10.5903 11.3549C10.6543 11.4183 10.6902 11.5045 10.6902 11.5946C10.6902 11.6846 10.6543 11.7709 10.5903 11.8342L10.111 12.3069C10.0476 12.3708 9.96131 12.4067 9.87129 12.4067C9.78128 12.4067 9.69499 12.3708 9.63161 12.3069L6.16123 8.84323Z"
                fill="#0F1829" transform="scale(-1, 1) translate(-17, 0)" />
            </svg>
          </button>
        </div>
      </div>
      <table class="w-full text-black mt-6">
        <thead>
          <tr class="header-row">
            <th colspan="2" class="bg-[#FF7400]">
              <div class="flex items-center justify-between w-full text-white">
                <button @click="prevSlide" class="font-extralight flex items-center space-x-2">
                  <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.148537 4.53572C0.0535461 4.44085 0.00011819 4.31214 0 4.17788V3.92132C0.0015556 3.78736 0.0547671 3.65917 0.148537 3.56348L3.61891 0.0998571C3.6823 0.035948 3.76858 0 3.8586 0C3.94861 0 4.0349 0.035948 4.09828 0.0998571L4.57765 0.579228C4.64116 0.641454 4.67695 0.726624 4.67695 0.815537C4.67695 0.90445 4.64116 0.989621 4.57765 1.05185L1.57315 4.0496L4.57765 7.04736C4.64156 7.11074 4.67751 7.19703 4.67751 7.28704C4.67751 7.37706 4.64156 7.46334 4.57765 7.52673L4.09828 7.99935C4.0349 8.06326 3.94861 8.0992 3.8586 8.0992C3.76858 8.0992 3.6823 8.06326 3.61891 7.99935L0.148537 4.53572Z"
                      fill="#EEEEEE" />
                  </svg>
                  <small>Previous MOT</small>
                </button>
                <p>MOT #{{ motHistoryIndex + 1 }}</p>
                <button @click="nextSlide" class="font-extralight flex items-center space-x-2">
                  <small>Next MOT</small>
                  <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4.5292 3.5634C4.62419 3.65827 4.67762 3.78698 4.67773 3.92124L4.67773 4.1778C4.67618 4.31176 4.62297 4.43996 4.5292 4.53564L1.05882 7.99926C0.995435 8.06317 0.90915 8.09912 0.819137 8.09912C0.729125 8.09912 0.642839 8.06317 0.579452 7.99926L0.100081 7.51989C0.036572 7.45767 0.00078303 7.3725 0.000783038 7.28358C0.000783046 7.19467 0.0365721 7.1095 0.100081 7.04727L3.10459 4.04952L0.100082 1.05176C0.0361725 0.988376 0.000224743 0.902091 0.000224751 0.812078C0.000224758 0.722066 0.0361726 0.63578 0.100082 0.572393L0.579453 0.0997735C0.64284 0.0358645 0.729125 -8.33149e-05 0.819138 -8.3307e-05C0.909151 -8.32991e-05 0.995436 0.0358645 1.05882 0.0997736L4.5292 3.5634Z"
                      fill="#EEEEEE" />
                  </svg>
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody v-if="mostRecentMOT">
          <tr>
            <th>Test date</th>
            <td>{{ mostRecentMOT.TestDate }}</td>
          </tr>
          <tr>
            <th>Results</th>
            <td>
              <p class="px-3 text-white" :class="mostRecentMOT.TestResult === 'Pass' ? 'bg-[#0DB31E]' : 'bg-red-600'">
                {{ mostRecentMOT.TestResult }}
              </p>
            </td>
          </tr>
          <tr>
            <th>Odometer reading</th>
            <td>{{ mostRecentMOT.OdometerReading }} miles</td>
          </tr>
          <tr>
            <th>Mileage since last pass</th>
            <td>{{ calculateMileageSinceLastPass(mostRecentMOT, previousMOT) }} miles</td>
          </tr>
          <tr>
            <th>Days since last test</th>
            <td>{{ calculateDaysSinceLastTest(mostRecentMOT, previousMOT) }} days</td>
          </tr>
          <tr>
            <th>Major failures</th>
            <td>{{ mostRecentMOT.MajorFailures || 'None' }}</td>
          </tr>
          <tr>
            <th>Advisories</th>
            <td>{{ mostRecentMOT.Advisories || 'None' }}</td>
          </tr>
        </tbody>
      </table>

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
  font-weight: 100;

}

tr:nth-child(even) {
  background-color: #f9f9f9;
}
</style>
