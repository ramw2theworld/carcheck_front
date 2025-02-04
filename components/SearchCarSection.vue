<script setup>

const addedMoreFeatures = reactive([]);
const isAddMoreBtnHidden = ref(false);
const moreFeatures = async () => {
  console.log("Hello world");
  addedMoreFeatures.push(
    {
      "id": 12, "title": "Write off", "icon": "warning.svg"
    },
    {
      "id": 7, "title": "Finance History", "icon": "outstanding-finances.svg"
    },
    {
      "id": 8, "title": "Tax Records", "icon": "tax-record-icon.svg"
    },
    {
      "id": 9, "title": "Technical data", "icon": "technical-data.svg"
    },
    {
      "id": 10, "title": "Vehicle Valuation", "icon": "mileage-history-1.svg"
    }
  );
  isAddMoreBtnHidden.value = true;
}
const baseURL = import.meta.env.VITE_BASE_URL;
</script>

<template>
  <!-- <div class="lg:px-[9.12rem] section-1-bg lg:min-h-[75rem]"> -->
  <div class="lg:px-[9.12rem] section-1-bg lg:min-h-[41rem] flex flex-col items-start w-full pt-[5.4%]">
    <h1 class="lg:text-[2.5rem] text-xl text-[#0F1829] leading-[2.8rem]">Check it before
      <br />
      <span class="lg:text-4xl text-2xl text-center font-bold">you regret it </span>
    </h1>

    <!-- <SearchBar class="mt-4" inputHeight="h-[3.75rem]" width="w-[24.6rem]" /> -->
    <div class="h-[4.25rem] bg-blue-500 mt-4 flex translate-x-[30%] relative items-center">
      <SearchBar class="scale-[160%]" width="w-[15.55rem]" />
    </div>
    <p class="text-[#0F1829] mt-5 lg:text-[1.95rem] md:text-2xl text-xl  font-thin">We can generate a <span
        class="font-bold">full history</span> <br />
      report for <span class="font-bold">any car</span></p>
    <!--  features      -->
    <div>
      <Features :addedMoreFeatures="addedMoreFeatures"></Features>
      <div class="flex flex-row items-center justify-center mt-5 w-full" v-if="isAddMoreBtnHidden == false">
        <button class="bg-none" @click="moreFeatures">
          <p class="text-[#FF7400] text-[1.3rem] tracking-widest font-bold">And more ...</p>
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* Add styles here if needed */

.section-1-bg {
  background-image: url("/png/car-find-section-bg-1.png");
  background-size: cover;
  background-position: 0% 79%;
}

@media screen and (min-width: 1500px) {
  .section-1-bg {
    background-position: 0% 75%;
  }
}
</style>
