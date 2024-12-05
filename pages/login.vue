<template>
  <div class="flex items-center justify-center min-h-screen bg-slate-900">
    <div class="p-12 bg-white shadow-lg rounded-md w-96">
      <h1 class="text-2xl font-bold text-center mb-6">LOGIN</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            id="email"
            type="email"
            v-model="email"
            class="mt-1 p-3 block w-full bg-slate-200 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Senha</label
          >
          <input
            id="password"
            type="password"
            v-model="password"
            class="mt-1 p-3 block w-full bg-slate-200 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          class="w-full mt-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "login",
});

import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await $fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      body: {
        email: email.value,
        senha: password.value,
      },
    });

    // Salva o token no localStorage
    localStorage.setItem("token", response.token);

    // Redireciona para o dashboard
    router.push("/");
  } catch (error) {
    console.error("Erro no login:", error);
    alert("Login falhou. Verifique suas credenciais.");
  }
};
</script>
