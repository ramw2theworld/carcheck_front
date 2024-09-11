<template>
  <div>
    <canvas ref="chartref" id="gaugeChart" width="400" height="400"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, DoughnutController, registerables } from 'chart.js';
import 'chartjs-gauge'; // Ensure that chartjs-gauge is imported

// Register Chart.js components explicitly
Chart.register(ArcElement, DoughnutController, Tooltip, Legend, CategoryScale, ...registerables);
const chartref = ref<HTMLCanvasElement | null>(null);
onMounted(() => {
  const chartRefValue = chartref.value;
  if (chartRefValue) {
    const ctx = chartRefValue.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'gauge',  // The chart type, extended by the chartjs-gauge plugin
        data: {
          datasets: [{
            data: [50],   // This sets the needle value
            // value: 50,    // Initial value for the needle
            // minValue: 0,  // Minimum value of the gauge
            // backgroundColor: ['#ff0000', '#ffff00', '#00ff00'], // Gauge section colors
            // borderWidth: 2, // Border width of the gauge sections
          }],
        },
        options: {
          needle: {
            radiusPercentage: 2,
            widthPercentage: 3.2,
            lengthPercentage: 80,
            color: 'rgba(0, 0, 0, 1)',  // Color of the needle
          },
          valueLabel: {
            display: true,
            formatter: (value: number) => Math.round(value),  // Display formatted value
            fontSize: 20,
            color: '#000',
          },
          circumference: 180,  // A half-circle (180 degrees)
          rotation: -90,       // Start from -90 degrees
          plugins: {
            legend: {
              display: false,  // Hide the legend
            },
          },
        },
      });
    } else {
      console.error('Gauge chart canvas element not found.');
    }
  } else {
    console.error('chartref.value is null.');
  }
});
</script>

<style scoped>
/* Optional: Customize the chart container or other elements */
</style>
