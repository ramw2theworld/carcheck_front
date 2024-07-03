<script setup>
</script>

<template>
  <div class="tax-calculation-container flex flex-col justify-left p-10 bg-blue-600 text-white">
    <div class="text-content mb-6">
      <h2 class="text-2xl font-bold text-white mb-2">Tax calculation</h2>
      <p class="text-lg text-gray-200">
        See the tax details for this vehicle in the premium report.
      </p>
    </div>
    <div class="flex">
      <div class="w-full p-2">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full table-auto text-sm text-left text-gray-500 bg-blue-600 text-white">
            <tbody>
              <tr class="bg-blue-500 border-b border-gray-300">
                <td class="px-6 py-3 font-medium text-white">Vehicle class</td>
                <td class="px-6 py-3">49</td>
              </tr>
              <tr class="bg-blue-500 border-b border-gray-300">
                <td class="px-6 py-3 font-medium text-white">Band</td>
                <td class="px-6 py-3">C</td>
              </tr>
              <tr class="bg-blue-500 border-b border-gray-300">
                <td class="px-6 py-3 font-medium text-white">Single payment (12 months)</td>
                <td class="px-6 py-3">XXXXXXXXXX</td>
              </tr>
              <tr class="bg-blue-500 border-b border-gray-300">
                <td class="px-6 py-3 font-medium text-white">Single six month payment</td>
                <td class="px-6 py-3">XXXXXXXXXX</td>
              </tr>
              <tr class="bg-blue-500">
                <td class="px-6 py-3 font-medium text-white">Total payable by 12 monthly instalments</td>
                <td class="px-6 py-3">XXXXXXXXXX</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="w-2/5 p-2 flex justify-center items-center">
        <img src="~/assets/images/tax-book.webp" alt="Register Image" class="register-image">

      </div>
    </div>
  </div>
</template>

<style scoped>
.tax-calculation-container {
  font-family: Arial, sans-serif;
  background-color: #003366;
  padding: 80px;
  border-radius: 8px;
  max-width: auto;
  margin: 0 auto;
}

.text-content {
  margin-bottom: 20px;
}

.table-auto {
  width: 100%;
  border-collapse: collapse;
}

td, th {
  padding: 12px;
  text-align: left;
}

tr:nth-child(even) {
  background-color: #0055a5;
}

tr:hover {
  background-color: #004080;
}

.register-image {
  width: 100%;
  max-width: 300px;
  height: auto;
}
</style>
