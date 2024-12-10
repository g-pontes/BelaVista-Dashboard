<template>
  <div 
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" 
    v-if="expenseStore.isModalOpen"
  >
    <div class="bg-white p-6 rounded-lg w-96 max-w-[80%]">
      <h2 class="text-xl font-bold mb-4">
        {{ expenseStore.isEditingExpense ? "Editar gasto" : "Adicionar gasto"}}
      </h2>

      <form @submit.prevent="expenseStore.handleExpense">
        <div class="mb-4">
          <label for="category" class="block text-sm font-medium text-gray-700">Categoria</label>

          <select v-model="expenseStore.formData.category" id="category" class="w-full p-2 border rounded-md">
            <option value="racao" selected>Ração</option>
            <option value="mao-de-obra">Mão de Obra</option>
            <option value="limpeza">Limpeza</option>
            <option value="pasto">Pasto</option>
            <option value="medicamento">Medicamento</option>
          </select>
        </div>

        <div class="mb-4">
          <label for="value" class="block text-sm font-medium text-gray-700">Valor do gasto</label>
          <input v-model="expenseStore.formData.value" type="number" step="0.01" placeholder="R$0,00" id="value" class="w-full p-2 border rounded-md" />
        </div>

        <div class="mb-4 flex items-center gap-2">
          <input type="checkbox" name="createdNow" id="createdNow" v-model="createdNow" />
          <label for="createdNow" class="block text-sm font-medium text-gray-700">Data personalizada</label>
        </div>

        <div v-if="createdNow"class="mb-4">
          <input v-model="expenseStore.formData.date" type="date" id="date" class="w-full p-2 border rounded-md" />
        </div>

        <div class="flex justify-between">
          <button type="submit" class="bg-blue-500 text-white p-2 rounded-md">
            Salvar
          </button>

          <button @click="expenseStore.deleteExpense(expenseStore.formData._id)" v-if="expenseStore.isEditingExpense" type="submit" class="bg-red-500 text-white p-2 rounded ml-2">
            Deletar
          </button>

          <button @click="expenseStore.closeModal" type="button" class="bg-gray-500 text-white p-2 rounded-md">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { useExpenseStore } from '@/stores/expenseStore';

  const expenseStore = useExpenseStore();

  const createdNow = ref(false);
</script>