import { apiFetch } from "./api";

export const loginUser = async ({ email, password }) => {
  try {
    const response = await apiFetch("/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response) {
      throw new Error("Failed to fetch users");
    }
    const user = response.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerUser = async ({ email, password }) => {
  try {
    const response = await apiFetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: email.split("@")[0], email, password }),
    });
    return response;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
