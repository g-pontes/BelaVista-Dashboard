import { defineStore } from 'pinia';
import axios from 'axios';

export const useAnimalStore = defineStore('animal', {
  state: () => ({
    animals: [],
    isModalOpen: false,
    editAnimal: null,
    isAdding: false,
    token: localStorage.getItem('token') || null, 
  }),
  actions: {
    
    configureAxios() {
      if (this.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }
    },

    setToken(token) {
      this.token = token;
      localStorage.setItem('token', token);
      this.configureAxios();
    },

    removeToken() {
      this.token = null;
      localStorage.removeItem('token');
      this.configureAxios(); 
    },

    async fetchAnimals() {
      try {
        const response = await axios.get('http://localhost:5000/api/animal');
        this.animals = response.data;
      } catch (error) {
        console.error('Erro ao buscar animais:', error);
      }
    },

    openEditModal(animal) {
      this.editAnimal = { ...animal };
      this.isAdding = false;
      this.isModalOpen = true;
    },

    openAddModal() {
      this.editAnimal = {
        cor: '',
        peso: null,
        arroba: null,
        raca: '',
        dataNascimento: '',
        localNascimento: '',
        pai: '',
        vacinas: [],
        comprado: false,
        vendido: false,
        dataVenda: null,
        valorVenda: null,
      };
      this.isAdding = true;
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
    },

    async addAnimal() {
      try {
        const response = await axios.post('http://localhost:5000/api/animal', this.editAnimal);
        this.animals.push(response.data);
        this.closeModal();
      } catch (error) {
        console.error('Erro ao adicionar animal:', error);
      }
    },

    async saveChanges() {
      try {
        const response = await axios.put(`http://localhost:5000/api/animal/${this.editAnimal.id}`, this.editAnimal);
        const index = this.animals.findIndex(a => a.id === this.editAnimal.id);
        if (index !== -1) {
          this.animals[index] = response.data;
        }
        this.closeModal();
      } catch (error) {
        console.error('Erro ao salvar alterações no animal:', error);
      }
    },

    async deleteAnimal() {
      try {
        await axios.delete(`http://localhost:5000/api/animal/${this.editAnimal.id}`);
        this.animals = this.animals.filter(a => a.id !== this.editAnimal.id);
        this.closeModal();
      } catch (error) {
        console.error('Erro ao excluir animal:', error);
      }
    },
  },
});
