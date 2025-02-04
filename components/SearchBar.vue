<script setup>
import { useCarRegistrationSearchStore } from "@/stores/carRegistrationSearch";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
const router = useRouter();
const carRegistrationSearch = useCarRegistrationSearchStore();

const props = defineProps({
  height: {
    type: String,
    default: "h-16"
  },
  width: {
    type: String,
    default: "w-2/3"
  },
  inputHeight: {
    type: String,
    default: "h-[0.25rem]"
  },
  inputWidth: {
    type: String,
    default: "w-full"
  },
  buttonClass: {
    type: String,
    default: "h-9 w-[2.85rem]"
  }
});

definePageMeta({
  title: "SearchBar",
  meta: [
    {
      hid: "Search Car Registration number",
      name: "Search Car Registration number",
      content: "Search Car Registration number",
    },
  ],
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
const validReportTypes = ["basic", "export", "single-offer"];

const processedCarNumber = computed({
  get() {
    return vehicle_number.value.replace(/[^a-zA-Z0-9 ]/g, "").toUpperCase();
  },
  set(value) {
    vehicle_number.value = value.replace(/[^a-zA-Z0-9 ]/g, "").toUpperCase();
  },
});

onMounted(() => {
  if (typeof window !== "undefined") {
    const regNumber = localStorage.getItem("reg_number");
    if (regNumber) {
      vehicle_number.value = regNumber;
    } else {
      vehicle_number.value = "";
    }
  }
});

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
    if (
      processedCarNumber.value.length < MIN_LENGTH ||
      processedCarNumber.value.length > MAX_LENGTH
    ) {
      errors.value.push(`Vehicle number is not valid.`);
      searchTxt.value = null;
      errorMessage.value = "";
      return;
    }
    await carRegistrationSearch.searchCarRegNumber(processedCarNumber.value);
    searchTxt.value = null;
    router.push(`/report`);
  } catch (error) {
    if (!error?.data?.success) {
      // let sub = subscription.value;
      // if(hasSubscription.active==true){
      // }
    }

    searchTxt.value = null;
    if (error?.data?.message) {
      errorMessage.value = error.data.message;
    } else {
      errors.value = error.response?.data?.errors || [
        "Something went wrong while checking car number. Please verify Registration Number.",
      ];
    }

    setTimeout(() => {
      errorMessage.value = "";
      errors.value = [];
    }, 5000);
  }
};
</script>

<template>
  <div>
    <div class="relative bg-[#FFA500] py-1 pl-2 pr-1 rounded flex flex-row items-center space-x-1"
      :class="[props.width]">
      <div class="flex items-center justify-center mr-[0.27rem]">
        <img src="assets/svg/uk-flag.svg" class="w-8" alt="UK Flag" />
      </div>
      <input @keyup.enter="searchForCarReg" type="text" :placeholder="placeholderText" v-model="processedCarNumber"
        required
        class="block placeholder-opacity-low custom-spacing py-4 text-2xl px-5 text-white bg-[#FFA500] rounded hover:bg-white md:hover:bg-transparent md:hover:text-white md:dark:hover:text-white"
        :class="[props.inputHeight, props.inputWidth]" />

      <button @click="searchForCarReg"
        class="bg-[#0F1829] py-1 px-2 rounded hover:bg-white md:hover:bg-transparent md:dark:hover:bg-transparent"
        :class="[props.buttonClass]">
        <span class="text-white" v-if="searchTxt">{{ searchTxt }}</span>
        <img src="assets/svg/search-icon.svg" v-else class="w-full" alt="Search car registration" />
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
