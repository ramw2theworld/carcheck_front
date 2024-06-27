<script setup>
const counter = useCounterStore()
const auth = useAuthStore()
</script>

<template>
  <div>
    <SearchCarSection></SearchCarSection>
    <TrustedBy></TrustedBy>
    <EasyStepsSection></EasyStepsSection>
    <WhyNeedCarCheck></WhyNeedCarCheck>
    <ReportInfoSection></ReportInfoSection>
    <PlanSection></PlanSection>
  </div>
</template>


<style scoped>
/* Your CSS styles here */
.section-1-bg {
  background-color: #f5f5f5;
}
</style>