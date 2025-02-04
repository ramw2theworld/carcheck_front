<script setup>
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref } from 'vue';

const autoplay = {
  delay: 3000,
  disableOnInteraction: true,
};

const companies = ref([
  { src: '/svg/lanndrover.svg', alt: 'landrover' },
  { src: '/svg/Nissan_2020_logo.svg', alt: 'nissan' },
  { src: '/svg/Audi-Logo_2016.svg', alt: 'audi' },
  { src: '/svg/BMW-logo.svg', alt: 'bmw' },
  { src: '/svg/Logo_Toyota.svg', alt: 'toyota' },
  { src: '/svg/Vauxhall_2019_Logo.svg', alt: 'vauxhall' },
  { src: '/svg/Ford_logo_flat.svg', alt: 'ford' },
  { src: '/svg/volkswagen-logo.svg', alt: 'volkswagen' },
  { src: '/svg/Mercedes-Benz_Logo_2010.svg', alt: 'mercedes' },
  { src: '/svg/Kia-logo.svg', alt: 'kia' },
]);


</script>

<template>
  <div class="flex flex-col items-center justify-center w-full h-[10rem]">
    <div class="relative w-full overflow-hidden px-12">
      <swiper :modules="[Navigation, Autoplay]" :autoplay="autoplay" :slides-per-view="'auto'" :space-between="39"
        :speed="800" :effect="'slide'" :slides-per-group="1" :draggable="true" :grab-cursor="true" class="w-full">
        <swiper-slide v-for="(company, index) in companies" :key="company.alt"
          class="flex items-center justify-center my-auto">
          <img :src="company.src" :alt="company.alt" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style scoped>
.swiper-slide {
  width: auto !important;
}
</style>