<script setup>
import { reactive } from "vue";
const router = useRouter();

const auth = useAuthStore();
const carRegistrationSearch = useCarRegistrationSearchStore();

definePageMeta({
  title: 'SearchBar',
  meta: [
    {
      hid: 'Search Car Registration number', name: 'Search Car Registration number', content: 'Search Car Registration number'
    }

  ]
  // middleware: ['guest'],
});
// const vehicle_number = ref("xxxx xxx");
const vehicle_number = ref("");
const placeholderText = ref("xxxx xxx");


const errors = ref([]);
const errorMessage = ref("");
const searchTxt = ref(null);
const MIN_LENGTH = 5;
const MAX_LENGTH = 10;
const validReportTypes = ['basic', 'export', 'single-offer'];


const processedCarNumber = computed({
  get() {
    return vehicle_number.value.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase();
  },
  set(value) {
    vehicle_number.value = value.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase();
  }
});

onMounted(() => {
  if (typeof window !== 'undefined') {
    const regNumber = localStorage.getItem('reg_number');
    if (regNumber) {
      vehicle_number.value = regNumber;
    } else {
      vehicle_number.value = "";
    }
  }
})

watch(errors, () => {
  setTimeout(() => {
    errors.value = [];
  }, 5000);
});

const searchForCarReg = async () => {
  errorMessage.value = "";
  searchTxt.value = "Processing...";
  try {
    errors.value = [];
    if (processedCarNumber.value.length < MIN_LENGTH || processedCarNumber.value.length > MAX_LENGTH) {
      errors.value.push(`Vehicle number is not valid.`);
      searchTxt.value = null;
      errorMessage.value="";
      return;
    }
    await carRegistrationSearch.searchCarRegNumber(processedCarNumber.value);
    searchTxt.value = null;
    router.push(`/report`);
  } catch (error) {
    searchTxt.value = null;
    console.log("search error: ", error);

    if(error?.data?.message){
      errorMessage.value = error.data.message;
    }
    else{
      errors.value = error.response?.data?.errors || ["Something went wrong while checking car number. Please verify Registration Number."];
    }

    setTimeout(() => {
      errorMessage.value="";
      errors.value=[];
    }, 5000);
  }
}
</script>

<template>
  <div>
    <div class="relative bg-[#FFA500] p-1 rounded flex flex-row items-center lg:w-full w-2/3">
      <img src="assets/svg/uk-flag.svg" class="h-6 w-6 mr-1" alt="UK Flag">
      <input @keyup.enter="searchForCarReg" type="text" :placeholder="placeholderText" v-model="processedCarNumber"
        required
        class="block w-full placeholder-opacity-low custom-spacing py-1 text-2xl px-5 text-white bg-[#FFA500] rounded hover:bg-white md:hover:bg-transparent md:hover:text-white md:dark:hover:text-white">

      <button @click="searchForCarReg"
        class="bg-[#0F1829] py-1 px-2 rounded ml-1 hover:bg-white md:hover:bg-transparent md:dark:hover:bg-transparent">

        <span class="text-white" v-if="searchTxt">{{ searchTxt }}</span>
        <img src="assets/svg/search-icon.svg" v-else class="h-6 w-6" alt="Search car registration">
      </button>

    </div>
    <div v-if="errors && errors.length && Array.isArray(errors)" class="alert alert-danger">
      <ul v-if="Array.isArray(errors)">
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
    <div class="alert alert-danger" v-if="errorMessage">
      <p>{{ errorMessage }}</p>
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