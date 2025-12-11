
export const setAuthToken = (token) => localStorage.setItem("token", token);
export const getAuthToken = () => localStorage.getItem("token");
export const removeAuthToken = () => localStorage.removeItem("token");

export const setUser = (user) => localStorage.setItem("user", JSON.stringify(user));
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const removeUser = () => localStorage.removeItem("user");

export const isLoggedIn = () => !!getAuthToken();

export const logout = () => {
  removeAuthToken();
  removeUser();
  window.location.href = "/login";
};
