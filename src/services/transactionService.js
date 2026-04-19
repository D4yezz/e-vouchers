import { apiFetch } from "./api";

export const getTransactions = () => {
  return apiFetch("/transactions", {
    method: "GET",
  });
};

export const createTransaction = (data) => {
  return apiFetch("/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
