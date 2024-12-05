<template>
  <div class="bg-gray-800 text-white h-full w-56 fixed">
    <div class="p-4 text-2xl font-bold uppercase">🌾 Bela Vista</div>
    <nav class="mt-3">
      <ul class="flex flex-col gap-1">
        <NuxtLink class="p-3 w-full hover:bg-gray-700" to="/">🏠 Home</NuxtLink>
        <NuxtLink class="p-3 w-full hover:bg-gray-700" to="/animals">🐄 Meus Animais</NuxtLink>
        <NuxtLink class="p-3 w-full hover:bg-gray-700" to="/expenses">💰 Gastos</NuxtLink>
        <button
          class="p-3 w-full hover:bg-gray-700 text-left"
          @click="handleLogout">
          ✖ Sair
        </button>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>
