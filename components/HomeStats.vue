<template>
  <div class="grid grid-cols-2 gap-6">
    <div class="p-4 bg-green-100 rounded-lg">
      <h2 class="text-lg font-bold">Total de Lucro</h2>
      <p class="text-2xl font-bold text-green-600">
        {{ stats.totalProfit }} R$
      </p>
    </div>
    <div class="p-4 bg-red-100 rounded-lg">
      <h2 class="text-lg font-bold">Total de Gastos</h2>
      <p class="text-2xl font-bold text-red-600">{{ stats.totalExpense }} R$</p>
    </div>
    <div class="p-4 bg-green-100 rounded-lg">
      <h2 class="text-lg font-bold">Lucro no Mês</h2>
      <p class="text-2xl font-bold text-green-600">
        {{ stats.monthlyProfit }} R$
      </p>
    </div>
    <div class="p-4 bg-red-100 rounded-lg">
      <h2 class="text-lg font-bold">Gasto no Mês</h2>
      <p class="text-2xl font-bold text-red-600">
        {{ stats.monthlyExpense }} R$
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps(["stats"]);
</script>


