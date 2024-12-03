<template>
  <div>
    <h2 class="text-lg font-bold mb-4">Gráficos de Lucro e Gastos</h2>
    <div class="grid grid-cols-2 gap-6">
      <div>
        <h3 class="text-md font-bold mb-2">Lucro</h3>
        <BarChart :data="data.profit" :color="'green'" />
      </div>
      <div>
        <h3 class="text-md font-bold mb-2">Gastos</h3>
        <BarChart :data="data.expense" :color="'red'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import BarChart from "@/components/BarChart.vue";

const data = {
  profit: [1000, 2000, 3000, 4000, 5000],
  expense: [800, 1200, 1500, 1800, 2000],
};
</script>
