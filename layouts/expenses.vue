<template>
  <div>
    <Sidebar />
    <div class="max-h-screen h-screen overflow-hidden ml-56 p-6">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import Sidebar from "~/components/Sidebar.vue";
</script>


