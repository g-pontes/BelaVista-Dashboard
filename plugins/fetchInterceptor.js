export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$fetch = async (url, options = {}) => {
    if (process.client) {
      const token = localStorage.getItem("token");
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    try {
      return await $fetch(url, options);
    } catch (error) {
      if (error.response?.status === 401 && process.client) {
        localStorage.removeItem("token");
        navigateTo("/login");
      }
      throw error;
    }
  };
});
