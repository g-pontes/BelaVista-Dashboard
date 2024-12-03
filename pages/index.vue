<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Bem-vindo a Fazenda Bela Vista</h1>
    <HomeStats class="mb-10" :stats="stats" />
    <Charts :data="chartData" />
  </div>
</template>

<script setup>
import HomeStats from "~/components/HomeStats.vue";
import Charts from "~/components/Charts.vue";

const stats = {
  totalProfit: 50000,
  totalExpense: 30000,
  monthlyProfit: 8000,
  monthlyExpense: 5000,
};

const chartData = {
  profit: [1000, 2000, 3000, 4000, 5000],
  expense: [800, 1200, 1500, 1800, 2000],
};
</script>
