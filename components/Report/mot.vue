<script lang="ts" setup>

// Swiper dependencies
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
const modules = [Autoplay, Pagination, Navigation];
// End Swiper dependencies

const isTableVisible = ref(true)
const toggleTableVisibility = () => {
  isTableVisible.value = !isTableVisible.value
}

// swiper

const breakpoints =
{
  0: {
    slidesPerView: 20,
    spaceBetween: 20,
  },
  426: {
    slidesPerView: 20,
    spaceBetween: 20,
  },
  769: {
    slidesPerView: 20,
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
}

const navigationOptions = {
  nextEl: '.swiper-button-custom-next',
  prevEl: '.swiper-button-custom-prev',
};


let swiperInstance: { slideTo: (arg0: number, arg1: number) => void; } | null = null;
let motHistoryIndex = ref(0);

const onSwiper = (swiper: { slideTo: (arg0: number, arg1: number) => void; }) => {
  swiperInstance = swiper;  // Set swiperInstance when onSwiper is called

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
  if (motHistoryIndex.value > 0) {
    motHistoryIndex.value--;
  }
  if (swiperInstance) {
    swiperInstance.slideTo(motHistoryIndex.value, 800);
  }
};

const prevSlide = () => {

  if (motHistoryIndex.value < 100) {
    motHistoryIndex.value++;
  }
  if (swiperInstance) {
    swiperInstance.slideTo(motHistoryIndex.value, 800);
  }
};

function handleSliderIndexClick() {
  alert('clicked');
}
// siper end

function isMOThistoryLocked(index: number) {
  return index % 2 === 0
}
</script>

<template>
  <report-wrapper>
    <div @click="toggleTableVisibility" class="cursor-pointer text-black flex items-center justify-between">
      <!-- ------------------------------- -->
      <div class="flex items-center space-x-4">
        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_230_6081)">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M13.1011 0.832886C20.3434 0.832886 26.2022 6.69432 26.2022 13.9164C26.2022 21.1386 20.3434 27 13.1011 27C5.85881 27 0 21.1386 0 13.9164C0 6.69432 5.86929 0.832886 13.1011 0.832886Z"
              fill="#0F1829" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M13.1016 2.4552C19.4425 2.4552 24.5781 7.58396 24.5781 13.9164C24.5781 20.2488 19.4425 25.3776 13.1016 25.3776C6.76063 25.3776 1.625 20.2488 1.625 13.9164C1.625 7.58396 6.76063 2.4552 13.1016 2.4552Z"
              fill="#EEEEEE" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M12.7028 6.64206C8.67809 6.87233 5.59672 10.3055 5.82729 14.3247C5.9321 16.3239 6.85442 18.1033 8.2379 19.3383L6.96971 20.7618H6.98019C5.2194 19.2023 4.06651 16.9624 3.91978 14.4294C3.64727 9.36344 7.5252 5.03016 12.5979 4.74756L12.7028 6.64206Z"
              fill="#0F1829" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M13.6146 4.74756C18.6873 5.03016 22.5652 9.36344 22.2823 14.4294C22.146 16.9624 20.9826 19.2023 19.2218 20.7618H19.2323L17.9641 19.3488C19.3581 18.1033 20.2699 16.3344 20.3852 14.3247C20.6053 10.3055 17.5344 6.87233 13.5098 6.64206L13.6146 4.74756Z"
              fill="#0F1829" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M22.7751 8.84009L15.994 12.0115L9.21289 15.1935L9.50635 15.7482L9.79982 16.3134L16.2875 12.5768L22.7751 8.84009Z"
              fill="#0F1829" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M13.1007 12.0428C14.1383 12.0428 14.9872 12.8802 14.9872 13.9164C14.9872 14.9526 14.1383 15.79 13.1007 15.79C12.0631 15.79 11.2246 14.9526 11.2246 13.9164C11.2246 12.8802 12.0631 12.0428 13.1007 12.0428Z"
              fill="#0F1829" />
          </g>
          <defs>
            <clipPath id="clip0_230_6081">
              <rect width="26.2022" height="26.1671" fill="white" transform="translate(0 0.832886)" />
            </clipPath>
          </defs>
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
          <small><span class="font-extralight">Last MOT:</span> 23/02/2024</small>
        </div>
        <h3 class="text-3xl">3</h3>
      </div>
      <!-- ------------------------------- -->
      <div class="flex flex-col items-center justify-start flex-1 space-y-1">
        <p>Lorem ipsum dolor sit amet.</p>
        <button class="bg-[#FF7400] text-white text-xl px-20 rounded-lg py-2">Get full report</button>
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
      <div class="flex items-center justify-center">
        <div class="w-1/3 relative">
          <chart-gauge failRate="70" height="30" width="100%" />
          <div class="flex items-center justify-center space-x-5 -translate-y-16 translate-x-1/3 absolute">
            <div class="flex items-center justify-center space-x-2">
              <span class="block bg-red-600 h-3 w-3 rounded-full"></span>
              <p>Fail rate(12)</p>
            </div>
            <div class="flex items-center justify-center space-x-2">
              <span class="block bg-[#FF7400] h-3 w-3 rounded-full"></span>
              <p>Pass rate(42)</p>
            </div>
          </div>
        </div>
        <div class="flex-1 pl-10">
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
                <td class="text-[#0DB31E]" style="font-weight: 600;">Valid until 12/12/2024</td>
              </tr>
              <tr>
                <th>Total advice Items</th>
                <td>
                  96 </td>
              </tr>
              <tr>
                <th>Total failed items</th>
                <td>12</td>
              </tr>
              <tr>
                <th>Longest period between tests</th>
                <td>109 Days</td>
              </tr>
              <tr>
                <th>Longest period off test</th>
                <td>109 Days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="flex items-center justify-between w-full">
        <div class="w-fit">
          <button @click="nextSlide"
            class="w-8 h-8 border items-center justify-center flex rounded hover:bg-[#FF7400] transition-colors duration-300">
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
            <swiper-slide v-for="(_, index) in 100" @click.prevent="handleSliderIndexClick()" class="cursor-pointer">

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
                  #{{ index }}
                </small>
              </span>
            </swiper-slide>
          </swiper>
        </div>
        <div class="w-fit">
          <button @click="prevSlide"
            class="w-8 h-8 border items-center justify-center flex rounded hover:bg-[#FF7400] transition-colors duration-300">
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
                <div class="font-extralight flex items-center space-x-2">
                  <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M0.148537 4.53572C0.0535461 4.44085 0.00011819 4.31214 0 4.17788V3.92132C0.0015556 3.78736 0.0547671 3.65917 0.148537 3.56348L3.61891 0.0998571C3.6823 0.035948 3.76858 0 3.8586 0C3.94861 0 4.0349 0.035948 4.09828 0.0998571L4.57765 0.579228C4.64116 0.641454 4.67695 0.726624 4.67695 0.815537C4.67695 0.90445 4.64116 0.989621 4.57765 1.05185L1.57315 4.0496L4.57765 7.04736C4.64156 7.11074 4.67751 7.19703 4.67751 7.28704C4.67751 7.37706 4.64156 7.46334 4.57765 7.52673L4.09828 7.99935C4.0349 8.06326 3.94861 8.0992 3.8586 8.0992C3.76858 8.0992 3.6823 8.06326 3.61891 7.99935L0.148537 4.53572Z"
                      fill="#EEEEEE" />
                  </svg>
                  <small>Previous MOT</small>
                </div>
                <p>MOT #1</p>
                <div class="font-extralight flex items-center space-x-2">
                  <small>Next MOT</small>
                  <svg width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4.5292 3.5634C4.62419 3.65827 4.67762 3.78698 4.67773 3.92124L4.67773 4.1778C4.67618 4.31176 4.62297 4.43996 4.5292 4.53564L1.05882 7.99926C0.995435 8.06317 0.90915 8.09912 0.819137 8.09912C0.729125 8.09912 0.642839 8.06317 0.579452 7.99926L0.100081 7.51989C0.036572 7.45767 0.00078303 7.3725 0.000783038 7.28358C0.000783046 7.19467 0.0365721 7.1095 0.100081 7.04727L3.10459 4.04952L0.100082 1.05176C0.0361725 0.988376 0.000224743 0.902091 0.000224751 0.812078C0.000224758 0.722066 0.0361726 0.63578 0.100082 0.572393L0.579453 0.0997735C0.64284 0.0358645 0.729125 -8.33149e-05 0.819138 -8.3307e-05C0.909151 -8.32991e-05 0.995436 0.0358645 1.05882 0.0997736L4.5292 3.5634Z"
                      fill="#EEEEEE" />
                  </svg>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Test date</th>
            <td>12/12/2024</td>
          </tr>
          <tr>
            <th>Results</th>
            <td>
              <p class="px-3 text-white bg-[#0DB31E] w-fit">Passed</p>
            </td>
          </tr>
          <tr>
            <th>Odometer reading</th>
            <td>12 miles</td>
          </tr>
          <tr>
            <th>Mileage since last pass</th>
            <td>1 miles</td>
          </tr>
          <tr>
            <th>Days since last test</th>
            <td>33</td>
          </tr>
          <tr>
            <th>Major failures</th>
            <td>None</td>
          </tr>
          <tr>
            <th>Advisories</th>
            <td>Nearside and offside front tyres worn</td>
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
  font-size: 18px;
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