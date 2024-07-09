<template>
    <div class="payment-form">
      <StripeCard />
    </div>
  </template>
  
  <script setup>
import StripeCard from '~/components/Payment/Stripe.vue';
import { ref } from 'vue';
import { useStripe } from '@/composables/useStripe';

const { processPayment } = useStripe();
const isProcessing = ref(false);
const errorMessage = ref('');

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
  