<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const companies = ref([
  { src: '/_nuxt/assets/svg/lanndrover.svg', alt: 'landrover' },
  { src: '/_nuxt/assets/svg/Nissan_2020_logo.svg', alt: 'nissan' },
  { src: '/_nuxt/assets/svg/Audi-Logo_2016.svg', alt: 'audi' },
  { src: '/_nuxt/assets/svg/BMW-logo.svg', alt: 'bmw' },
  { src: '/_nuxt/assets/svg/Logo_Toyota.svg', alt: 'toyota' },
  { src: '/_nuxt/assets/svg/Vauxhall_2019_Logo.svg', alt: 'vauxhall' },
  { src: '/_nuxt/assets/svg/Ford_logo_flat.svg', alt: 'ford' },
  { src: '/_nuxt/assets/svg/volkswagen-logo.svg', alt: 'volkswagen' },
  { src: '/_nuxt/assets/svg/Mercedes-Benz_logo_2010.svg', alt: 'mercedes' },
  { src: '/_nuxt/assets/svg/Kia-logo.svg', alt: 'kia' },
]);

const currentSlide = ref(0);
const slider = ref(null);

const updateSliderPosition = () => {
  const slideWidth = slider.value.children[0].offsetWidth;
  slider.value.style.transform = `translateX(-${currentSlide.value * slideWidth}px)`;
};

const next = () => {
  currentSlide.value = (currentSlide.value + 1) % companies.value.length;
  updateSliderPosition();
};

const prev = () => {
  currentSlide.value = (currentSlide.value - 1 + companies.value.length) % companies.value.length;
  updateSliderPosition();
};

const isDown = ref(false);
let startX;
let scrollLeft;

const end = () => {
  isDown.value = false;
  if (slider.value) {
    slider.value.classList.remove('grabbing');
    slider.value.style.cursor = 'grab';
  }
};

const start = (e) => {
  isDown.value = true;
  if (slider.value) {
    slider.value.classList.add('grabbing');
    slider.value.style.cursor = 'grabbing';
    startX = (e.pageX || e.touches[0].pageX) - slider.value.offsetLeft;
    scrollLeft = slider.value.scrollLeft;
  }
};

const move = (e) => {
  if (!isDown.value) return;
  e.preventDefault();
  if (slider.value) {
    const x = (e.pageX || e.touches[0].pageX) - slider.value.offsetLeft;
    const dist = x - startX;
    slider.value.scrollLeft = scrollLeft - dist;
  }
};

onMounted(() => {
  if (slider.value) {
    slider.value.addEventListener('mousedown', start);
    slider.value.addEventListener('touchstart', start);
    slider.value.addEventListener('mousemove', move);
    slider.value.addEventListener('touchmove', move);
    slider.value.addEventListener('mouseleave', end);
    slider.value.addEventListener('mouseup', end);
    slider.value.addEventListener('touchend', end);
    slider.value.style.cursor = 'grab';
  }
  updateSliderPosition();
});

onBeforeUnmount(() => {
  if (slider.value) {
    slider.value.removeEventListener('mousedown', start);
    slider.value.removeEventListener('touchstart', start);
    slider.value.removeEventListener('mousemove', move);
    slider.value.removeEventListener('touchmove', move);
    slider.value.removeEventListener('mouseleave', end);
    slider.value.removeEventListener('mouseup', end);
    slider.value.removeEventListener('touchend', end);
  }
});
</script>
<template>
  <div class="flex flex-col items-center justify-center w-full bg-[#EEEEEE]">
    <div class="relative w-full overflow-hidden mt-5">
      <div ref="slider" class="flex transition-transform duration-300 ease-in-out">
        <div v-for="(company, index) in companies" :key="index" class="flex-shrink-0 mx-4">
          <img :src="company.src" :alt="company.alt" class="mx-6"/>
        </div>
      </div>
      <button @click="prev" class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md">‹</button>
      <button @click="next" class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md">›</button>
    </div>
  </div>
</template>

<style scoped>
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.transition-transform {
  transition: transform 0.3s ease-in-out;
}
.overflow-hidden {
  overflow: hidden;
}
.grabbing {
  cursor: grabbing;
}
</style>

