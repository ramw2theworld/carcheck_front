<template>
  <canvas :class="props.class" ref="chartCanvas" :height="height" :width="width"></canvas>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

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

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const chartCanvas = ref<HTMLCanvasElement | null>(null);

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
            // borderColor: 'rgba(75, 192, 192, 1)',
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