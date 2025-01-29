<script lang="ts" setup>

definePageMeta({
  layout: 'dashboard',
});

</script>

<template>
  <div class="h-full w-full flex space-x-7">
    <div class="flex-1 flex flex-col h-full space-y-5">
      <div class="w-full h-[12rem] rounded-xl bg-dashboard-custom-1">
        a
      </div>
      <div class="h-[15rem]">
        <div class="w-full px-2 flex items-center justify-between">
          <p class="text-lg ">Latest Checks</p>
          <span>
            <p class="text-sm">See more</p>
          </span>
        </div>
        <div class="grid grid-cols-3 gap-x-5">
          <div v-for="(_, index) in 3" :key="index" class="h-[12.5rem] rounded-xl bg-green-300 flex items-center px-2">
            a
          </div>
        </div>
      </div>
      <div class="h-[11.5rem] bg-pink-500 rounded-xl">
        c
      </div>
    </div>
    <div class="flex flex-col bg-blue-400 h-full w-[20rem] rounded-lg">d</div>
  </div>
</template>



<style scoped>
.bg-dashboard-custom-1{
  background: linear-gradient(to bottom, #FF7400, #FFA500), url('/path/to/your/image.jpg');
  background-size: cover;
  background-blend-mode: overlay;
}
</style>