<script setup>
</script>
<template>
    <div class="md:pb-44 pb-20">
      <div class="flex flex-col items-start lg:w-1/3 w-full md:pr-8 pr-0 md:pl-24 pl-8">
        <h1 class="lg:text-xl  text-xl text-center text-[#0F1829] ">Check it before</h1>
        <h1 class="lg:text-3xl text-2xl text-center text-[#0F1829] font-bold mb-5">you regret it </h1>
        <SearchBar />
        <p class="text-[#0F1829] mt-5 lg:text-2xl md:text-2xl text-xl  font-thin">We can generate a <span class="font-bold">full history</span>
          report for <span class="font-bold">any car</span></p>
      <!--  features      -->
        <div class="grid md:grid-cols-2 grid-cols-1 gap-x-6  mt-10">
          <div class="flex flex-row items-center  mt-3">
            <img src="assets/svg/damage-check.svg" class="h-8 w-8 mr-2" alt="Feature Icon 1">
            <p class="text-black-600 font-extralight mt-2 text-lg">Damage Check</p>
          </div>
          <div class="flex flex-row items-center  mt-3">
            <img src="assets/svg/owner-history.svg" class="h-8 w-8 mr-2" alt="Feature Icon 2">
            <p class="text-black-600 font-extralight mt-2 text-lg">Owners History</p>
          </div>
          <div class="flex flex-row items-center  mt-3">
            <img src="assets/svg/milage-history.svg" class="h-8 w-8 mr-2" alt="Feature Icon 3">
            <p class="text-black-600 font-extralight mt-2 text-lg">Mileage History</p>
          </div>
          <div class="flex flex-row items-center  mt-3">
            <img src="assets/svg/car-features.svg" class="h-8 w-8 mr-2" alt="Feature Icon 4">
            <p class="text-black-600 font-extralight mt-2 text-lg">Car Features</p>
          </div>
          <div class="flex flex-row items-center  mt-3">
            <img src="assets/svg/theft-check.svg" class="h-8 w-8 mr-2" alt="Feature Icon 4">
            <p class="text-black-600 font-extralight mt-2 text-lg">Theft Check</p>
          </div>
          <div class="flex flex-row items-center  mt-3">
            <img src="assets/svg/warning.svg" class="h-8 w-8 mr-2" alt="Feature Icon 4">
            <p class="text-black-600 font-extralight mt-2 text-lg">MOT History</p>
          </div>
        </div>
        <div class="flex flex-row items-center justify-center mt-10 w-ful">
          <button class="bg-none">
            <p class="text-[#FF7400] text-lg font-bold">And More ...</p>
          </button>
        </div>

      </div>
    </div>
</template>
<style scoped>

</style>
