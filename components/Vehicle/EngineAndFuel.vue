<script setup>
</script>

<template>
  <div class="flex flex-row justify-left px-20 py-10">
    <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
      <h5 class="mb-3 text-base font-semibold text-green-900 md:text-xl dark:text-white">
        Engine & fuel consumption
      </h5>
      <div class="flex">
        <div class="w-2/5 p-2">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
              <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Make</td>
                  <td class="px-6 py-3">FORD</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Model</td>
                  <td class="px-6 py-3">FIESTA EDGE 82</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Colour</td>
                  <td class="px-6 py-3">BLUE</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Year of manufacture</td>
                  <td class="px-6 py-3">2010</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Top speed</td>
                  <td class="px-6 py-3">104 mph</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">0 to 60 MPH</td>
                  <td class="px-6 py-3">13.3 seconds</td>
                </tr>
                <tr class="bg-white dark:bg-gray-800 dark:border-gray-700">
                  <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Gearbox</td>
                  <td class="px-6 py-3">MANUAL 5 GEARS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="w-3/5 p-2">
          <div class="chart-container">
            <div class="chart-segment segment-a">
              <span class="range">0 - 100</span> <span class="label">A</span>
            </div>
            <div class="chart-segment segment-b">
              <span class="range">101 - 120</span> <span class="label">B/C</span>
            </div>
            <div class="chart-segment segment-c">
              <span class="range">121 - 140</span> <span class="label">D/E</span>
            </div>
            <div class="chart-segment segment-d">
              <span class="range">141 - 165</span> <span class="label">F/G</span>
            </div>
            <div class="chart-segment segment-e">
              <span class="range">166 - 185</span> <span class="label">H/I</span>
            </div>
            <div class="chart-segment segment-f arrow">
              <span class="range">186 - 225</span> <span class="label">J/K</span>
            </div>
            <div class="chart-segment segment-g">
              <span class="range">225+</span> <span class="label">L/M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.chart-segment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 10px;
  margin: 5px 0;
  font-weight: bold;
  border-radius: 5px;
  position: relative;
}

.segment-a {
  background-color: #2a7f00;
}

.segment-b {
  background-color: #44b200;
}

.segment-c {
  background-color: #76e400;
}

.segment-d {
  background-color: #c8e200;
}

.segment-e {
  background-color: #f8c200;
}

.segment-f {
  background-color: #f89400;
}

.segment-g {
  background-color: #e75400;
}

.label {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 5px 10px;
  border-radius: 3px;
}

.range {
  margin-right: auto;
}

.arrow::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -10px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent transparent #000;
  transform: translateX(100%) rotate(90deg);
}
</style>
