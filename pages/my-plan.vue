<script setup>
import { onMounted, ref, computed, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useSubscriptionStore } from '@/stores/subscription';

const auth = useAuthStore();
const subscriptionStore = useSubscriptionStore();

const cars = ref([]);
const email = ref(auth.getCurrentUser.email);
const currentSubscription = ref();
const isLoading = ref(false);
const showModal = ref(false);
const isOpen = ref(false)

definePageMeta({
    layout: 'admin',
    title: 'MyPlan'
});

onMounted(async () => {
    try {
        isLoading.value = true;
        let subscription = await subscriptionStore.fetchUserSubscription(email.value);
        if(subscription){
            currentSubscription.value = subscription;
        }else{
            console.log("something went wrong")
        }
    } catch (error) {
        isLoading.value = false;
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

async function cancelSubscription(original_id){
    try {
        isLoading.value = true;
        let response = await subscriptionStore.cancelSubscription(original_id);
        if(response.success){
            currentSubscription.value = response.payload;
        }else{
            console.log("something went wrong")
        }
    } catch (error) {
        isLoading.value = false;
        console.error('Failed to fetch cars:', error);
    } finally {
        isLoading.value = false;
    }
}

</script>


<template>
    <div class="sb-nav-fixed" v-if="currentSubscription">
        <div
            class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {{ currentSubscription.name }}
                </h5>
            </a>
            <div class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <p>Expiry date: {{ currentSubscription.ends_at }}</p>
                <p>Status: {{ currentSubscription.status }}</p>
            </div>
            <a href="#" v-on:click="cancelSubscription(currentSubscription.original_id)"
                v-if="currentSubscription.status !=='cancelled'"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Cancel
                <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
            </a>
        </div>
    </div>
    <div v-else>
        <p>Do not have any subscription</p>
    </div>
</template>