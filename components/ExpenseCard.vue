<template>
  <div class="flex flex-col gap-2 w-full p-4 bg-gray-100 rounded-lg hover:-translate-y-1 transition-transform">
    <div class="flex items-end justify-between">
      <h3 class="font-medium text-gray-700">{{ title }}</h3>

      <div class="w-6 rounded-full bg-rose-200 p-1">
        <ArrowUp color="#fb7185"/>
      </div>
    </div>

    <p class="text-xl font-bold text-rose-500">
      R${{ totalExpenses }}
    </p>
  </div>
</template>

<script setup>
import ArrowUp from './svg/ArrowUp.vue';

defineProps({
  title: {
    type: String,
    default: 'Tipo de gasto'
  },
  totalExpenses: {
    type: Number,
    default: 0
  }
})
</script>