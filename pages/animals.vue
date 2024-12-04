<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Meus Animais</h1>
    <p class="text-gray-600">
      Aqui está a lista dos animais cadastrados na fazenda.
    </p>
    <ul class="mt-4">
      <li
        v-for="animal in animals"
        :key="animal.id"
        class="p-2 border-b cursor-pointer hover:bg-gray-100"
        @click="openEditModal(animal)"
      >
        {{ animal.name }} - {{ animal.type }} ({{ animal.age }} anos)
      </li>
    </ul>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-xl font-bold mb-4">Editar Animal</h2>
        <form @submit.prevent="saveChanges">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Nome</label>
            <input
              v-model="editAnimal.name"
              type="text"
              class="w-full p-2 border rounded-md"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
            <input
              v-model="editAnimal.type"
              type="text"
              class="w-full p-2 border rounded-md"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Idade</label>
            <input
              v-model="editAnimal.age"
              type="number"
              class="w-full p-2 border rounded-md"
            />
          </div>
          <div class="flex justify-end">
            <button
              type="button"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
              @click="closeModal"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="bg-gray-800 text-white px-4 py-2 rounded-md"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const animals = ref([
  { id: 1, name: "Boi Bravo", type: "Boi", age: 5 },
  { id: 2, name: "Vaca Mimosa", type: "Vaca", age: 3 },
  { id: 3, name: "Boi Valente", type: "Boi", age: 4 },
]);

const isModalOpen = ref(false);
const editAnimal = ref(null);

const openEditModal = (animal) => {
  editAnimal.value = { ...animal };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const saveChanges = () => {
  const index = animals.value.findIndex((a) => a.id === editAnimal.value.id);
  if (index !== -1) {
    animals.value[index] = { ...editAnimal.value };
  }
  closeModal();
};
</script>

<style scoped>
</style>
