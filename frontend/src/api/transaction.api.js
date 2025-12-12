import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
const API_URL = `${BASE_URL}/transactions`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
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
    type: data.type.toLowerCase(),
    note: data.note || null,
  };

  return axios.post(API_URL, payload, {
    headers: getAuthHeaders(),
  });
};
