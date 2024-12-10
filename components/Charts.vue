<template>
  <div>
    <h2 class="text-lg font-bold mb-4">Gráficos de Lucro e Gastos</h2>
    <div class="grid grid-cols-2 gap-6">
      <div>
        <h3 class="text-md font-bold mb-2">Lucro</h3>
        <BarChart :data="chartData.profit" :color="'green'" />
      </div>
      <div>
        <h3 class="text-md font-bold mb-2">Gastos</h3>
        <BarChart :data="chartData.expense" :color="'red'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BarChart from "@/components/BarChart.vue";

const chartData = ref({
  profit: [],
  expense: [],
});

const fetchChartData = async () => {
  try {
    const response = await $fetch("http://localhost:5000/api/dashboard/stats");
    chartData.value = {
      profit: response.monthlyStats.map((stat) => stat.profit),
      expense: response.monthlyStats.map((stat) => stat.expense),
    };
  } catch (error) {
    console.error("Erro ao buscar dados dos gráficos:", error);
  }
};

onMounted(() => {
  fetchChartData();
});
</script>


