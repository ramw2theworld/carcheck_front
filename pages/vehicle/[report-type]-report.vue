<script setup>
const tokenStore = useTokenStore();
const subscriptionStore = useSubscriptionStore();

const downloadReport = () =>{
    if(tokenStore.getToken && tokenStore.getStatus){
        if(subscriptionStore.getCurrentSubscription){
            console.log("hello there for the stests sldfjlsdjflkflsjdfl");
        }
        navigateTo('/payment/checkout');
    }else{
        navigateTo('/auth/login');
    }
}
</script>

<template>
    <div>
        <div class="flex flex-row justify-center gap-28 py-10 border-2">
            <div class="flex flex-col justify-center items-center">
                <SearchBar />
                <p class="mt-6 text-xs"><span class="font-bold">Report Date</span> 27-06-2024</p>
                <p class="font-bold my-5 text-lg">BMW Model 2016</p>
                <img src="~/assets/png/car-icon.png" class="w-26" />
            </div>
            <div>
                <div class="flex flex-col justify-center items-center">
                    <h1 class="text-2xl font-bold">YOUR <span class="text-orange-500">CAR REPORT</span> IS READY!</h1>
                     <button @click.prevent="downloadReport" class="rounded bg-orange-500 text-white text-lg px-20 py-2 mt-6">Download Report</button>
                </div>
                <Features></Features>
            </div>

        </div>
        <!-- general information -->
        <VehicleGeneralInformation />

        <!-- Engine and fule information -->
        <VehicleEngineAndFuel />

        <!-- Damage History -->
        <VehicleDamageHistory />

        <!-- Damage History -->
        <VehiclePlateChanged />

        <!-- Vehicle valuation -->
        <VehicleValuation />

        <!-- Vehicle valuation -->
        <VehicleRiskAssessments />

        <!-- Owner History -->
        <VehicleOwnerHistory />

        <!-- Registrations -->
        <VehicleRegistrations />

        <!-- Vehicle Tax History -->
        <VehicleTaxCalculation />

        <!-- Vehicle Tax History -->
        <VehicleFinanceCheck />

        <!-- Vehicle Tax History -->
        <VehicleWriteOff />

        <!-- Vehicle Tax History -->
        <VehicleMotHistory />
    </div>
</template>