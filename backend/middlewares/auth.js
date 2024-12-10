export default defineNuxtRouteMiddleware((to) => {
  const token = localStorage.getItem('token');

  if (!token && to.path !== 'http://localhost:3000/login') {
    return navigateTo('/login');
  }

  if (token && to.path === 'http://localhost:3000/login') {
    return navigateTo('/');
  }
});

