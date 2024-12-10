export default defineNuxtRouteMiddleware((to) => {
  if (!process.client) return;

  const token = localStorage.getItem("token");

  if (!token) {
    if (to.path !== "/login") {
      return navigateTo("/login");
    }
    return;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));
  const isTokenExpired = payload.exp * 1000 < Date.now();

  if (isTokenExpired) {
    localStorage.removeItem("token");
    return navigateTo("/login");
  }

  if (to.path === "/login") {
    return navigateTo("/");
  }
});


