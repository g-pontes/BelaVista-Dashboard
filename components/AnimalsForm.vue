<template>
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      v-if="animalStore.isModalOpen"
    >
      <div class="bg-white p-6 rounded-lg w-96">
        <h2 class="text-xl font-bold mb-4">
          {{ animalStore.isAdding ? 'Adicionar Animal' : 'Editar Animal' }}
        </h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="nome" class="block text-sm font-medium text-gray-700">Nome</label>
            <input v-model="formData.nome" type="text" id="nome" class="w-full p-2 border rounded-md" required />
          </div>
  
          <div class="mb-4">
            <label for="cor" class="block text-sm font-medium text-gray-700">Cor</label>
            <input v-model="formData.cor" type="text" id="cor" class="w-full p-2 border rounded-md" required />
          </div>
  
          <div class="mb-4">
            <label for="peso" class="block text-sm font-medium text-gray-700">Peso</label>
            <input v-model="formData.peso" type="number" id="peso" class="w-full p-2 border rounded-md" required />
          </div>
  
          <div class="mb-4">
            <label for="arroba" class="block text-sm font-medium text-gray-700">Arroba</label>
            <input 
                type="number" 
                id="arroba" 
                class="w-full p-2 border rounded-md" 
                :value="calcularArroba" 
                disabled 
            />
          </div>

  
          <div class="mb-4">
            <label for="raca" class="block text-sm font-medium text-gray-700">Raça</label>
            <input v-model="formData.raca" type="text" id="raca" class="w-full p-2 border rounded-md" required />
          </div>
  
          <div class="mb-4">
            <label for="dataNascimento" class="block text-sm font-medium text-gray-700">Data de Nascimento</label>
            <input v-model="formData.dataNascimento" type="date" id="dataNascimento" class="w-full p-2 border rounded-md" required />
          </div>
  
          <div class="mb-4">
            <label for="comprado" class="block text-sm font-medium text-gray-700">Comprado</label>
            <select v-model="formData.comprado" id="comprado" class="w-full p-2 border rounded-md">
              <option :value="true">Comprado</option>
              <option :value="false">Nascido na Fazenda</option>
            </select>
          </div>
  
          <div class="mb-4">
            <label for="vendido" class="block text-sm font-medium text-gray-700">Vendido</label>
            <select v-model="formData.vendido" id="vendido" class="w-full p-2 border rounded-md">
              <option :value="true">Sim</option>
              <option :value="false">Não</option>
            </select>
          </div>
  
          <div v-if="formData.vendido" class="mb-4">
            <label for="valorVenda" class="block text-sm font-medium text-gray-700">Valor de Venda</label>
            <input v-model="formData.valorVenda" type="number" id="valorVenda" class="w-full p-2 border rounded-md" />
          </div>
  
          <div v-if="formData.vendido" class="mb-4">
            <label for="dataVenda" class="block text-sm font-medium text-gray-700">Data de Venda</label>
            <input v-model="formData.dataVenda" type="date" id="dataVenda" class="w-full p-2 border rounded-md" />
          </div>
  
          <div class="mb-4">
            <label for="vacinas" class="block text-sm font-medium text-gray-700">Vacinas</label>
            <div v-for="(vacina, index) in formData.vacinas" :key="index" class="flex mb-2">
              <input 
                v-model="vacina.vacina" 
                type="text" 
                placeholder="Nome da Vacina" 
                class="w-full p-2 border rounded-md" 
              />
              <input 
                v-model="vacina.data" 
                type="date" 
                class="ml-2 w-full p-2 border rounded-md" 
              />
              <button 
                @click.prevent="removeVacina(index)" 
                class="ml-2 text-red-500"
              >
                Remover
              </button>
            </div>
            <button @click.prevent="addVacina" class="text-blue-500">Adicionar Vacina</button>
          </div>
  
          <div class="flex justify-between">
            <button type="submit" class="bg-blue-500 text-white p-2 rounded-md">
              {{ animalStore.isAdding ? 'Adicionar' : 'Salvar' }}
            </button>
            <button @click="closeModal" type="button" class="bg-gray-500 text-white p-2 rounded-md">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useAnimalStore } from '@/stores/animalStore';
  import { ref, watch, computed } from 'vue';
  
  const animalStore = useAnimalStore();
  const formData = ref({ ...animalStore.editAnimal });
  
  const calcularArroba = computed(() => {
    return formData.value.peso ? (formData.value.peso / 15).toFixed(2) : '';
  });
  
  const addVacina = () => {
    formData.value.vacinas.push({ vacina: '', data: '' });
  };
  
  const removeVacina = (index) => {
    formData.value.vacinas.splice(index, 1);
  };
  
  const submitForm = async () => {
    if (animalStore.isAdding) {
      await animalStore.addAnimal();
    } else {
      await animalStore.saveChanges();
    }
  };
  
  const closeModal = () => {
    animalStore.closeModal();
  };
  
  watch(() => animalStore.editAnimal, (newValue) => {
    formData.value = { ...newValue };
  }, { deep: true });
  </script>
  