<script setup>
    const moreFeatures = ([
        {
            title: "feature first",
            icon: "elegant-male-taxi-driver.svg"
        },
        {
            title: "feature second",
            icon: "car-history.svg"
        },
        {
            title: "feature third",
            icon: "man-car-feature.svg"
        },
        
    ])
</script>
<template>
    <div class="flex">
        <div class="flex-2 flex-col items-center justify-center px-20 py-10">
            <div
                class="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div class="p-4 bg-gray-200 dark:bg-gray-700">
                    <h1 class="text-green-900 dark:text-white font-semibold text-xl">Total: £1.95</h1>
                </div>
                <div class="p-4 bg-gray-200 dark:bg-gray-700 rounded-b-lg">
                    <div class="flex flex-wrap justify-between items-center">
                        <div class="flex items-center">
                            <img src="https://checkmycar.io/image/38.svg" alt="" class="mr-2">
                            <h1 class="text-black dark:text-white">Secure Payment</h1>
                        </div>
                        <div>
                            <img src="https://checkmycar.io/image/39.svg" alt="" class="w-12">
                            <img src="https://checkmycar.io/image/40.svg" alt="" class="w-12">
                        </div>
                    </div>
                    <form id="payment-form" method="get" action="/process" class="space-y-4 mt-4">
                        <input type="email" name="email" required id="CardEmail"
                            placeholder="Enter email to receive your report"
                            class="form-input px-4 py-3 w-full rounded-md border-gray-300 shadow-sm">
                        <input type="text" name="paymentFullName" required id="CardName"
                            placeholder="Enter name on card"
                            class="form-input px-4 py-3 w-full rounded-md border-gray-300 shadow-sm">
                        <div class="flex justify-between space-x-4">
                            <input type="text" name="cardNumber" required id="cardNumber"
                                placeholder="1234 1234 1234 1234"
                                class="form-input px-4 py-3 w-1/2 rounded-md border-gray-300 shadow-sm">
                            <input type="text" name="postCode" required id="postCode" placeholder="Post Code"
                                class="form-input px-4 py-3 w-1/2 rounded-md border-gray-300 shadow-sm">
                        </div>
                        <div class="flex justify-between space-x-4">
                            <input type="text" name="cardExpiry" required id="card-expiry" placeholder="MM/YY"
                                class="form-input px-4 py-3 w-1/2 rounded-md border-gray-300 shadow-sm">
                            <input type="text" name="cardCVV" required id="card-cvv" placeholder="000"
                                class="form-input px-4 py-3 w-1/2 rounded-md border-gray-300 shadow-sm">
                        </div>
                        <button type="submit"
                            class="btn btn-payment w-full text-white bg-green-600 hover:bg-green-700 font-bold uppercase py-3 px-4 rounded-md shadow-lg">Get
                            My Report</button>
                    </form>
                </div>
            </div>
        </div>

        <div class="flex-2 flex-col items-center justify-center px-20 py-10">
            <div
                class="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div class="p-4 bg-gray-200 dark:bg-gray-700">
                    <h1 class="text-green-900 dark:text-white font-semibold text-xl">Total: £1.95</h1>
                </div>
            </div>
            <div class="p-4 ">
                <Features :moreFeatures="moreFeatures"></Features>

            </div>
        </div>
    </div>

   

</template>

<style scoped></style>