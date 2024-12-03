<template>
  <div class="bg-gray-800 text-white h-full w-64 fixed">
    <div class="p-4 text-lg font-bold">Fazenda Dashboard</div>
    <nav class="mt-6">
      <ul>
        <li class="p-3 ml-1 hover:bg-gray-700">
          <NuxtLink to="/">Home</NuxtLink>
        </li>
        <li class="p-3 ml-1 hover:bg-gray-700">
          <NuxtLink to="/animals">Meus Animais</NuxtLink>
        </li>
        <li class="p-3 ml-1 hover:bg-gray-700">
          <NuxtLink to="/expenses">Gastos</NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
