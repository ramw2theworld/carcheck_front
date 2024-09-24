<script setup>
import { onMounted, ref, computed, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore();
const cars = ref([]);
const isLoading = ref(false);


definePageMeta({
  layout: 'admin',
  title: 'Dashboard',
  meta: [
    { hid: 'User dashboard to fetch all cars searched', name: 'User dashboard to fetch all cars searched', content: 'User dashboard to fetch all cars searched' }

  ],
  middleware: ['admin'],
});

const pagination = reactive({
  total: 0,
  currentPage: 1,
  perPage: 1
});

onMounted(async () => {
  try {
    const data = await auth.fetchUserCars(pagination.currentPage, pagination.perPage);
    cars.value = data.payload;
    pagination.total = data.payload.total;
  } catch (error) {
    console.error('Failed to fetch cars:', error);
  } finally {
    isLoading.value = false;
  }
});

function fetchPage(page) {
  isLoading.value = true;
  try{
    pagination.currentPage = page;
    auth.fetchUserCars(page, pagination.perPage).then(data => {
      cars.value = data.payload;
      pagination.total = data.payload.total;
    });
  } catch(error){
    console.error('Failed to fetch cars:', error);
  } finally{

    setTimeout(() => {
      isLoading.value = false;
    }, 3000);
  }
  
}
const computedPages = computed(() => {
  const total = pagination.total || 0;
  const perPage = pagination.perPage || 1;
  return total > 0 ? Math.ceil(total / perPage) : 0;
});

</script>


<template>
  <div class="sb-nav-fixed">
    <div class="card mb-4">
      <div class="card-header">
        <i class="fas fa-table me-1"></i>
        Car List
      </div>
      <div class="card-body">
        
        <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
          <div class="mx-auto max-w-screen-xl px-1 lg:px-1">
            <!-- Start coding here -->
            <div class="overflow-x-auto">
              
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" >
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-4 py-3">SN.</th>
                    <th scope="col" class="px-4 py-3">Car Reg. Number</th>
                    <th scope="col" class="px-4 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="isLoading">
                    <td class="px-4 py-3"><div class="loader">Loading...</div></td>
                  </tr>
                  <tr v-else class="border-b dark:border-gray-700" v-for="(car, index) in cars.items" :key="index">
                    <td class="px-4 py-3">{{ index + 1 }}</td>
                    <td class="px-4 py-3"><b>{{ car.reg_number }}</b></td>
                    <td class="px-4 py-3">{{ car.created_at }}</td>
                  </tr>

                </tbody>
              </table>
            </div>

            <nav 
              class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
              aria-label="Table navigation">
              <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing
                <span class="font-semibold text-gray-900 dark:text-white">{{ (pagination.currentPage - 1) *
                    pagination.perPage + 1 }}-{{ Math.min(pagination.currentPage * pagination.perPage, pagination.total)
                  }}</span>
                of
                <span class="font-semibold text-gray-900 dark:text-white">{{ pagination.total }}</span>
              </span>
              <ul class="inline-flex items-center space-x-1">
                <li>
                  <button @click="fetchPage(pagination.currentPage - 1)" :disabled="pagination.currentPage === 1"
                    class="p-2 rounded-lg text-gray-500 hover:text-gray-700 disabled:opacity-50">
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>
                <li v-for="page in computedPages" :key="page">
                  <button @click="fetchPage(page)" :disabled="page === pagination.currentPage"
                    class="px-3 py-1 rounded-lg text-sm"
                    :class="{ 'bg-blue-500 text-white': page === pagination.currentPage, 'hover:bg-gray-100': page !== pagination.currentPage }">
                    {{ page }}
                  </button>
                </li>
                <li>
                  <button @click="fetchPage(pagination.currentPage + 1)"
                    :disabled="pagination.currentPage === computedPages"
                    class="p-2 rounded-lg text-gray-500 hover:text-gray-700 disabled:opacity-50">
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>

          </div>
        </section>
      </div>
    </div>
  </div>
</template>