<script setup>
import { ref, reactive, onMounted } from 'vue';
import featureData from '@/features.json';
import { usePlanStore } from '@/stores/plan';
import { useRouter } from 'vue-router';

const router = useRouter();
const planStore = usePlanStore();

const basic_features = reactive(featureData.features.basic_features);
const standard_features = reactive(featureData.features.standerd_features);
const premium_features = reactive(featureData.features.premium_features);
const showLoader = ref(false);

const isMonthlyActive = ref(true);
const selectedPlan = ref("48h-export-subscription");
const plans = ref([]);

const toggleBilling = (type) => {
    isMonthlyActive.value = (type === 'monthly');
};

const startChecking = (plan) => {
    planStore.setSelectedPlan(plan);
    router.push("/payment/checkout");
};

const selectPlan = (plan) => {
    selectedPlan.value = plan.plan_code;
};

const getFeatureIcon = (iconName) => {
    return `/assets/svg/${iconName}`;
};

onMounted(async () => {
    showLoader.value = true;
    console.log("plans: ", planStore.fetchPlans());
    await planStore.fetchPlans();  
    plans.value = planStore.plans.map((item) => ({
        ...item,
        price: (parseFloat(item.amount_premium) / 100).toFixed(2)
    }));
    showLoader.value = false;
});
</script>


<template>
    <div class="bg-[#D9D9D9] py-20">
        <UtilitiesLoadingSpinner v-if="showLoader"/>
        <div class="flex flex-row items-center justify-between md:px-40 px-10" v-else>
            <div>
                <h3 class="text-2xl text-gray-800 w-52 text-start">We have the best</h3>
                <h3 class="text-2xl font-bold text-gray-800 w-52 text-start">Plans around</h3>
            </div>
            <div class="border-2 rounded p-0.5 border-[#0F1829]">
                <button :class="{ 'bg-[#0F1829] text-white': isMonthlyActive, 'text-[#0F1829]': !isMonthlyActive }"
                    class="px-4 py-2 rounded" @click="toggleBilling('monthly')">Monthly billing</button>
                <button :class="{ 'bg-[#0F1829] text-white': !isMonthlyActive, 'text-[#0F1829]': isMonthlyActive }"
                    class="px-4 py-2" @click="toggleBilling('yearly')">Yearly billing</button>
            </div>
        </div>

        <div class="flex md:flex-row flex-col items-center justify-center mt-10 gap-4 md:gap-8 px-32">
            <div v-for="plan in plans" :key="plan.plan_code" @click="selectPlan(plan)" :class="{
                    'bg-[#0F1829] text-white': selectedPlan === plan.plan_code,
                    'border-2 border-[#0F1829] text-[#0F1829]': selectedPlan !== plan.plan_code
                }" class="rounded-xl px-8 py-6 cursor-pointer transition duration-300 ease-in-out">
                <div class="flex flex-row items-center justify-between">
                    <h1 class="text-lg font-bold px-2">{{ plan.name }}</h1>
                    <span class="text-[#0F1829] text-xs rounded bg-[#FF7400] px-2 py-0.5"
                        v-if="plan.plan_code === '48h-export-subscription'">Most Popular</span>
                </div>

                <div class="flex flex-row items-center justify-start mt-6">
                    <h3 class="text-4xl">£{{ plan.plan_code==="single-offer"?plan.amount_premium:plan.amount_trial }}</h3>
                    <div class="flex flex-col items-center justify-center ml-4">
                        <span class="text-sm font-thin -ml-2">Per User</span>
                        <span class="text-sm font-thin">Per Month</span>
                    </div>
                </div>
                <h1 class="text-sm font-thin mt-8">Generate up to <span class="font-bold">{{ plan.reports_count }}
                        reports</span></h1>
                <button @click.stop="startChecking(plan)"
                    class="bg-[#ffac1c] text-lg text-white px-4 py-2 rounded mt-2 block w-64">Start Checking</button>
                <button class="text-lg px-4 py-2 rounded dark:bg-gray-800 dark:text-gray-400 mt-2 border border-gray-200 
                block w-64 focus:outline-none">Read More</button>
                <h2 class="text-xl mt-8">Included</h2>
                <p class="text-sm font-thin">What’s included with our plan</p>

                <!-- basic feature -->
                <div class="flex flex-col items-start justify-start mt-2 gap-2" v-if="plan.plan_code == '48h-basic-subscription'">
                    <div v-for="b_feature in basic_features" :key="b_feature.id"
                        class="flex flex-row items-center justify-start">
                        <img :src="getFeatureIcon(b_feature.icon)" :alt="b_feature.title" class="w-6 orange-filter" />
                        <h3 :class="{
                    'text-white': selectedPlan === plan.plan_code,
                    'text-[#0F1829]': selectedPlan !== plan.plan_code
                }" class="text-[#0F1829] text-sm ml-2">{{ b_feature.title }}</h3>
                    </div>
                </div>

                <!-- standard plan  -->
                <div class="flex flex-col items-start justify-start mt-2 gap-2" v-if="plan.plan_code == '48h-export-subscription'">
                    <div v-for="b_feature in standard_features" :key="b_feature.id"
                        class="flex flex-row items-center justify-start">
                        <img :src="getFeatureIcon(b_feature.icon)" :alt="b_feature.title" class="w-6 orange-filter" />
                        <h3 :class="{
                    'text-white': selectedPlan === plan.plan_code,
                    'text-[#0F1829]': selectedPlan !== plan.plan_code
                }" class="text-[#0F1829] text-sm ml-2">{{ b_feature.title }}</h3>
                    </div>
                </div>

                <!-- premium plan  -->
                <div class="flex flex-col items-start justify-start mt-2 gap-2" v-if="plan.plan_code == 'single-offer'">
                    <div v-for="b_feature in premium_features" :key="b_feature.id"
                        class="flex flex-row items-center justify-start">
                        <img :src="getFeatureIcon(b_feature.icon)" :alt="b_feature.title" class="w-6 orange-filter" />
                        <h3 :class="{
                    'text-white': selectedPlan === plan.plan_code,
                    'text-[#0F1829]': selectedPlan !== plan.plan_code
                }" class="text-[#0F1829] text-sm ml-2">{{ b_feature.title }}</h3>
                    </div>
                </div>

            </div>
        </div>
        <img src="~/assets/svg/plan-end-track.svg" alt="Plan End Track" class="w-full mt-20" />
    </div>
</template>

<style scoped>
.orange-filter {
    filter: brightness(0) saturate(100%) invert(69%) sepia(85%) saturate(3478%) hue-rotate(1deg) brightness(103%) contrast(101%);
}
</style>


<!-- <script setup>
import { ref } from 'vue';
import featureData from '../../features.json';
const basic_features = reactive(featureData.features.basic_features);
const standerd_features = reactive(featureData.features.standerd_features);
const premium_features = reactive(featureData.features.premium_features);

const isMonthlyActive = ref(true);
const selectedPlan = ref("standard");

const toggleBilling = (type) => {
    isMonthlyActive.value = (type === 'monthly');
};

const startChecking = () => {
    navigateTo("/payment/checkout")
}

const selectPlan = (plan) => {
    selectedPlan.value = plan;
}

const planPrices = ref({
    basic_plan: 5,
    standerd_plan: 15,
    premium_plan: 25,

});

const plans = ref(
    {
        name: 'Basic Plan',
        code: 'basic_plan',
        price: 5,
        reports: 10
    },
)
</script>

<template>
    <div class="bg-[#D9D9D9] py-20">
        <div class="flex flex-row items-center justify-between md:px-40 px-10">
            <div>
                <h3 class="text-2xl text-gray-800 w-52 text-start">We have the best</h3>
                <h3 class="text-2xl font-bold text-gray-800 w-52 text-start">Plans aro<span
                        class="border-t-orange-500 border-t-4">un</span>d</h3>
            </div>
            <div class="border-2 rounded p-0.5 border-[#0F1829]">
                <button :class="{ 'bg-[#0F1829] text-white': isMonthlyActive, 'text-[#0F1829]': !isMonthlyActive }"
                    class="px-4 py-2 rounded" @click="toggleBilling('monthly')">
                    Monthly billing
                </button>
                <button :class="{ 'bg-[#0F1829] text-white': !isMonthlyActive, 'text-[#0F1829]': isMonthlyActive }"
                    class="px-4 py-2" @click="toggleBilling('yearly')">
                    Yearly billing
                </button>
            </div>
        </div>

        <div class="flex md:flex-row flex-col items-center justify-center mt-10 gap-4 md:gap-8 px-32">

            <div @click="selectPlan('basic')" :class="{
                    'bg-[#0F1829] text-white': selectedPlan === 'basic',
                    'border-2 border-[#0F1829] text-[#0F1829]': selectedPlan !== 'basic'
                }" class="rounded-xl px-8 py-6 cursor-pointer transition duration-300 ease-in-out">
                <h1 class="text-lg font-bold text-[#0F1829] px-2">Basic Plan</h1>
                <div class="flex flex-row items-center justify-start mt-6">
                    <div class="flex flex-row items-start justify-center">
                        <h3 class="text-4xl text-[#0F1829]">${{ planPrices.basic_plan }}</h3>
                    </div>
                    <div class="flex flex-col items-center justify-center ml-4">
                        <span class="text-sm text-[#0F1829] font-thin -ml-2">Per User</span>
                        <span class="text-sm text-[#0F1829] font-thin">Per Month</span>
                    </div>
                </div>
                <h1 class="text-sm font-thin text-[#0F1829] mt-8">Generate up to <span class="font-bold"> 10
                        reports</span></h1>
                <button @click="startChecking"
                    class="bg-[#0F1829] text-lg text-white px-4 py-2 rounded mt-2 block w-64">Start Checking</button>
                <button class="text-[#0F1829] text-lg px-4 py-2 rounded mt-2 border border-[#0F1829] block w-64">Read
                    More</button>
                <h2 class="text-[#0F1829] text-xl mt-8">Included</h2>
                <p class="text-[#0F1829] text-sm font-thin">What’s included with our plan</p>
                <div class="flex flex-col items-start justify-start mt-2 gap-2">
                    <div class="flex flex-row items-center justify-start">
                        <img src="~/assets/svg/damage-check-icon.svg" alt="Check Mark" class="w-6" />
                        <h3 class="text-[#0F1829] text-sm ml-2">Damage Check</h3>
                    </div>
                    <div class="flex flex-row items-center justify-start">
                        <img src="~/assets/svg/history-owner.svg" alt="Check Mark" class="w-6" />
                        <h3 class="text-[#0F1829] text-sm ml-2">Owner History</h3>
                    </div>
                    <div class="flex flex-row items-center justify-start">
                        <img src="~/assets/svg/check-mileage.svg" alt="Check Mark" class="w-6" />
                        <h3 class="text-[#0F1829] text-sm ml-2">Mileage History</h3>
                    </div>
                    <div class="flex flex-row items-center justify-start">
                        <img src="~/assets/svg/check-stolen.svg" alt="Check Mark" class="w-6" />
                        <h3 class="text-[#0F1829] text-sm ml-2">Stolen Check</h3>
                    </div>
                    <div class="flex flex-row items-center justify-start">
                        <img src="~/assets/svg/check-Mot.svg" alt="Check Mark" class="w-6" />
                        <h3 class="text-[#0F1829] text-sm ml-2">Mot Check</h3>
                    </div>
                </div>
            </div>

            <div @click="selectPlan('standard')" :class="{
                    'bg-[#0F1829] text-white': selectedPlan === 'standard',
                    'border-2 border-[#0F1829]': selectedPlan !== 'standard',
                    'text-[#0F1829]': selectedPlan !== 'standard'
                }" class="rounded-xl px-8 py-6 cursor-pointer transition duration-300 ease-in-out">
                <div class="flex flex-row items-center justify-between">
                    <h1 class="text-lg font-bold text-[#ffffff] px-2">Standard Plan</h1>
                    <span class="text-[#0F1829] text-xs rounded bg-[#FF7400] px-2 py-0.5">Most Popular</span>
                </div>
                <div class="flex flex-row items-center justify-start mt-6">
                    <div class="flex flex-row items-start justify-center">
                        <h3 class="text-4xl text-[#ffffff]">${{ planPrices.standerd_plan }}</h3>
                    </div>
                    <div class="flex flex-col items-center justify-center ml-2">
                        <span class="text-xs text-[#ffffff] font-thin -ml-2">Per User</span>
                        <span class="text-xs text-[#ffffff] font-thin">Per Month</span>
                    </div>
                </div>
                <h1 class="text-sm font-thin text-[#ffffff] mt-8">Generate up to <span class="font-bold"> 10
                        reports</span></h1>
                <button @click="startChecking"
                    class="bg-[#FF7400] text-lg text-white px-4 py-2 rounded mt-2 block w-64">Start Checking</button>
                <button class="text-[#ffffff] text-lg px-4 py-2 rounded mt-2 border border-[#ffffff] block w-64">Read
                    More</button>
                <h2 class="text-[#ffffff] text-xl mt-8">Included</h2>
                <p class="text-[#ffffff] text-sm font-thin">What’s included with our plan</p>
                <div class="flex flex-col items-start justify-start mt-4 gap-2">
                    <div class="flex flex-row items-center justify-start">
                        <img src="~/assets/svg/damage-check-icon.svg" alt="Check Mark" class="w-6" />
                        <h3 class="text-[#ffffff] text-sm ml-2">Damage Check</h3>
                    </div>
                    <div class="flex flex-row items-center justify-start">
                        <img src="~/assets/svg/history-owner.svg" alt="Check Mark" class="w-6" />
                        <h3 class="text-[#ffffff] text-sm ml-2">Owner History</h3>
                    </div>
                    <div class="flex flex-row items-center justify-start">
                        <img src="~/assets/svg/check-mileage.svg" alt="Check Mark" class="w-6" />
                        <h3 class="text-[#ffffff] text-sm ml-2">Mileage History</h3>
                    </div>
                    <div class="flex flex-row items-center justify-start">
                        <img src="~/assets/svg/check-stolen.svg" alt="Check Mark" class="w-6" />
                        <h3 class="text-[#ffffff] text-sm ml-2">Stolen Check</h3>
                    </div>
                    <div class="flex flex-row items-center justify-start">
                        <img src="~/assets/svg/check-Mot.svg" alt="Check Mark" class="w-6" />
                        <h3 class="text-[#ffffff] text-sm ml-2">Mot Check</h3>
                    </div>
                </div>
            </div>

            <div @click="selectPlan('premium')" :class="{
                    'bg-[#0F1829] text-white': selectedPlan === 'premium',
                    'border-2 border-[#0F1829]': selectedPlan !== 'premium',
                    'text-[#d8dce3]': selectedPlan !== 'premium'
                }" class="rounded-xl px-8 py-6 cursor-pointer transition duration-300 ease-in-out">

                <h1 class="text-lg font-bold text-[#0F1829] px-2">Premium Plan</h1>
                <div class="flex flex-row items-center justify-start mt-6">
                    <div class="flex flex-row items-start justify-center">
                        <h3 class="text-4xl text-[#0F1829]">${{ planPrices.premium_plan }}</h3>
                    </div>
                    <div class="flex flex-col items-center justify-center ml-4">
                        <span class="text-sm text-[#0F1829] font-thin -ml-2">Per User</span>
                        <span class="text-sm text-[#0F1829] font-thin">Per Month</span>
                    </div>
                </div>
                <h1 class="text-sm font-thin text-[#0F1829] mt-8">Generate up to <span class="font-bold"> 10
                        reports</span></h1>
                <button @click="startChecking"
                    class="bg-[#0F1829] text-lg text-white px-4 py-2 rounded mt-2 block w-64">Start Checking</button>
                <button class="text-[#0F1829] text-lg px-4 py-2 rounded mt-2 border border-[#0F1829] block w-64">Read
                    More</button>
                <h2 class="text-[#0F1829] text-xl mt-8">Included</h2>
                <p class="text-[#0F1829] text-sm font-thin">What’s included with our plan</p>
                <div class="flex flex-col items-start justify-start mt-2 gap-2">
                    <div class="flex flex-row items-center justify-start">
                        <img src="~/assets/svg/damage-check-icon.svg" alt="Check Mark" class="w-6" />
                        <h3 class="text-[#0F1829] text-sm ml-2">Damage Check</h3>
                    </div>
                    <div class="flex flex-row items-center justify-start">
                        <img src="~/assets/svg/history-owner.svg" alt="Check Mark" class="w-6" />
                        <h3 class="text-[#0F1829] text-sm ml-2">Owner History</h3>
                    </div>
                    <div class="flex flex-row items-center justify-start">
                        <img src="~/assets/svg/check-mileage.svg" alt="Check Mark" class="w-6" />
                        <h3 class="text-[#0F1829] text-sm ml-2">Mileage History</h3>
                    </div>
                    <div class="flex flex-row items-center justify-start">
                        <img src="~/assets/svg/check-stolen.svg" alt="Check Mark" class="w-6" />
                        <h3 class="text-[#0F1829] text-sm ml-2">Stolen Check</h3>
                    </div>
                    <div class="flex flex-row items-center justify-start">
                        <img src="~/assets/svg/check-Mot.svg" alt="Check Mark" class="w-6" />
                        <h3 class="text-[#0F1829] text-sm ml-2">Mot Check</h3>
                    </div>
                </div>
            </div>
        </div>
        <img src="~/assets/svg/plan-end-track.svg" alt="Plan End Track" class="w-full mt-20" />
    </div>
</template> -->