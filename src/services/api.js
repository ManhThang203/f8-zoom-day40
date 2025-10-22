const API_URL = "http://localhost:3001/tasks";

export const taskAPI = {
  getAll: async () => {
    const response = await fetch(API_URL);
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
  },

  create: async (data) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  update: async (id, data) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  delete: async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  },
};
