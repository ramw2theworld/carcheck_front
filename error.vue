<template>
    <Header></Header>
    <div class="flex flex-row items-center justify-between bg-[#EEEEEE] text-gray-800 gap-4">
        <div class="flex flex-col items-start justify-between ml-20">
            <img src="assets/svg/404.svg" alt="404" class="w-40" />
            <h2 class="text-orange-500 text-4xl font-bold">Sorry,</h2>
            <h2 class="text-4xl font-bold">We can’t check that !</h2>
            <p class="text-lg font-thin">Something appears to be broken.</p>
            <p class="text-gray-300 text-lg font-normal">Please go back or try refreshing this page</p>
        </div>
        <img src="assets/webp/Calque-404.webp" alt="Error" class="max-w-[500px] md:block hidden" />
    </div>
    <Footer></Footer>
</template>

<script setup>

</script>

<style scoped>
h1 {
    font-size: 6rem;
}
</style>