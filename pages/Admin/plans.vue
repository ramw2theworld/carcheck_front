<script setup>
import DashboardPlans from '../../components/Includes/DashboardPlans.vue';
definePageMeta({
  layout: 'admin',
  title: 'Reports',
  meta: [
    { hid: 'User dashboard to fetch all cars searched', name: 'User dashboard to fetch all cars searched', content: 'User dashboard to fetch all cars searched' }
  ],
  middleware: ['auth'],
});
</script>
<template>
    <div>
        <DashboardPlans />
    </div>
</template>