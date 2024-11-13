// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ganti dengan URL API Anda (gunakan localhost jika menggunakan backend lokal)
  headers: {
    'Content-Type': 'application/json',
  },
});

// API untuk mendapatkan informasi nutrisi berdasarkan itemId
export const getNutritionInfo = async (itemId) => {
  try {
    const response = await api.get(`/nutrition-info/${itemId}`);
    return response.data; // Mengembalikan data nutrisi
  } catch (error) {
    console.error('Error fetching nutrition info:', error.response ? error.response.data : error.message);
    throw error; // Melempar error untuk ditangani di tempat lain
  }
};

export default api;
