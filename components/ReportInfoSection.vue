<template>
  <div class="flex flex-col items-center justify-center w-full bg-[#EEEEEE] report-bg-section relative">
    <img src="/svg/report-car.svg" alt="Report Info" class="md:block hidden translate-y-[5.6rem] absolute" />
    <div class="container mx-auto px-4 py-12">
      <div class="flex flex-col items-center justify-center text-4xl pb-24 pt-10">
        <h2 class="text-gray-800">What’s included</h2>
        <p class="text-gray-800 mt-2"><span class="border-b-orange-500 border-b-4">in</span> <span
            class="font-bold">your report</span></p>
      </div>
      <div class="">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div class="flex flex-col items-center justify-between lg:-mr-36 md:-20">
            <div class="flex flex-row items-center justify-center">
              <h3 class="text-lg font-bold text-gray-800 w-52 text-end">Outstanding Finances</h3>
              <img src="/svg/outstanding-finances.svg" alt="Line" class="w-24" />
            </div>
            <div class="flex flex-row items-center justify-center">
              <h3 class="text-lg font-bold text-gray-800 w-52 text-end">Tax record</h3>
              <img src="/svg/tax-record-icon.svg" alt="Line" class="w-24" />
            </div>
            <div class="flex flex-row items-center justify-center">
              <h3 class="text-lg font-bold text-gray-800 w-52 text-end">Engine & consumption</h3>
              <img src="/svg/consumption.svg" alt="Line" class="w-24" />
            </div>
            <div class="flex flex-row items-center justify-center">
              <h3 class="text-lg font-bold text-gray-800 w-52 text-end ">Co2 Emissions</h3>
              <img src="/svg/emission.svg" alt="Line" class="w-24" />
              <img src="/svg/line-info-1.svg" alt="Line" class="w-32 absolute md:-mr-96 md:-mt-5 md:block hidden" />
            </div>
            <div class="flex flex-row items-center justify-center">
              <h3 class="text-lg font-bold text-gray-800 w-52 text-end">Insurance Status</h3>
              <img src="/svg/ni-status.svg" alt="Line" class="w-24" />
              <img src="/svg/line-info-2.svg" alt="Line" class="md:w-32 absolute md:-mr-96 md:-mt-16 md:block hidden" />
            </div>
            <div class="flex flex-row items-center justify-center">
              <h3 class="text-lg font-bold text-gray-800 w-52 text-end">Ownership list</h3>
              <img src="/svg/owner-list.svg" alt="Line" class="w-24" />
              <img src="/svg/line-info-3.svg" alt="Line" class="w-32 absolute md:-mr-96 md:block hidden" />
            </div>
          </div>
          <div class="hidden md:block">
          </div>
          <div class="flex flex-col items-center justify-between">
            <div class="flex flex-row items-center justify-center">
              <img src="/svg/import-export.svg" alt="Line" class="w-24" />
              <h3 class="text-lg font-bold text-gray-800 w-52 text-start">Import/Export History</h3>

            </div>
            <div class="flex flex-row items-center justify-center">
              <img src="/svg/line-info-5.svg" alt="Line" class="w-32 absolute -ml-96 md:-mt-16 md:block hidden" />
              <img src="/svg/technical-data.svg" alt="Line" class="w-24" />
              <h3 class="text-lg font-bold text-gray-800 w-52 text-start">Technical Data</h3>
            </div>
            <div class="flex flex-row items-center justify-center">
              <img src="/svg/line-info-6.svg" alt="Line" class="w-32 absolute -ml-96 md:-mt-16 md:block hidden" />
              <img src="/svg/mileage-history-1.svg" alt="Line" class="w-24" />
              <h3 class="text-lg font-bold text-gray-800 w-52 text-start">Mileage History</h3>
            </div>
            <div class="flex flex-row items-center justify-center">
              <img src="/svg/Mot-history.svg" alt="Line" class="w-24" />
              <h3 class="text-lg font-bold text-gray-800 w-52 text-start ">MOT History</h3>
            </div>
            <div class="flex flex-row items-center justify-center">
              <img src="/svg/damage-history-1.svg" alt="Line" class="w-24" />
              <h3 class="text-lg font-bold text-gray-800 w-52 text-start">Damage History</h3>
            </div>
            <div class="flex flex-row items-center justify-center">
              <img src="/svg/theft-check-1.svg" alt="Line" class="w-24" />
              <h3 class="text-lg font-bold text-gray-800 w-52 text-start">Theft Check</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

</script>
<style scoped>
.report-bg-section {
  background-image: url("/assets/svg/report-info-bg.svg");
  background-size: cover;
  /* Zoom in */
  background-repeat: no-repeat;
  background-position: center;
}
</style>