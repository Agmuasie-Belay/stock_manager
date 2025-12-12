import api from "./axios";

export const loginUser = (email, password) =>
  api.post("/users/login", { email, password });

export const getProfile = () => api.get("/users/profile");
