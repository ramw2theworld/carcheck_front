<script setup lang="ts">
const props = defineProps<{
  contain: string;
}>();
</script>
<template>
    <span v-if="contain === 'zero'">00</span>
    <span v-else>XXXXX</span>
</template>