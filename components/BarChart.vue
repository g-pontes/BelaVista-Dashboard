<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
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
  },
});

const canvas = ref(null);
let chartInstance = null;

onMounted(() => {
  if (!props.data || !Array.isArray(props.data)) {
    console.error("Prop 'data' is missing or invalid.");
    return;
  }

  chartInstance = new Chart(canvas.value, {
    type: "line",
    data: {
      labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
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
    },
  });
});

watch(
  () => props.data,
  (newData) => {
    if (chartInstance) {
      chartInstance.data.datasets[0].data = newData;
      chartInstance.update();
    }
  }
);
</script>
