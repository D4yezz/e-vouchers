import { apiFetch } from "./api";

export const getPaket = () => {
  return apiFetch("/paket-data");
};

export const getPaketById = (id) => {
  return apiFetch(`/paket-data/${id}`);
};
