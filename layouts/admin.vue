<template>
    <div class="admin-layout">
        <TopNav />
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <SideNav />
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <div class="container-fluid px-4">
                        <BrandCrumbAdmin />
                        <slot />
                    </div>
                </main>
                <FooterAdmin />
            </div>
        </div>
    </div>

</template>

<script setup>
    import TopNav from '../components/Includes/TopNav.vue';
    import SideNav from '../components/Includes/SideNav.vue';
    import FooterAdmin from '../components/Includes/FooterAdmin.vue';
    import BrandCrumbAdmin from '../components/Includes/BrandCrumbAdmin.vue';
    
</script>

<style scoped>
  /* Only CSS code here */
</style>