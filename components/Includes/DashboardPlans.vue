<script setup>
import { ref, computed } from "vue";
import { useCarStore } from "@/stores/car";
import { useSubscriptionStore } from "@/stores/subscription";

const carStore = useCarStore();
const subscriptionStore = useSubscriptionStore();
const subscription = computed(() => subscriptionStore.subscription);
const customPlans = computed(() => carStore.custom_plans);

const cancelBtn = ref("Cancel Subscription");

// Modal state
const isModalVisible = ref(false);
const modalTitle = ref("");
const modalMessage = ref("");
const responseMessage = ref("");
let confirmAction = null;

// Modal Handlers
const showModal = (title, message, onConfirm) => {
  modalTitle.value = title;
  modalMessage.value = message;
  confirmAction = onConfirm;
  isModalVisible.value = true;
};

const confirmModal = async () => {
  if (confirmAction) {
    await confirmAction();
  }
  isModalVisible.value = false;
};

const cancelModal = () => {
  isModalVisible.value = false;
};

// Subscription Actions
const confirmCancellation = () => {
  showModal(
    "Cancel Subscription",
    "Are you sure you want to cancel your subscription?",
    cancelSubscription
  );
};

const cancelSubscription = async () => {
  if (!subscription.value?.original_id) {
    console.error("Invalid subscription data.");
    return;
  }

  try {
    const response = await subscriptionStore.cancelSubscription(subscription.value.original_id);
    console.log("Subscription canceled:", response);
    subscriptionStore.setCurrentSubscription(null);
  } catch (error) {
    responseMessage.value = error.data?.message;
    clearResponseMessage();
  }
};

// Fetch Custom Plans
onMounted(async () => {
  try {
    await carStore.fetchAllCustomPlans();
  } catch (error) {
    console.error("Failed to fetch custom plans:", error);
  }
});

// Buy Custom Plan
const buyCustomPlan = async (plan) => {
  try {
    await carStore.buyCustomPlan(plan);
    alert(`Successfully purchased plan: ${plan.name}`);
  } catch (error) {
    console.error("Failed to buy custom plan:", error);
    alert("Failed to purchase plan. Please try again.");
  }
};

const clearResponseMessage = () => {
  setTimeout(() => {
    responseMessage.value = "";
  }, 10000);
};
</script>

<template>
  <div>
    <!-- Custom Plans Section -->
    <div class="flex flex-wrap gap-4">
      <div
        v-for="(plan, index) in customPlans"
        :key="index"
        class="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
      >
        <div class="flex">
          <div
            class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"
              />
            </svg>
          </div>
          <div class="ms-3 text-sm font-normal">
            <h2 class="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
              {{ plan.name }}
            </h2>
            <div class="mb-2 text-lg font-normal">
              - {{ plan.discount_percentage }}%
            </div>
            <button
              @click.prevent="buyCustomPlan(plan)"
              class="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
            >
              Buy
            </button>
            
          </div>
        </div>
      </div>
    </div>

    <!-- Subscription Details Section -->
    <div class="flex flex-wrap gap-4 mt-6">
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ subscription.name || "No Active Subscription" }}
        </h5>
        <p v-if="subscription.status" class="mb-1 font-normal text-gray-700 dark:text-gray-400">
          Status: {{ subscription.status }}
        </p>
        <p v-if="subscription.ends_at" class="mb-1 font-normal text-gray-700 dark:text-gray-400">
          Ends at: {{ subscription.ends_at }}
        </p>
        <p v-if="subscription.price" class="mb-1 font-normal text-gray-700 dark:text-gray-400">
          Price: £{{ subscription.price }}
        </p>
        <div v-if="responseMessage" class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {{ responseMessage }}
        </div>

        <button
          v-if="subscription?.name"
          @click="confirmCancellation"
          class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-orange-700 rounded-lg hover:bg-custom-green focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          {{ cancelBtn }}
          <svg
            class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="isModalVisible"
      class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
    >
      <div class="bg-white rounded-lg p-6 w-1/3">
        <h3 class="text-lg font-semibold mb-4">{{ modalTitle }}</h3>
        <p class="mb-6">{{ modalMessage }}</p>
        <div class="flex justify-end space-x-4">
          <button
            @click="cancelModal"
            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            @click="confirmModal"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
    <!-- Modal end -->
  </div>
</template>

<style scoped>
.bg-custom-green:hover {
  background-color: #03fc9d !important;
}
</style>
