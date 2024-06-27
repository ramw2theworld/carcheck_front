<script setup>
</script>

<template>
  <div class="plate-changes-container flex flex-col justify-left p-10 bg-blue-600 text-white">
    <div class="flex flex-col md:flex-row items-start md:items-center justify-between">
      <div class="md:w-2/5 w-full p-2 mb-4 md:mb-0">
        <img src="~/assets/png/car-icon.png" alt="Plate Image" class="plate-image">
      </div>
      <div class="md:w-3/5 w-full p-2">
        <h5 class="text-xl font-semibold mb-4">Plate changes</h5>
        <p class="mb-4">
          See in this check if this MERCEDES-BENZ had different number plates.
        </p>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full table-auto text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Current VRM</td>
                <td class="px-6 py-3">WA66SUH</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Transfer type</td>
                <td class="px-6 py-3">XXXX</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Date of receipt</td>
                <td class="px-6 py-3">XXXX</td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Previous VRM</td>
                <td class="px-6 py-3">XXXX</td>
              </tr>
              <tr class="bg-white dark:bg-gray-800 dark:border-gray-700">
                <td class="px-6 py-3 font-medium text-gray-900 dark:text-white">Date of transaction</td>
                <td class="px-6 py-3">XXXX</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button class="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Download
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.plate-changes-container {
  font-family: Arial, sans-serif;
}

.plate-image {
  width: 100%;
  height: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td, th {
  padding: 12px;
  text-align: left;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

button {
  display: inline-block;
  margin-top: 20px;
  text-align: center;
}
</style>
