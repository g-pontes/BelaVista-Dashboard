<template>
  <Doughnut 
    :data="data" 
    :options="{
      borderColor: 'transparent',
      responsive: true,
      maintainAspectRatio: false,
      cutout: 120,
      spacing: 6 
    }" 
  />
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

const props = defineProps({
  data: {
    type: Array<number>,
    required: true
  },
});

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Ração', 'Mão de Obra', 'Limpeza', 'Pasto', 'Medicamento'],

  datasets: [
    {
      backgroundColor: ['#6b7280', '#4b5563', '#374151', '#1f2937', '#030712'],
      data: props.data
    }
  ]
}
</script>
