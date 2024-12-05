<template>
  <table class="w-full h-full">
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
        :key="expense.id" 
        class="border-b [&>*]:py-3"
      >
        <td>{{ expense.categoria }}</td>
        <td>R${{ expense.valor }}</td>
        <td>{{ expense.data }}</td>
        <td>Editar</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const expenses = [
  { id: 1, categoria: "racao", valor: 644.25, data: "2025-12-06T21:18:24.100Z"},
  { id: 2, categoria: "racao", valor: 26534.25, data: "2025-12-06T21:18:84.100Z"},
  { id: 31, categoria: "limpeza", valor: 2614.25, data: "2025-12-06T21:18:29.100Z"},
  { id: 154, categoria: "racao", valor: 36454.25, data: "2025-12-12T10:20:10.100Z"},
  { id: 1654, categoria: "pasto", valor: 64.25, data: "2025-12-06T21:18:29.100Z"},
];
</script>