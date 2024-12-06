// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['./assets/css/main.css'],

  build: {
    transpile: ['vue-chartjs'],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Registra o plugin
  plugins: ['~/plugins/fetchInterceptor.js'],

  modules: ['dayjs-nuxt']
})