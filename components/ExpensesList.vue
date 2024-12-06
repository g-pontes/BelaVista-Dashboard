<template>
  <table v-if="expenses.length" class="w-full h-full">
    <thead class="border-b-2">
      <tr class="[&>*]:text-start [&>*]:font-semibold [&>*]:pb-2">
        <th>Tipo</th>
        <th>Valor</th>
        <th>Data</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr 
        v-for="expense in expenses" 
        :key="expense._id" 
        class="border-b [&>*]:py-3"
      >
        <td>{{ formatedCatetogyNameMap[expense.categoria] || expense.categoria }}</td>
        <td>R${{ expense.valor }}</td>
        <td>{{ formatDate(expense.data) }}</td>
        <td>Editar</td>
      </tr>
    </tbody>
  </table>

  <div v-else>Nenhum gasto encontrado no período escolhido</div>
</template>

<script setup>
const formatedCatetogyNameMap = {
  racao: "🥜 Ração",
  "mao-de-obra": "Mão de Obra",
  limpeza: "Limpeza",
  pasto: "Pasto",
  medicamento: "Medicamento"
}

defineProps({
  expenses: {
    type: Array
  }
});

</script>