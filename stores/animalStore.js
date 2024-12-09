import { defineStore } from 'pinia';
import axios from 'axios';

export const useAnimalStore = defineStore('animal', {
  state: () => ({
    animals: [],
    isModalOpen: false,
    editAnimal: null,
    isAdding: false,
  }),
  actions: {
    setAuthHeader() {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
      } else {
        delete axios.defaults.headers['Authorization'];
      }
    },

    async fetchAnimals() {
      this.setAuthHeader();
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
        nome: '',
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
      this.setAuthHeader();
      try {
        const response = await axios.post('http://localhost:5000/api/animal', this.editAnimal);
        this.animals.push(response.data);
        this.closeModal();
      } catch (error) {
        console.error('Erro ao adicionar animal:', error);
      }
    },

    async saveChanges() {
      this.setAuthHeader();
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
      this.setAuthHeader();
      try {
        await axios.delete(`http://localhost:5000/api/animal/${this.editAnimal.id}`);
        this.animals = this.animals.filter(a => a.id !== this.editAnimal.id);
        this.closeModal();
      } catch (error) {
        console.error('Erro ao excluir animal:', error);
      }
    },

    async loadAnimal(id) {
      this.setAuthHeader();
      try {
        const response = await axios.get(`http://localhost:5000/api/animal/${id}`);
        this.editAnimal = response.data;
      } catch (error) {
        console.error('Erro ao carregar animal para edição:', error);
      }
    },
  },
});
