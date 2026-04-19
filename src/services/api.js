const BASE_URL = "http://localhost:3000";

export const apiFetch = async (endpoint, options = {}) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!res.ok) {
    throw new Error("API Error");
  }

  return res.json();
};
