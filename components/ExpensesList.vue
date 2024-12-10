<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold">Lista de Gastos</h2>

      <div class="flex items-center gap-4">
        <label for="categorias" class="flex items-center gap-5 hover:cursor-pointer">
          <div class="flex items-center gap-2">
            <Filter class="w-5" />
            <span class="font-semibold">Filtrar por categoria:</span>
          </div>

          <div class="rounded-lg p-2 border bg-gray-700 border-gray-600">
            <select name="categorias" id="categorias"
              class="text-sm pr-2 bg-gray-700 placeholder-gray-90 text-white [&>*]:" v-model="categoryInput">
              <option value="todas" selected>Todas</option>
              <option value="racao">Ração</option>
              <option value="mao-de-obra">Mão de Obra</option>
              <option value="limpeza">Limpeza</option>
              <option value="pasto">Pasto</option>
              <option value="medicamento">Medicamento</option>
            </select>
          </div>
        </label>
      </div>
    </div>

    <div v-if="filtredList.length">
      <table v-if="expenses && expenses.length" class="w-full h-full">
        <thead class="border-b-2">
          <tr class="[&>*]:text-start [&>*]:font-semibold [&>*]:pb-2">
            <th>Tipo</th>
            <th>Valor</th>
            <th>Data</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="expense in filtredList" :key="expense._id" class="border-b [&>*]:py-3">
            <td>{{ formatedCatetogyNameMap[expense.categoria] || expense.categoria }}</td>
            <td>R${{ expense.valor }}</td>
            <td>{{ formatDate(expense.data) }}</td>
            <td>
              <button @click="openModal(expense)" class="w-5">
                <EditPencil class="w-full" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="w-full h-full flex justify-center items-center" v-else>
      <p class="text-lg font-semibold">
        Não foram encotrados gastos {{ categoryInput !== 'todas' ? `do tipo "${formatedCatetogyNameMap[categoryInput]}"` : '' }} no período escolhido :/
      </p>
    </div>
  </div>
</template>

<script setup>
import { useExpenseStore } from '@/stores/expenseStore';

const { openModal } = useExpenseStore();

import Filter from '~/components/svg/Filter.vue';
import EditPencil from './svg/EditPencil.vue';

const formatedCatetogyNameMap = {
  racao: "🥜 Ração",
  "mao-de-obra": "🚜 Mão de Obra",
  limpeza: "🧹 Limpeza",
  pasto: "🌾 Pasto",
  medicamento: "💉 Medicamento"
}

const props = defineProps({
  expenses: {
    type: Array
  },
});

const categoryInput = ref('todas');
const filtredList = ref(props.expenses);

watch(categoryInput, () => {
  filtredList.value = categoryInput.value !== 'todas' ? props.expenses.filter(item => item.categoria === categoryInput.value) : props.expenses;
});

</script>