<template>
  <canvas :class="props.class" ref="chartCanvas" :height="height" :width="width"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { Chart, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

const props = defineProps<{
  data: { label: string; value: number }[];
  class?: string;
  height?: {
    type: (number | string)[];
    default: 25;
  };
  width?: {
    type: (number | string)[];
    default: '100%';
  };
}>();

const labels = computed(() => props.data.map((item) => item.label));
const values = computed(() => props.data.map((item) => item.value));
const height = computed(() => convertToNumber(props.height));
const width = computed(() => convertToNumber(props.width));

function convertToNumber(value: any) {
  if (typeof value === 'string' && value.includes('%')) {
    return value;
  }
  return typeof value === 'string' ? parseFloat(value) : value;
}

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const chartCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (chartCanvas.value) {
    new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels: labels.value,
        datasets: [
          {
            label: 'Dataset 1',
            data: values.value,
            borderColor: '#F94144',
            backgroundColor: 'rgba(249, 65, 68, 0.2)',
            borderWidth: 2,
            pointRadius: 4,
            fill: true, // Fill area under the line
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              display: true
            }
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false
          }
        },
      },
    });
  }
});
</script>

<style scoped>
/* canvas {
  width: 100% !important;
  height: 100% !important;
} */
</style>
