<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Meus Animais</h1>
    <div class="flex flex-row justify-between gap-4">
      <p class="text-gray-600">
        Aqui está a lista dos animais cadastrados na fazenda.
      </p>
      <button class="border-2 rounded-md p-1 w-40 hover:bg-gray-100">Adicionar animal</button>
    </div>
    <ul class="mt-4">
      <li
        v-for="animal in animals"
        :key="animal.id"
        class="p-2 border-b cursor-pointer hover:bg-gray-100"
        @click="openEditModal(animal)"
      >
        {{ animal.name }} - {{ animal.type }} ({{ animal.age }} anos) - {{ animal.color }}
      </li>
    </ul>

    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 class="text-xl font-bold mb-4">Editar Animal</h2>
        <form @submit.prevent="saveChanges">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nome</label>
              <input
                v-model="editAnimal.name"
                type="text"
                class="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Cor</label>
              <input
                v-model="editAnimal.color"
                type="text"
                class="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Peso (kg)</label>
              <input
                v-model="editAnimal.weight"
                type="number"
                class="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Peso (arroba)</label>
              <input
                v-model="editAnimal.arroba"
                type="number"
                class="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Raça</label>
              <input
                v-model="editAnimal.breed"
                type="text"
                class="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento</label>
              <input
                v-model="editAnimal.birthDate"
                type="text"
                class="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Local de Nascimento</label>
              <input
                v-model="editAnimal.birthPlace"
                type="text"
                class="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Filho de</label>
              <input
                v-model="editAnimal.parent"
                type="text"
                class="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Vacina</label>
              <input
                v-model="editAnimal.vaccine"
                type="text"
                class="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Data da Vacina</label>
              <input
                v-model="editAnimal.vaccineDate"
                type="text"
                class="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Origem</label>
              <select v-model="editAnimal.origin" class="w-full p-2 border rounded-md">
                <option value="criado">Criado na fazenda</option>
                <option value="comprado">Comprado</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Animal Vendido?</label>
              <select v-model="editAnimal.isSold" class="w-full p-2 border rounded-md">
                <option :value="true">Sim</option>
                <option :value="false">Não</option>
              </select>
            </div>
            <div v-if="editAnimal.isSold">
              <label class="block text-sm font-medium text-gray-700 mb-2">Data da Venda</label>
              <input
                v-model="editAnimal.saleDate"
                type="date"
                class="w-full p-2 border rounded-md"
              />
            </div>
            <div v-if="editAnimal.isSold">
              <label class="block text-sm font-medium text-gray-700 mb-2">Valor da Venda</label>
              <input
                v-model="editAnimal.saleValue"
                type="number"
                class="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div class="flex justify-end mt-4">
            <button
              type="button"
              class="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
              @click="closeModal"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md"
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

const peso = 450;

const animals = ref([
  {
    id: 1,
    name: "Boi Bravo",
    type: "Boi",
    color: "Marrom",
    weight: 450,
    arroba: peso/15,
    breed: "Nelore",
    birthDate: "2019-05-12",
    birthPlace: "Fazenda Boa Vista",
    parent: "Boi Valente",
    vaccine: "Febre Aftosa",
    vaccineDate: "2023-02-15",
    origin: "criado",
    isSold: false,
    saleDate: null,
    saleValue: null,
  },
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
