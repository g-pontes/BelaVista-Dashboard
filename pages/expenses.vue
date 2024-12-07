<template>
  <Suspense>
    <div class="flex flex-col gap-5 h-full">
      <header>
        <h1 class="text-2xl font-bold mb-3">Meus Gastos</h1>

        <div class="flex items-center justify-between gap-4">
          <p class="text-gray-600">
            Aqui estão todos os gastos da fazenda no período:
            <span class="bg-gray-200 rounded-md py-1 px-2 font-medium text-sm">
              {{ formatDate(startDate) }} à {{ formatDate(endDate) }}
            </span>
          </p>

          <div class="flex items-center gap-3">
            <div>
              <label class="mr-3" for="dataInicio">de: </label>
              <input id="dataInicio" type="date" class="border-2 rounded-md py-1 px-3 hover:bg-gray-100"
                v-model="startDate" />
            </div>

            <div>
              <label class="ml-1 mr-3" for="dataFim">até: </label>
              <input id="dataFim" type="date" class="border-2 rounded-md py-1 px-3 hover:bg-gray-100"
                v-model="endDate" />
            </div>

            <button class="w-6" @click="fetchExpensesWithNewPeriod">
              <Search />
            </button>

            <button class="border-2 rounded-md ml-4 p-1 w-36 hover:bg-gray-100" @click="openAddModal">
              Adicionar gasto
            </button>
          </div>
        </div>
      </header>

      <section class="flex flex-col gap-5">
        <h2 class="text-lg font-semibold">Gastos por categoria</h2>

        <div class="flex justify-between gap-6">
          <ExpenseCard title="🥜 Ração" :total-expenses="categorysValues[0]" />
          <ExpenseCard title="🚜 Mão de Obra" :total-expenses="categorysValues[1]" />
          <ExpenseCard title="🧹 Limpeza" :total-expenses="categorysValues[2]" />
          <ExpenseCard title="🌾 Pasto" :total-expenses="categorysValues[3]" />
          <ExpenseCard title="💉 Medicamento" :total-expenses="categorysValues[4]" />
        </div>
      </section>

      <div class="grid grid-cols-6 gap-8 h-full max-h-full overflow-hidden">
        <section class="col-span-4 p-6 bg-gray-100 rounded-lg h-full overflow-y-auto">
          <ExpensesList v-if="!isLoadingData" :expenses="expenseStore.expenses" />

          <div class="w-full h-full flex justify-center items-center" v-else>
            <p class="text-lg font-semibold">
              Carregando...
            </p>
          </div>
        </section>

        <section class="flex justify-center items-center col-span-2 bg-gray-100 rounded-lg">
          <div class="w-[80%] h-full pt-6">
            <DoughnutChart v-if="!isLoadingData" :data="categorysValues" />
          </div>
        </section>
      </div>
    </div>
  </Suspense>
</template>

<script setup>
import DoughnutChart from '~/components/DoughnutChart.vue';
import Search from '~/components/svg/Search.vue';

import { useExpenseStore } from '@/stores/expenseStore';

const expenseStore = useExpenseStore();

const POSSIBLE_CATEGORYS = ["racao", "mao-de-obra", "limpeza", "pasto", "medicamento"];

definePageMeta({
  layout: "expenses",
});

const { currentDay, dateFrom30DaysAgo } = getCurrentMonthPeriod();

const startDate = ref(dateFrom30DaysAgo);
const endDate = ref(currentDay);

const isLoadingData = ref(true);

const categorysValues = ref([]);

async function fetchExpensesWithNewPeriod() {
  isLoadingData.value = true;
  await expenseStore.fetchExpensesWithNewPeriod(startDate, endDate);
  updateChart();
  isLoadingData.value = false;
}

onMounted(async () => {
  isLoadingData.value = true;
  await expenseStore.fetchExpenses();
  updateChart();
  isLoadingData.value = false;
});

function calcTotalValueOfCategory(category) {
  let totalValueOfCategory = 0;

  const filtredListByCategory = expenseStore.expenses.filter(item => item.categoria === category);

  filtredListByCategory.forEach(item => {
    totalValueOfCategory += item.valor;
  });

  return {
    category,
    totalValueOfCategory
  };
}

function createCategorysListWithTotalValues() {
  return POSSIBLE_CATEGORYS.map(category => {
    return calcTotalValueOfCategory(category);
  });
}

function updateChart() {
  const categorysListWithTotalValues = createCategorysListWithTotalValues();

  categorysValues.value = categorysListWithTotalValues.map(item => {
    return item.totalValueOfCategory;
  });
}

</script>
