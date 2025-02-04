<script setup>
import { width } from '@fortawesome/free-solid-svg-icons/fa0';



const props = defineProps({
    class: {
        type: String,
        default: 'w-8'
    },
})
</script>

<template>
    <NuxtLink to="/">
        <img src="/svg/logo.svg" :class="props.class" alt="Car check logo" />
    </NuxtLink>
</template>