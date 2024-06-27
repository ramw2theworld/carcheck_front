<script setup>
</script>

<template>
  <div class="flex flex-row justify-left px-20 py-10">
    <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
      <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
        Damage history
      </h5>
      <p>
        Check the damage history for this MERCEDES-BENZ. See if, where and when this MERCEDES-BENZ had damage and the car repair costs. We also check if this MERCEDES-BENZ was scrapped.
        Download the premium report here for the results.
      </p>
      <div class="flex">
        <div class="w-2/5 p-2">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
            <div class="ms-3 text-sm font-medium text-gray-800 dark:text-gray-300">
               <h4 class="damage-title">Damage 1</h4>
            </div>

            <table class="w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Date</td>
                  <td class="px-6 py-3">2022-02-01</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Category</td>
                  <td class="px-6 py-3">Front Rearer cam</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Type</td>
                  <td class="px-6 py-3">Simple</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
            <div class="ms-3 text-sm font-medium text-gray-800 dark:text-gray-300">
                <h4 class="damage-title">Damage 2</h4>

            </div>
            <table class="w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Date</td>
                  <td class="px-6 py-3">2022-02-01</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Category</td>
                  <td class="px-6 py-3">Front Rearer cam</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Type</td>
                  <td class="px-6 py-3">Simple</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
        <div class="w-3/5 p-2">
          <img src="~/assets/png/car-find-section-bg-1.jpeg" alt="Damage 1" class="damage-image">
          <img src="~/assets/png/car-find-section-bg-1.jpeg" alt="Damage 2" class="damage-image">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.damage-history-container {
  padding: 20px;
  background-color: #f9f9f9;
  font-family: Arial, sans-serif;
}

.section-title {
  font-size: 24px;
  color: #1a202c;
}

.description {
  margin-bottom: 20px;
  color: #4a5568;
}

.damage-report {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.damage-item {
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 300px;
  padding: 20px;
}

.damage-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: #2d3748;
}

.damage-table {
  width: 100%;
  margin-bottom: 20px;
}

.damage-table .label {
  font-weight: bold;
  color: #2d3748;
}

.damage-table .value {
  color: #4a5568;
}

.damage-image {
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
}

.damage-title {
    font-family: Yantramanav, sans-serif;
    color: #22AFB4;
    font-weight: bold;
}
</style>
