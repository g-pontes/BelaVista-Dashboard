import dayjs from '#build/dayjs.imports.mjs';

export const useExpenseStore = defineStore('expense', {
  state: () => ({
    expenses: [],
  }),

  actions: {
    async fetchExpenses() {
      const token = localStorage.getItem('token');

      const { currentDay, dateFrom30DaysAgo } = getCurrentMonthPeriod();

      const data = await $fetch('http://localhost:5000/api/gastos', {
        query: {
          'dataInicio': dateFrom30DaysAgo,
          'dataFim': currentDay
        },

        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      this.expenses = data;
    },

    async fetchExpensesWithNewPeriod(startDate, endDate) {
      const token = localStorage.getItem('token');

      const formatedEndDate = dayjs(endDate.value).add(1, 'day').format('YYYY-MM-DD');

      const { data } = await useFetch('http://localhost:5000/api/gastos', {
        query: {
          'dataInicio': startDate,
          'dataFim': formatedEndDate,
        },
  
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      this.expenses = data;
    }
  }
});