<script setup>
</script>

<template>
    <div class="flex flex-row justify-left px-20 py-10">
        <div
            class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <h5 class="mb-3 text-base font-semibold text-green-900 md:text-xl dark:text-white">
                Risk Assessments
            </h5>
            <div class="flex">
                <div class="w-full p-2">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead
                                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Attribute
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Value
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Write-Off Record Count
                                    </th>
                                    <td class="px-6 py-4">
                                        0
                                    </td>
                                </tr>
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Stolen Record Count
                                    </th>
                                    <td class="px-6 py-4">
                                        0
                                    </td>
                                </tr>
                                <tr class="bg-white dark:bg-gray-800">
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        High Risk Record Count
                                    </th>
                                   
                                    <td class="px-6 py-4">
                                        0
                                    </td>
                                </tr>
                                <tr class="bg-white dark:bg-gray-800">
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Finance Record Count
                                    </th>
                                   
                                    <td class="px-6 py-4">
                                        0
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
