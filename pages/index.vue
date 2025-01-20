<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const redirectMessage = ref(route.query.message || '');

// Clear the redirectMessage after 3 seconds if it exists
if (redirectMessage.value) {
  setTimeout(() => {
    redirectMessage.value = "";
  }, 3000);
}

definePageMeta({
  title: 'Welcome to Car check',
  meta: [
    {
      hid: 'Car report generated.', name: 'Download all data of the car', content: 'Download all data of the car'
    }

  ],
});

</script>

<template>
  <div>
    <!-- Show the alert if there's a redirect message -->
    <div v-if="redirectMessage" class="alert alert-danger">
      {{ redirectMessage }}
    </div>

    <!-- Rest of your home page sections -->
    <SearchCarSection />
    <TrustedBy />
    <EasyStepsSection />
    <WhyNeedCarCheck />
    <ReportInfoSection />
    <PlanSection />
  </div>
</template>

<style scoped>
/* Your CSS styles here */
.section-1-bg {
  background-color: #f5f5f5;
}

/* Alert styling */
.alert {
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  border-radius: 0.25rem;
}
</style>
