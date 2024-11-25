<script setup >
definePageMeta({
  layout: 'admin',
  title: 'Hello',
  meta: [
    { hid: 'User dashboard to fetch all cars searched', name: 'User dashboard to fetch all cars searched', content: 'User dashboard to fetch all cars searched' }

  ],
  middleware: ['auth'],
});
</script>

<template>
  <div>
    <h1>Hello </h1>
  </div>
</template>