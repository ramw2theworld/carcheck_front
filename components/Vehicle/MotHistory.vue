<script setup>
import Cookie from 'js-cookie';

import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
const data = ref([
    { id: 1, first_name: "Jeanette", last_name: "Penddreth", gender: "Female", phone: 7878787878 },
    { id: 2, first_name: "Giavani", last_name: "Frediani", gender: "Male", phone: 8878787878 },
    { id: 3, first_name: "Noell", last_name: "Bea", gender: "Female", phone: 9878787878 },
    { id: 4, first_name: "Willard", last_name: "Valek", gender: "Male", phone: 6878787878 }
]);

const showArrow = ref(false);

const expandedRow = ref(null);
const handleExpandRow = (index) => {
    expandedRow.value = expandedRow.value === index ? null : index;
    showArrow.value = !showArrow.value;
};

console.log("cookie: ", Cookie.get('MOThistory'))
</script>

<template>
    <div class="flex flex-row justify-left px-20 py-10">
        <div
            class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <h5 class="mb-3 text-base font-semibold text-green-900 md:text-xl dark:text-white">
                MOT History
            </h5>
            <div class="flex">
                <div class="w-full p-2">
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead
                                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        S.No.</th>
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Test Date</th>
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Result</th>
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Odometer Reading(mi)</th>
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Mileage Since Last Pass</th>
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Days Since Last Test</th>
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Major Failures</th>
                                    <th scope="row"
                                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Advisories</th>
                                </tr>
                            </thead>
                            <tbody v-for="(item, index) in data" :key="index">
                                <tr @click="handleExpandRow(index)"
                                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td colspan="8" class="px-6 py-4">MOT #{{ index + 1 }}
                                        <span v-if="expandedRow === index" class="px-2">
                                            <FontAwesomeIcon :icon="faArrowDown" />
                                        </span>
                                        <span class="px-2" v-else>
                                            <FontAwesomeIcon :icon="faArrowUp" />
                                        </span>
                                    </td>

                                </tr>
                                <tr v-if="expandedRow === index">
                                    <td colSpan="8"
                                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 py-4">
                                        <ul class="px-4">
                                            <li>
                                                The Phone Number of {{ item.first_name }} is {{ item.phone }}
                                            </li>
                                        </ul>
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
/* table {
    width: 100%;
    border: 1px solid black;
  } */
/* tr {
    cursor: pointer;
    border: 1px solid black;
  } */
li {
    list-style: none;
    font-size: 14px;
    color: gray;
}

/* th {
    border: 1px solid black;
    background: rgb(255, 185, 185);
  } */

.MOTHeads {}
</style>