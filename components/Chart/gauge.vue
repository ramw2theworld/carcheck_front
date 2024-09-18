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
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true, // Use dots instead of squares for legend items
            pointStyle: 'circle',
            generateLabels() {
              return [
                {
                  text: `Fail rate (${failRate.value})`,
                  fillStyle: '#F94144',
                },
                {
                  text: `Pass rate (${passRate.value})`,
                  fillStyle: '#F2A03D',
                },
              ];
            },
          },
        },
        tooltip: {
          enabled: false, // Disable tooltips
        },
      },
      hover: {
        mode: null,
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

          drawSegmentPercentage(ctx, centerX, centerY, chartRadius);

        },
      },
      events: [],
    };

    new Chart(chartCanvas.value, {
      type: 'doughnut',
      data: data,
      options: options,
    });
  }
});

function drawSegmentPercentage(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, chartRadius: number) {
  ctx.font = 'bold 14px Arial'; // Set larger font for visibility
  ctx.fillStyle = '#fff'; // Set text color to black for visibility
  ctx.textAlign = 'center'; // Center align the text

  // Calculate positions for pass and fail percentages
  const passX = centerX - (chartRadius / 2 * 3.25); // Adjust X position for pass percentage
  const passY = centerY - (chartRadius / 4); // Adjust Y position for pass percentage
  ctx.fillText(`${passRate.value}%`, passX, passY);

  const failX = centerX + (chartRadius / 2 * 3.25); // Adjust X position for fail percentage
  const failY = centerY - (chartRadius / 4); // Adjust Y position for fail percentage
  ctx.fillText(`${failRate.value}%`, failX, failY);
}

// function drawSegmentPercentage(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, chartRadius: number) {
//   // Get the screen width
//   const screenWidth = window.innerWidth;

//   // Adjust font size dynamically based on the screen width
//   let fontSize = screenWidth / 50; // Adjust font size based on the screen width
//   if (fontSize < 12) fontSize = 12; // Minimum font size for small screens
//   if (fontSize > 24) fontSize = 14; // Maximum font size for large screens

//   ctx.font = `bold ${fontSize}px Arial`;
//   ctx.fillStyle = '#fff'; // Set text color to white for visibility
//   ctx.textAlign = 'center'; // Center align the text

//   // Dynamically calculate the horizontal (X) offset based on the screen size
//   const dynamicOffset = screenWidth / 9; // Dynamic offset for positioning the text

//   // Calculate positions for pass and fail percentages with dynamic X adjustment
//   const passX = centerX - dynamicOffset; // Dynamically adjust X position for pass percentage
//   const passY = centerY - (chartRadius / 4); // Adjust Y position for pass percentage
//   ctx.fillText(`${passRate.value}%`, passX, passY);

//   const failX = centerX + dynamicOffset; // Dynamically adjust X position for fail percentage
//   const failY = centerY - (chartRadius / 4); // Adjust Y position for fail percentage
//   ctx.fillText(`${failRate.value}%`, failX, failY);
// }

</script>

<style scoped></style>
