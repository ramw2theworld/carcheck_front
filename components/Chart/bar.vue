<template>
  <canvas :class="props.class" ref="chartCanvas" :height="height" :width="width"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Props definition
const props = defineProps<{
  data: { label: string; value: number }[];
  class?: string;
  height?: {
    type: number | string;
    default: 25;
  };
  width?: {
    type: number | string;
    default: '100%';
  };
  hasSubscription: boolean;
}>();

// Computed properties for labels and values
const labels = computed(() => props.data.map((item) => item.label));
const values = computed(() => props.data.map((item) => item.value));
const height = computed(() => convertToNumber(props.height));
const width = computed(() => convertToNumber(props.width));

// Function to convert string to number
function convertToNumber(value: any) {
  if (typeof value === 'string' && value.includes('%')) {
    return value;
  }
  return typeof value === 'string' ? parseFloat(value) : value;
}

// Register Chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const chartCanvas = ref<HTMLCanvasElement | null>(null);

// Function to create and configure the chart
onMounted(() => {
  if (chartCanvas.value) {
    new Chart(chartCanvas.value, {
      type: 'bar',
      data: {
        labels: labels.value,
        datasets: [
          {
            label: 'Dataset 1',
            data: values.value,
            backgroundColor: '#F94144',
            borderWidth: 1,
            barThickness: 20,
            maxBarThickness: 50,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              display: true,
              callback: function (value) {
                if (!props.hasSubscription) {
                  return value.toString().split('').map(() => 'X').join(''); // Obscure the values
                }
                return value;
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
      },
    });
  }
});
</script>

<style scoped>
/* Adding CSS for blurring the Y-axis labels */
canvas {
  filter: blur(2px); /* This applies a slight blur effect to the entire canvas */
}

canvas.active {
  filter: none; /* Removes the blur if the user has an active subscription */
}
</style>
