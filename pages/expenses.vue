<template>
  <div class="flex flex-col gap-5 h-full">
    <header>
      <h1 class="text-2xl font-bold mb-3">Meus Gastos</h1>

      <div class="flex items-center justify-between gap-4">
        <p class="text-gray-600">
          Aqui estão todos os gastos da fazenda no período: 
          <span
            class="bg-gray-200 rounded-md py-1 px-2 font-medium text-sm"
          >
            {{ formatDate(startDate) }} à {{ formatDate(endDate) }}
          </span>
        </p>

        <div class="flex items-center gap-3">
          <div>
            <label class="mr-3" for="dataInicio">de: </label>
            <input 
              id="dataInicio" 
              type="date" 
              class="border-2 rounded-md py-1 px-3 hover:bg-gray-100" 
              v-model="startDate" 
            />
          </div>

          <!-- <hr class="border-2 w-8" /> -->
          <div>
            <label class="ml-1 mr-3" for="dataFim">até: </label>
            <input 
              id="dataFim" 
              type="date" 
              class="border-2 rounded-md py-1 px-3 hover:bg-gray-100" 
              v-model="endDate"
            />
          </div>

          <button
            class="w-6"
            @click="fetchDataWithNewPeriod"
          >
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
        <ExpenseCard title="🥜 Ração" />
        <ExpenseCard title="🥜 Mão de Obra" total-expenses="245.54" />
        <ExpenseCard title="🥜 Limpeza" />
        <ExpenseCard title="🥜 Pasto" />
        <ExpenseCard title="🥜 Medicamento" />
      </div>
    </section>

    <div class="grid grid-cols-6 gap-8 h-full max-h-full overflow-hidden">
      <section class="col-span-4 p-6 bg-gray-100 rounded-lg h-full overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold">Lista de Gastos</h2>

          <div class="flex items-center gap-4">
            <Filter class="w-6" />

            <label for="categorias" class="rounded-lg p-2 border bg-gray-700 border-gray-600 hover:cursor-pointer">
              <select name="categorias" id="categorias"
                class="text-sm pr-2 bg-gray-700 placeholder-gray-90 text-white [&>*]:">
                <option value="" selected>Filtrar por Categorias</option>
                <option value="racao">Ração</option>
                <option value="mao-de-obra">Mão de Obra</option>
                <option value="limpeza">Limpeza</option>
                <option value="pasto">Pasto</option>
                <option value="medicamento">Medicamento</option>
              </select>
            </label>
          </div>
        </div>

        <div>
          <ExpensesList :expenses="expenses" />
        </div>
      </section>

      <section class="flex justify-center items-center col-span-2 bg-gray-100 rounded-lg">
        <div class="w-[80%] h-full pt-6">
          <DoughnutChart />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import dayjs from '#build/dayjs.imports.mjs';
import DoughnutChart from '~/components/DoughnutChart.vue';
import Filter from '~/components/svg/Filter.vue';
import Search from '~/components/svg/Search.vue';

definePageMeta({
  layout: "expenses",
});

const expenses = ref();

const { currentDay, dateFrom30DaysAgo } = getCurrentMonthPeriod();

const startDate = ref(dateFrom30DaysAgo);
const endDate = ref(currentDay);

async function fetchDataWithNewPeriod() {
  if (process.client) {
    const token = localStorage.getItem('token');

    const formatedEndDate = dayjs(endDate.value).add(1, 'day').format('YYYY-MM-DD');
    
    const { data } = await useFetch('http://localhost:5000/api/gastos', {
      query: {
        'dataInicio': startDate,
        'dataFim': formatedEndDate
      },
      
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    
    expenses.value = data.value;
  }
}

onMounted(async () => {
  if (process.client) {
    const token = localStorage.getItem('token');

    const data = await $fetch('http://localhost:5000/api/gastos', {
      query: {
        'dataInicio': dateFrom30DaysAgo,
        'dataFim': currentDay
      },
      
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    expenses.value = data;
  }
});

// watch(startDate, () => {
//   fetchDataWithNewPeriod();
// });

</script>

<style scoped></style>
