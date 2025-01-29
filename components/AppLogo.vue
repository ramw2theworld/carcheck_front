<script setup>

const props = defineProps({
    class: {
        type: String,
        default: 'h-8'
    },
})
</script>

<template>
    <NuxtLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="/svg/logo.svg" :class="props.class" alt="Car check logo" />
    </NuxtLink>
</template>