import axios from "axios";

const API_URL = "http://localhost:5000/api/transactions";

// helper to get the token from localStorage (or wherever you store it)
const getAuthHeaders = () => {
  const token = localStorage.getItem("token"); // adjust if you store it elsewhere
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getTransactions = async () => {
  return axios.get(API_URL, {
    headers: getAuthHeaders(),
  });
};

export const createTransaction = async (data) => {
  const payload = {
    productId: Number(data.productId),
    quantity: Number(data.quantity),
    type: data.type.toLowerCase(), // "in" or "out"
    note: data.note || null,
  };

  return axios.post(API_URL, payload, {
    headers: getAuthHeaders(),
  });
};
