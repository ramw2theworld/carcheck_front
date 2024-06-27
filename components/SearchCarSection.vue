<script setup>
</script>

<template>
    <div class="2xl:py-40 md:pb-44 pb-20 section-1-bg">
      <div class="flex flex-col items-start lg:w-1/3 w-full md:pr-8 pr-0 md:pl-24 pl-8">
        <h1 class="lg:text-xl  text-xl text-center text-[#0F1829] ">Check it before</h1>
        <h1 class="lg:text-3xl text-2xl text-center text-[#0F1829] font-bold mb-5">you regret it </h1>
        <SearchBar />
        <p class="text-[#0F1829] mt-5 lg:text-2xl md:text-2xl text-xl  font-thin">We can generate a <span class="font-bold">full history</span>
          report for <span class="font-bold">any car</span></p>
      <!--  features      -->
        <Features></Features>
        <div class="flex flex-row items-center justify-center mt-10 w-ful">
          <button class="bg-none">
            <p class="text-[#FF7400] text-lg font-bold">And More ...</p>
          </button>
        </div>

      </div>
    </div>
</template>
<style scoped>
/* Add styles here if needed */

.section-1-bg {
  background-image: url("../assets/png/car-find-section-bg-1.jpeg");
  background-size: cover;

}

@media screen and (min-width: 1500px) {
  .section-1-bg{
   background-position: 0% 75%;
  }
}
</style>

