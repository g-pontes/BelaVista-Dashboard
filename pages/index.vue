<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Bem-vindo a Fazenda Bela Vista</h1>
    <HomeStats class="mb-10" :stats="stats" />
    <Charts :data="chartData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import HomeStats from "~/components/HomeStats.vue";
import Charts from "~/components/Charts.vue";

const stats = ref({
  totalProfit: 0,
  totalExpense: 0,
  monthlyProfit: 0,
  monthlyExpense: 0,
});

const chartData = ref({
  profit: [],
  expense: [],
});

const fetchStats = async () => {
  try {
    const response = await $fetch("http://localhost:5000/api/dashboard/stats");
    stats.value = {
      totalProfit: response.totalProfit,
      totalExpense: response.totalExpense,
      monthlyProfit: response.monthlyProfit,
      monthlyExpense: response.monthlyExpense,
    };

    chartData.value = {
      profit: [response.monthlyProfit],
      expense: [response.monthlyExpense],
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
  }
};

onMounted(() => {
  fetchStats();
});
</script>
