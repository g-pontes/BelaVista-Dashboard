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

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Ração', 'Mão de Obra', 'Limpeza', 'Pasto', 'Medicamento'],

  datasets: [
    {
      backgroundColor: ['#7dd3fc', '#7dd3fc', '#7dd3fc', '#7dd3fc'],
      data: [420.3, 20, 80, 10],
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
}
</script>
