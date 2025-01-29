<script lang="ts" setup>
const sideBarData = [
  {
    title: 'Home',
    icon: 'icon-home.svg',
    target: '/dash'
  },
  {
    title: 'MyGarage',
    icon: 'icon-garage.svg',
    target: '/garage'
  },
  {
    title: 'History',
    icon: 'icon-history.svg',
    target: '/history'
  },
  {
    title: 'Resources',
    icon: 'icon-resources.svg',
    target: '/resources'
  }
]
</script>

<template>
  <div class="bg-white h-screen w-full px-10 py-5 flex space-x-12 ">
    <!-- sidebar -->
    <div class="bg-[#0F1829] w-[4.25rem] flex-shrink-0 rounded-lg flex flex-col items-center justify-between">
      <div class="flex flex-col w-full mt-[3.75rem] gap-y-10">
        <NuxtLink v-for="(item, index) in sideBarData" :key="item.title" :to="item.target"
          class="flex flex-col items-center">
          <img :src="`/images/svg/${item.icon}`" :alt="item.title">
          <p class="text-[9px]">{{ item.title }}</p>
        </NuxtLink>
      </div>
      <div class="mb-8">
        <img :src="`/images/svg/icon-logout.svg`" alt="Logout">
      </div>
    </div>

    <!-- body -->
    <div class="flex-1 flex flex-col space-y-6">
      <!-- body-header -->
      <div class="w-ful h-[3.5rem] flex">
        <div class="pl-1 flex">
          <AppLogo class="w-[9rem]" />
        </div>
        <div class="flex-1 flex justify-end items-center space-x-10">
          <div class="flex items-center space-x-5">
            <p class="text-lg text-black">Greetings, User !</p>
            <div
              class="w-12 h-12 rounded-full border-2 border-blue-300 flex items-center justify-center overflow-hidden">
              <div class="w-10 h-10 flex items-center justify-center bg-pink-300 rounded-full">
                <AppLogo class="w-full" />
              </div>
            </div>
          </div>

          <button class="px-10 py-2 bg-orange-500 text-white rounded-lg">
            New Check
          </button>
        </div>

      </div>
      <!-- body -->
      <div class="flex-1">
        <slot />
      </div>
    </div>
  </div>
</template>
