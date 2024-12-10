<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Meus Animais</h1>
    <p class="text-gray-600 mb-4">
      Aqui está a lista dos animais cadastrados na fazenda.
    </p>
    <button 
      @click="openAddModal" 
      class="bg-green-500 text-white p-2 rounded mb-4"
    >
      Adicionar Animal
    </button>
    <ul class="mt-4">
      <li 
        v-for="animal in animalStore.animals" 
        :key="animal.id" 
        class="p-2 border-b"
      >
        {{ animal.cor }} - {{ animal.raca }} ({{ animal.peso + "Kg"}})
        <button 
          @click="openEditModal(animal)" 
          class="bg-blue-500 text-white p-2 rounded ml-2"
        >
          Editar
        </button>
        <button 
          @click="deleteAnimal(animal)" 
          class="bg-red-500 text-white p-2 rounded ml-2"
        >
          Deletar
        </button>
      </li>
    </ul>
    <AnimalsForm v-if="animalStore.isModalOpen" />
  </div>
</template>

<script setup>
import { useAnimalStore } from '@/stores/animalStore';
import AnimalsForm from '@/components/AnimalsForm.vue';

const animalStore = useAnimalStore();

const openAddModal = () => {
  animalStore.openAddModal();
};

const openEditModal = (animal) => {
  animalStore.openEditModal(animal);
};

const deleteAnimal = (animal) => {
  animalStore.deleteAnimal(animal);
};

animalStore.fetchAnimals();
</script>
