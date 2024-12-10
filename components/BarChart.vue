<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";
import { Chart } from "chart.js/auto";

const props = defineProps({
  data: {
    type: Array,
    required: true,
    validator: (value) =>
      Array.isArray(value) && value.every((item) => typeof item === "number"),
  },
  color: {
    type: String,
    required: true,
    validator: (value) =>
      typeof value === "string" &&
      /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)|(^(rgb|hsl)a?\(.*\)$)|(^[a-zA-Z]+$)/i.test(value),
  },
  labels: {
    type: Array,
    required: false,
    default: () => [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
  },
});

const canvas = ref(null);
let chartInstance = null;

onMounted(() => {
  createChart();
});

watch(
  () => [props.data, props.color, props.labels],
  () => {
    if (chartInstance) {
      chartInstance.destroy();
    }
    createChart();
  },
  { deep: true }
);

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});

function createChart() {
  chartInstance = new Chart(canvas.value, {
    type: "line",
    data: {
      labels: props.labels,
      datasets: [
        {
          label: "Valor",
          data: props.data,
          backgroundColor: props.color,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => `Valor: ${context.raw}`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Valores (R$)",
          },
        },
      },
    },
  });
}
</script>
