import { defineStore } from 'pinia';
import axios from 'axios';

export const useAnimalStore = defineStore('animal', {
  state: () => ({
    animals: [],
    isLoading: false,
  }),

  actions: {
    async fetchAnimals() {
      try {
        this.isLoading = true;
        const response = await axios.get('/api/animals'); // URL da API para obter os animais
        this.animals = response.data;
      } catch (error) {
        console.error('Erro ao carregar animais:', error);
      } finally {
        this.isLoading = false;
      }
    },

    async addAnimal(newAnimal) {
      try {
        const response = await axios.post('/api/animals', newAnimal); // URL da API para adicionar animal
        this.animals.push(response.data);
      } catch (error) {
        console.error('Erro ao adicionar animal:', error);
      }
    },

    async updateAnimal(updatedAnimal) {
      try {
        const response = await axios.put(`/api/animals/${updatedAnimal._id}`, updatedAnimal); // URL da API para atualizar animal
        const index = this.animals.findIndex(animal => animal._id === updatedAnimal._id);
        if (index !== -1) {
          this.animals[index] = response.data;
        }
      } catch (error) {
        console.error('Erro ao atualizar animal:', error);
      }
    },

    async deleteAnimal(id) {
      try {
        await axios.delete(`/api/animals/${id}`); // URL da API para excluir animal
        this.animals = this.animals.filter(animal => animal._id !== id);
      } catch (error) {
        console.error('Erro ao excluir animal:', error);
      }
    },
  },

  getters: {
    getAnimalById: (state) => (id) => {
      return state.animals.find(animal => animal._id === id);
    },
  },
});
