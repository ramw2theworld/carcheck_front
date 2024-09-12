<template>
  <div :class="props.class">
    <canvas ref="chartCanvas" :height="height" :width="width"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { Chart, ArcElement, DoughnutController, Tooltip, Legend } from 'chart.js';

// Register Chart.js elements
Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

// Props definition
const props = defineProps<{
  failRate: number | string; // Fail rate percentage
  class?: string; // Tailwind classes for styling
  height?: string | number; // Canvas height
  width?: string | number; // Canvas width
}>();

// Computed properties to determine canvas size
const height = computed(() => convertToNumber(props.height, 150));
const width = computed(() => convertToNumber(props.width, 150));
const failRate = computed(() => convertToNumber(props.failRate, 0));
const passRate = computed(() => 100 - failRate.value);

function convertToNumber(value: any, defaultValue: number) {
  if (typeof value === 'string' && value.includes('%')) {
    return value;
  }
  return typeof value === 'string' ? parseFloat(value) : value || defaultValue;
}

// Reference to canvas element
const chartCanvas = ref<HTMLCanvasElement | null>(null);

// Function to create gauge chart
onMounted(() => {
  if (chartCanvas.value) {
    const totalRate = passRate.value + failRate.value; // The sum of passRate and failRate

    const data = {
      datasets: [
        {
          data: [passRate.value, failRate.value, 100 - totalRate], // Data for the gauge
          backgroundColor: ['#F2A03D', '#F94144', '#E5E7EB'], // Colors for pass, fail, and empty space
          borderWidth: 0, // No border
          circumference: 180, // Half circle
          rotation: -90, // Rotate to start at the top
        },
      ],
    };

    const options = {
      responsive: true,
      cutout: '70%', // Makes it look like a gauge
      plugins: {
        legend: {
          display: false, // Hide legend
        },
        tooltip: {
          enabled: false, // Disable tooltips
        },
      },
      animation: {
        onComplete() {
          const chartInstance = Chart.getChart(chartCanvas.value!);

          if (!chartInstance) return;

          const ctx = chartInstance.ctx;
          const centerX = (chartInstance.chartArea.left + chartInstance.chartArea.right) / 2;
          const centerY = chartInstance.chartArea.bottom - 100; // Adjusted position for needle pivot
          const chartRadius = chartInstance.innerRadius || 100; // Fallback for innerRadius

          // Corrected: Needle should point at the midpoint between passRate and failRate (relative to 180° half-circle)
          const midpointRate = (passRate.value + 0.5) / 100; // Add 0.5 to place needle between passRate and failRate
          const needleAngle = (-Math.PI / 2) + (Math.PI * midpointRate); // Proportionally calculate angle for the half-circle


          const needleLength = chartRadius + 25; // Needle length relative to radius

          // Needle endpoint coordinates
          const needleX = centerX + needleLength * Math.cos(needleAngle - Math.PI / 2);
          const needleY = centerY + needleLength * Math.sin(needleAngle - Math.PI / 2);

          // Clear previous drawings
          ctx.clearRect(0, 0, chartInstance.width, chartInstance.height);

          // Redraw the gauge chart
          chartInstance.draw();

          // Draw the needle
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(centerX, centerY); // Start from the center bottom
          ctx.lineTo(needleX, needleY); // Draw to the needle's end point
          ctx.lineWidth = 4; // Adjusted needle thickness
          ctx.lineCap = 'round'; // Rounded needle tip
          ctx.lineDashOffset = 1; // No dash offset
          ctx.strokeStyle = '#000'; // Needle color
          ctx.stroke();
          ctx.restore();  // Draw the needle

          // Draw the needle
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(centerX, centerY + 8); // Start from the center bottom
          ctx.lineTo(needleX, needleY); // Draw to the needle's end point
          ctx.lineWidth = 4; // Adjusted needle thickness
          ctx.lineCap = 'round'; // Rounded needle tip
          ctx.lineDashOffset = 1; // No dash offset
          ctx.strokeStyle = '#000'; // Needle color
          ctx.stroke();
          ctx.restore();  // Draw the needle

          // Draw the needle
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(centerX, centerY - 8); // Start from the center bottom
          ctx.lineTo(needleX, needleY); // Draw to the needle's end point
          ctx.lineWidth = 4; // Adjusted needle thickness
          ctx.lineCap = 'round'; // Rounded needle tip
          ctx.lineDashOffset = 1; // No dash offset
          ctx.strokeStyle = '#000'; // Needle color
          ctx.stroke();
          ctx.restore();  // Draw the needle



          // Draw the needle's pivot point (center circle)
          ctx.beginPath();
          ctx.arc(centerX, centerY, 10, 0, Math.PI * 2); // Circle at the bottom
          ctx.fillStyle = '#000'; // Circle color
          ctx.fill();


          // drawPercentage(ctx, centerX, centerY, chartRadius, passRate.value, failRate.value);

        },
      },
    };

    new Chart(chartCanvas.value, {
      type: 'doughnut',
      data: data,
      options: options,
    });
  }
});

// function drawPercentage(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, chartRadius: number, passRate: number, failRate: number) {
//   // Font settings for text
//   ctx.font = 'bold 20px Arial';
//   ctx.fillStyle = '#fff';
//   ctx.textAlign = 'center';

//   // Calculate angles for pass and fail segments
//   const passAngle = (Math.PI / 2) + (Math.PI * (passRate / 100));
//   const failAngle = (Math.PI / 2) + (Math.PI * (failRate / 100));

//   // Pass rate position (center of pass segment)
//   const passX = (-Math.PI / 2) + (Math.PI * passAngle) * 13; // Adjusted position for pass rate
//   const passY = (-Math.PI / 2) + (Math.PI * passAngle) * 13;

//   ctx.fillText(`${passRate}%`, passX, passY);

//   // Fail rate position (center of fail segment)
//   const failX = centerX + (chartRadius - 60) * Math.cos(Math.PI / 2 + (Math.PI * (failAngle))); // Adjusted for fail rate
//   const failY = centerY + (chartRadius - 60) * Math.sin(Math.PI / 2 + (Math.PI * (failAngle)));
//   ctx.fillText(`${failRate}%`, failX, failY);
// }
</script>

<style scoped>
/* Add custom styles if needed */
</style>
