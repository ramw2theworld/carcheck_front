<script setup lang="ts">
type DisplayType = '0' | 'X';

const props = defineProps<{
  contain: string;
  count: number,
  type: DisplayType
}>();
</script>

<template>
  <span class="blur-text">{{ contain === 'zero' ? '00' : 'XXXXX' }}</span>
</template>

<style scoped>
.blur-text {
  filter: blur(5px);
}
</style>