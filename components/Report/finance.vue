<script lang="ts" setup>
const isTableVisible = ref(true)
const toggleTableVisibility = () => {
  isTableVisible.value = !isTableVisible.value
}
</script>


<template>
  <report-wrapper class="h-[35.7rem] py-8 bg-red-500">
    <div @click="toggleTableVisibility" class="cursor-pointer text-black flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_230_6081)">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M13.1011 0.832886C20.3434 0.832886 26.2022 6.69432 26.2022 13.9164C26.2022 21.1386 20.3434 27 13.1011 27C5.85881 27 0 21.1386 0 13.9164C0 6.69432 5.86929 0.832886 13.1011 0.832886Z"
              fill="#0F1829" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M13.1016 2.4552C19.4425 2.4552 24.5781 7.58396 24.5781 13.9164C24.5781 20.2488 19.4425 25.3776 13.1016 25.3776C6.76063 25.3776 1.625 20.2488 1.625 13.9164C1.625 7.58396 6.76063 2.4552 13.1016 2.4552Z"
              fill="#EEEEEE" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M12.7028 6.64206C8.67809 6.87233 5.59672 10.3055 5.82729 14.3247C5.9321 16.3239 6.85442 18.1033 8.2379 19.3383L6.96971 20.7618H6.98019C5.2194 19.2023 4.06651 16.9624 3.91978 14.4294C3.64727 9.36344 7.5252 5.03016 12.5979 4.74756L12.7028 6.64206Z"
              fill="#0F1829" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M13.6146 4.74756C18.6873 5.03016 22.5652 9.36344 22.2823 14.4294C22.146 16.9624 20.9826 19.2023 19.2218 20.7618H19.2323L17.9641 19.3488C19.3581 18.1033 20.2699 16.3344 20.3852 14.3247C20.6053 10.3055 17.5344 6.87233 13.5098 6.64206L13.6146 4.74756Z"
              fill="#0F1829" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M22.7751 8.84009L15.994 12.0115L9.21289 15.1935L9.50635 15.7482L9.79982 16.3134L16.2875 12.5768L22.7751 8.84009Z"
              fill="#0F1829" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M13.1007 12.0428C14.1383 12.0428 14.9872 12.8802 14.9872 13.9164C14.9872 14.9526 14.1383 15.79 13.1007 15.79C12.0631 15.79 11.2246 14.9526 11.2246 13.9164C11.2246 12.8802 12.0631 12.0428 13.1007 12.0428Z"
              fill="#0F1829" />
          </g>
          <defs>
            <clipPath id="clip0_230_6081">
              <rect width="26.2022" height="26.1671" fill="white" transform="translate(0 0.832886)" />
            </clipPath>
          </defs>
        </svg>

        <p class="text-2xl font-bold flex items-center justify-center">
          FINANCE
        </p>
        <span>
          <svg v-if="isTableVisible" width="12" height="7" viewBox="0 0 12 7" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 6L11 1" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <svg v-else width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 6L6 1" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 1L11 6" stroke="#292929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

        </span>
      </div>

      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="8" fill="#BDBDBD" />
        <rect x="6.66602" y="6.22229" width="2.66666" height="7.1111" rx="1.33333" fill="white" />
        <rect x="6.66602" y="2.66663" width="2.66667" height="2.66667" rx="1.33333" fill="white" />
      </svg>
    </div>
    <div v-show="isTableVisible">
      <table class="w-full text-black mt-6">
        <thead>
          <tr class="header-row">
            <th colspan="2">
              <div class="flex items-center justify-between w-full">
                <p>FINANCE CHECK</p>
                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="23" rx="3" fill="#0F1829" />
                  <path
                    d="M21.1943 11.3634C20.5114 9.87013 17.8337 5.00073 12.0007 5.00073C6.16768 5.00073 3.48993 9.87013 2.80708 11.3634C2.71542 11.5635 2.66797 11.781 2.66797 12.0011C2.66797 12.2212 2.71542 12.4388 2.80708 12.6389C3.48993 14.1306 6.16768 19 12.0007 19C17.8337 19 20.5114 14.1306 21.1943 12.6373C21.2858 12.4374 21.3331 12.2202 21.3331 12.0003C21.3331 11.7805 21.2858 11.5633 21.1943 11.3634V11.3634ZM12.0007 17.4445C7.09551 17.4445 4.80664 13.2712 4.22334 12.0089C4.80664 10.7295 7.09551 6.5562 12.0007 6.5562C16.8942 6.5562 19.1839 10.7116 19.778 12.0003C19.1839 13.2891 16.8942 17.4445 12.0007 17.4445Z"
                    fill="white" />
                  <path
                    d="M12 8.11194C11.2309 8.11194 10.4791 8.34001 9.83957 8.7673C9.20008 9.19459 8.70166 9.80192 8.40734 10.5125C8.11301 11.223 8.036 12.0049 8.18605 12.7593C8.3361 13.5136 8.70646 14.2065 9.2503 14.7503C9.79414 15.2942 10.487 15.6645 11.2414 15.8146C11.9957 15.9646 12.7776 15.8876 13.4881 15.5933C14.1987 15.299 14.806 14.8005 15.2333 14.161C15.6606 13.5216 15.8887 12.7697 15.8887 12.0006C15.8874 10.9697 15.4774 9.98127 14.7484 9.25227C14.0193 8.52327 13.031 8.11317 12 8.11194V8.11194ZM12 14.3338C11.5385 14.3338 11.0874 14.197 10.7037 13.9406C10.3201 13.6842 10.021 13.3198 9.8444 12.8935C9.66781 12.4672 9.6216 11.998 9.71163 11.5454C9.80166 11.0928 10.0239 10.6771 10.3502 10.3508C10.6765 10.0245 11.0922 9.80227 11.5448 9.71224C11.9974 9.62221 12.4665 9.66842 12.8929 9.84501C13.3192 10.0216 13.6836 10.3207 13.94 10.7044C14.1964 11.088 14.3332 11.5391 14.3332 12.0006C14.3332 12.6194 14.0874 13.2129 13.6498 13.6504C13.2123 14.088 12.6188 14.3338 12 14.3338Z"
                    fill="white" />
                </svg>

              </div>

            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Agreement Date</th>
            <td>White</td>
          </tr>
          <tr>
            <th>Agreement Type</th>
            <td>Type</td>
          </tr>
          <tr>
            <th>Term (months)</th>
            <td>Honda</td>
          </tr>
          <tr>
            <th>Agreement Number</th>
            <td>White</td>
          </tr>
          <tr>
            <th>Finance Company</th>
            <td>Type</td>
          </tr>
          <tr>
            <th>Contact Number</th>
            <td>Honda</td>
          </tr>
          <tr>
            <th>Vehicle Description</th>
            <td>Honda</td>
          </tr>
        </tbody>
      </table>
      <div class="bg-[#EF343A] w-full flex items-center justify-center py-2">
        <h3 class="text-2xl font-semibold">Lorem ipsum dolor sit amet. <a href="#" class="underline">check the full
            report</a></h3>
      </div>
    </div>
  </report-wrapper>
</template>

<style scoped>
table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  text-align: left;
  font-size: 20.5px;
  width: 50%;
}

th {
  font-weight: bold;
  padding: 0.25rem 1.5rem;
}

td {
  padding: 0.68rem 1.5rem;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

.header-row th {
  text-transform: uppercase;
}
</style>