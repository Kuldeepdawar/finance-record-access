import axios from "axios";

const BASE_URL = "http://localhost:5000/api/finance";

export const getFinances = () => axios.get(`${BASE_URL}/get`);
export const createFinance = (data) => axios.post(`${BASE_URL}/add`, data);
export const updateFinance = (id, data) =>
  axios.put(`${`${BASE_URL}/update`}/${id}`, data);
export const deleteFinance = (id) =>
  axios.delete(`${`${BASE_URL}/delete`}/${id}`);
