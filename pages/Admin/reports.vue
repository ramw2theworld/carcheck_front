<script setup >
import { computed, onMounted } from 'vue';

const carStore = useCarStore();
const loaderText = ref("Fetching records...");
onMounted(async () => {
  await carStore.fetchCarsUserReports();

});

definePageMeta({
  layout: 'admin',
  title: 'Reports',
  meta: [
    { hid: 'User dashboard to fetch all cars searched', name: 'User dashboard to fetch all cars searched', content: 'User dashboard to fetch all cars searched' }
  ],
  middleware: ['auth'],
});

const userReports = computed(() => {
    return carStore.userReports;
});
</script>

<template>
  <div>
    <h1>Reports</h1>
    
    <ul>
      <li v-for="(userReport, key) in userReports" :key="key">
        <div class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
          <div>
            <p>ID: {{ userReport.id }}</p>
            <p>Reg Number: {{ userReport.reg_number }}</p>
            <p>Downloaded Count: {{ userReport.downloaded_count }}</p>
            <p>Created At: {{ userReport.created_at }}</p>
          </div>
          <a 
            :href="userReport.url" 
            download 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <button type="button" class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
              Download
            </button>
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>
