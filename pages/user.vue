<script setup>
import { onMounted, ref, computed, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
const auth = useAuthStore();
const cars = ref([]);
const isLoading = ref(false);
const showModal = ref(false);
const isOpen = ref(false)

definePageMeta({
    layout: 'admin',
    title: 'User'
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

function toggleModal() {
    console.log('Toggle Modal before:', showModal.value);
    showModal.value = !showModal.value;
    alert("hello there");
    console.log('Toggle Modal after:', showModal.value);
}

</script>


<template>
    <div class="sb-nav-fixed">
        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
                User
            </div>
            <div class="card-body">
                <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
                    <div class="mx-auto max-w-screen-xl px-1 lg:px-1">
                        <!-- Start coding here -->
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead
                                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-4 py-3">Name</th>
                                        <th scope="col" class="px-4 py-3">Username</th>
                                        <th scope="col" class="px-4 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr class="border-b dark:border-gray-700">
                                        <td class="px-4 py-3"><b>dfdf</b></td>
                                        <td class="px-4 py-3">dfdf sdf</td>
                                        <td class="px-4 py-3">
                                            <!-- <button @click="toggleModal">Edit</button> -->
                                            <UButton label="Open" @click="isOpen = true" />
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <!-- Main modal -->
        <UModal v-model="isOpen" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-500' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            User Profile
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpen = false" />
                    </div>
                </template>

                    <form class="max-w-sm mx-auto">
                        <div class="mb-2">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@carcheck.com" required />
                        </div>
                        <div class="mb-2">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your v </label>
                            <input type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div class="mb-2">
                            <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                            <input type="password" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div class="flex items-start mb-5">
                            <div class="flex items-center h-5">
                            <input id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                            </div>
                            <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
                        </div>
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
                    </form>

                <template #footer>
                    <Placeholder class="h-8" />
                </template>
            </UCard>
        </UModal>
    </div>
</template>