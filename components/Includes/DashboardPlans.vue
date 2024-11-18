<script setup>
const carStore = useCarStore();

onMounted(async () => {
  await carStore.fetchAllCustomPlans();
});

const custom_plans = computed(() => carStore.custom_plans);

const buyCostumPlan = async (custom_plan) => {
    debugger
    await carStore.buyCustomPlan(custom_plan);
}
</script>

<template>
    <div id="toast-interactive" v-for="(custom_plan, key) in custom_plans" :key=key
        class="w-full max-w-xs p-4 text-gray-500 bg-white 
            rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
        role="alert">
        <div class="flex">
            <div
                class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900">
                <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 18 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97" />
                </svg>
                <span class="sr-only">Refresh icon</span>
            </div>
            <div class="ms-3 text-sm font-normal">
                <span class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                    <h2>{{ custom_plan.name }}</h2>
                </span>
                <div class="mb-2 text-lg font-normal">
                    <h1>- {{ custom_plan.discount_percentage }}%</h1>
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <div>
                        <button @click.prevent="buyCostumPlan(custom_plan)"
                            class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                            Buy
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>