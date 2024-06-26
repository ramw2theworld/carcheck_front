<script setup>
</script>
<template>
  <div class="relative bg-[#FFA500] p-1 rounded flex flex-row items-center lg:w-full w-2/3">
    <img src="assets/svg/uk-flag.svg" class="h-6 w-6 mr-1" alt="UK Flag">
    <input type="text" placeholder="00000" class="block  w-full placeholder-opacity-low custom-spacing py-1 text-2xl px-5 text-white bg-[#FFA500] rounded hover:bg-white md:hover:bg-transparent md:hover:text-white md:dark:hover:text-white">
    <button class="bg-[#0F1829] py-1 px-2 rounded ml-1 hover:bg-white md:hover:bg-transparent md:dark:hover:bg-transparent">
      <img src="assets/svg/search-icon.svg" class="h-6 w-6" alt="Search">
    </button>
  </div>
</template>
<style scoped>
.custom-spacing {
  letter-spacing: 0.1em;
}
.custom-spacing::placeholder {
  letter-spacing: 0.1em;
}
.placeholder-opacity-low::placeholder {
  opacity: 0.5;
}
</style>