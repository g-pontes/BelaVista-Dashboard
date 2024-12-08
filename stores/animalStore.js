import { defineStore } from "pinia";
import api from "~/services/api";

export const useAnimalStore = defineStore("animalStore", {
    state: ()=> ({
        animals: [],
        isLoading: false,
        error: null,
    }),

    actions: {
        async fetchAnimals() {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await api.get("/api/animal")
                this.animals = response.data;
            } catch (error) {
                this.error = "Erro ao carregar os animais";
                console.error(error);
            } finally {
                this.isLoading = false;
            }
        },

        async addAnimal(animal) {
            try {
                const response = await api.post("/api/animal", animal);
                this.animals.push(response.data);
            } catch (error) {
                this.error = "Erro ao adicionar o animal";
                console.error(error);
            }
        },

        async updateAnimal(animalId) {
            try {
                const response = await api.put(`/api/animal/${updateAnimal.id}`, updateAnimal);
                const index = this.animals.findIndex((a) => a.id === updateAnimal.id);
                if (index !== -1) {
                    this.animals[index] = response.data;    
                }
            } catch (error) {
                this.error = "Erro ao atualizar o animal";
                console.error(error);
            }
        },

        async deleteAnimal(animalId) {
            try {
                await api.delete(`api/animal/${animalId}`);
                this.animals = this.animals.filter((a) => a.id !== animalId);
            } catch (error) {
                this.error = "Erro ao excluir o animal.";
                console.error(error);
            }
        },
    },
});