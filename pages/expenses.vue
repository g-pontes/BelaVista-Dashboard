<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Meus Animais</h1>
    <p class="text-gray-600">
      Aqui está a lista dos animais cadastrados na fazenda.
    </p>

    <ul class="mt-4">
      <li v-for="animal in animals" :key="animal.id" class="p-2 border-b">
        {{ animal.name }} - {{ animal.type }} ({{ animal.age }} anos)
      </li>
    </ul>
  </div>
</template>

<script setup>
const animals = [
  { id: 1, name: "Boi Bravo", type: "Boi", age: 5 },
  { id: 2, name: "Vaca Mimosa", type: "Vaca", age: 3 },
  { id: 3, name: "Boi Valente", type: "Boi", age: 4 },
];
</script>

<style scoped></style>
