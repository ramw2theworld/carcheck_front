<script lang="ts" setup>
import TopNav from '../components/Includes/TopNav.vue';
import AdminSideNav from '../components/Includes/AdminSideNav.vue'
// import FooterAdmin from '../components/Includes/FooterAdmin.vue';
// import BrandCrumbAdmin from '../components/Includes/BrandCrumbAdmin.vue';
definePageMeta({
    layout: 'admin'
})
</script>

<style scoped>
/* Only CSS code here */
</style>

<template>
    <div class="admin-layout">
        <div>
            <TopNav />
            <AdminSideNav />
        </div>
        
        <div class="p-4 sm:ml-64">
            <div class="p-4 rounded-lg dark:border-gray-700 mt-14">
                <NuxtPage />
            </div>
        </div>
    </div>

</template>