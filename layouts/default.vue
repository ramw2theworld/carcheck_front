<template>
    <div>
      <div class="section-1-bg">
        <Header></Header>
      <SearchCarSection></SearchCarSection>
      </div>
        <TrustedBy></TrustedBy>
        <EasyStepsSection></EasyStepsSection>
        <WhyNeedCarCheck></WhyNeedCarCheck>
        <ReportInfoSection></ReportInfoSection>
        <PlanSection></PlanSection>

        <Footer></Footer>
    </div>
</template>
<script setup>
import EasyStepsSection from "~/components/EasyStepsSection.vue";
import ReportInfoSection from "~/components/ReportInfoSection.vue";
</script>
<style scoped>
.section-1-bg {
  background-image: url("assets/png/car-find-section-bg-1.jpeg");
  background-size: cover;

}
</style>
```