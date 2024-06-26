<script setup>
import { reactive } from "vue";

const auth = useAuthStore();
const carRegistrationSearch = useCarRegistrationSearchStore();

definePageMeta({
  // middleware: ['guest'],
});

const vehicle_number = ref('EJ59YOA');
const errors = ref([]);
const MIN_LENGTH = 5;
const MAX_LENGTH = 10;

const processedCarNumber = computed({
  get() {
    return vehicle_number.value.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase();
  },
  set(value) {
    vehicle_number.value = value.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase();
  }
});

watch(errors, () => {
  setTimeout(() => {
    errors.value = [];
  }, 5000);
});

const searchForCarReg = async () => {
  try {
    errors.value = [];
    if (processedCarNumber.value.length < MIN_LENGTH || processedCarNumber.value.length > MAX_LENGTH) {
      errors.value.push(`Vehicle number is not valid.`);
      return;
    }

    await carRegistrationSearch.searchCarRegNumber(processedCarNumber.value);
    console.log("hello there after backend!: ", carRegistrationSearch.basicCarDetails.vehicleImageUrl);
    
  } catch (error) {
    console.log("search error: ", error);
    errors.value = error.response?.data?.errors || ["An error occurred"];
  }
}
</script>

<template>
  <div>

  
  <div class="relative bg-[#FFA500] p-1 rounded flex flex-row items-center lg:w-full w-2/3">
    <img src="assets/svg/uk-flag.svg" class="h-6 w-6 mr-1" alt="UK Flag">
    <input @keyup.enter="searchForCarReg" type="text" placeholder="ENTER REG" v-model="processedCarNumber"
      class="block w-full placeholder-opacity-low custom-spacing py-1 text-2xl px-5 text-white bg-[#FFA500] rounded hover:bg-white md:hover:bg-transparent md:hover:text-white md:dark:hover:text-white">

    <button @click="searchForCarReg"
      class="bg-[#0F1829] py-1 px-2 rounded ml-1 hover:bg-white md:hover:bg-transparent md:dark:hover:bg-transparent">

      <img src="assets/svg/search-icon.svg" class="h-6 w-6" alt="Search">
    </button>
    

  </div>
  <div v-if="errors.length" class="alert alert-danger">
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
</div>
</template>

<style scoped>
.custom-spacing {
  letter-spacing: 0.1em;
}

.custom-spacing::placeholder {
  letter-spacing: 0.1em;
}

.placeholder-opacity-low::placeholder {
  opacity: 0.5;
}
.alert {
  color: red;
  padding: 3px;
  justify-content: center;
}
</style>