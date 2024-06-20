<script setup>
  const counter = useCounterStore()
  const auth = useAuthStore()
</script>
<template>
    <div
      class="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h5 class="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Welcome to home page</h5>
      <p class="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
        Home
      </p>
      <div class="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
        <p>This is the content {{ auth.user }}</p>
      </div>

      <button class="btn btn-primary" @click="counter.increment"> Count {{ counter.count }} Double Count {{ counter.doubleCount }}</button>
    </div>
</template>