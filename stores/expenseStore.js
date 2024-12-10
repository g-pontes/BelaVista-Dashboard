import dayjs from '#build/dayjs.imports.mjs';
import { defineStore } from 'pinia';

export const useExpenseStore = defineStore('expense', {
  state: () => ({
    expenses: [],
    isModalOpen: false,
    formData: {
      category: 'racao',
      value: '',
      date: dayjs().format('YYYY-MM-DD')
    },
    isEditingExpense: false,
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
    },

    openModal(expense) {
      this.isModalOpen = true;

      if (expense._id) {
        this.isEditingExpense = true;

        this.formData = {
          _id: expense._id,
          category: expense.categoria,
          value: expense.valor,
          date: dayjs(expense.data).format('YYYY-MM-DD')
        }
      }
    },

    closeModal() {
      this.isModalOpen = false;
      this.isEditingExpense = false;

      this.formData = {
        category: 'racao',
        value: '',
        date: dayjs().format('YYYY-MM-DD')
      }
    },

    async handleExpense() {
      if (this.formData._id) {
        this.editExpense(this.formData._id)
      } else {
        this.addExpense();
      }

      this.closeModal();
    },

    async addExpense() {
      const token = localStorage.getItem('token');

      try {
        const { data } = await useFetch('http://localhost:5000/api/gastos', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + token
          },

          body: {
            categoria: this.formData.category,
            valor: this.formData.value,
            data: this.formData.date
          }
        });

        this.expenses.push(data.value);
      } catch (error) {
        console.error('Erro ao adicionar gasto:', error);
      }
    },

    async editExpense(id) {
      const token = localStorage.getItem('token');

      const data = await $fetch(`http://localhost:5000/api/gastos/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer ' + token
        },

        body: {
          categoria: this.formData.category,
          valor: this.formData.value,
          data: this.formData.date
        }
      });

      const index = this.expenses.findIndex(expense => expense._id === id);

      if (index !== -1) {
        this.expenses[index] = data;
      }
    },

    async deleteExpense(id) {
      const token = localStorage.getItem('token');

      const data = await $fetch(`http://localhost:5000/api/gastos/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token
        },
      });

      alert(data.message);

      const index = this.expenses.findIndex(expense => expense._id === id);

      if (index !== -1) {
        this.expenses.splice(index, 1);
      }
    },
  }
});