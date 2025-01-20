<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@unhead/vue';

const route = useRoute();
const pageTitle = computed(() => route.meta?.title || 'Car Check');

// Fallback title in case `meta` is undefined
useHead({
  title: pageTitle,
});

</script>

<template>
  <div>
    <Header />
    <main>
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
/* Styles here */
</style>
