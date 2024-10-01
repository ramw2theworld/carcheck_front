<script setup>
import { ref } from 'vue';
import { useStripe } from '@/composables/useStripe';
import Stripe from '~/components/Payment/Stripe.vue';

import { useSubscriptionStore } from '@/stores/subscription';
const subscriptionStore = useSubscriptionStore();
const hasSubscription = computed(()=> subscriptionStore.hasSubscription);

const { processPayment } = useStripe();
const isProcessing = ref(false);
const errorMessage = ref('');

onMounted(() => {
  if (hasSubscription.value?.active) {
    navigateTo('/');
  }
});

const handlePayment = async () => {
  isProcessing.value = true;
  errorMessage.value = '';
  try {
    const result = await processPayment();
    if (!result.success) {
      errorMessage.value = result.message || 'Payment failed';
    } else {
      alert('Payment successful!');
      // Navigate or update UI accordingly
    }
  } catch (error) {
    errorMessage.value = error.message || 'An unexpected error occurred';
  } finally {
    isProcessing.value = false;
  }
};
</script>

<template>
  <div class="payment-form">
    <Stripe />
  </div>
</template>