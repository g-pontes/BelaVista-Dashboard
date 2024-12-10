<template>
  <div>
    <h1 class="text-4xl font-bold mb-10">Meus Animais</h1>
    <div class="flex justify-between items-center">
      <p class="text-gray-600">
      Aqui está a lista dos animais cadastrados na fazenda.
    </p>
    <button
      @click="openAddModal"
      class="bg-green-500 text-white p-2 rounded mb-4 hover:bg-green-600 transition-all"
    >
      Adicionar Animal
    </button>
    </div>
    
    <ul class="mt-4 p-6 bg-gray-50 rounded shadow">
      <li
        v-for="animal in animalStore.animals"
        :key="animal.id"
        class="p-2 border-b flex justify-between"
      >
        {{ animal.cor }} - {{ animal.raca }} ({{ animal.peso + "Kg" }})
        <div>
          <button
            @click="openEditModal(animal)"
            class="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-600 transition-all"
          >
            Editar
          </button>
          <button
            @click="deleteAnimal(animal)"
            class="bg-red-500 text-white p-2 rounded ml-2 hover:bg-red-600 transition-all"
          >
            Deletar
          </button>
        </div>
      </li>
    </ul>
    <AnimalsForm v-if="animalStore.isModalOpen" />
  </div>
</template>

<script setup>
import { useAnimalStore } from "@/stores/animalStore";
import AnimalsForm from "@/components/AnimalsForm.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const animalStore = useAnimalStore();

const openAddModal = () => {
  animalStore.openAddModal();
};

const openEditModal = (animal) => {
  animalStore.openEditModal(animal);
};

const deleteAnimal = (animal) => {
  animalStore.deleteAnimal(animal);
  toast("Animal deletado!", {
          type: "success",
          autoClose: 2000,
        });
};

animalStore.fetchAnimals();
</script>


