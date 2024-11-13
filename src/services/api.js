// src/services/api.js
import axios from 'axios';

// Inisialisasi API utama untuk menu mingguan
const api = axios.create({
  baseURL: 'https://your-api-url.com/api', // Ganti dengan URL API yang benar
  headers: {
    'Content-Type': 'application/json',
  },
});

// Endpoint untuk API nutrisi
const NUTRITION_API_URL = 'https://nutrition-api-url.com'; // Ganti dengan URL API Nutrisi yang benar
const API_KEY = 'your-nutrition-api-key'; // Ganti dengan API Key yang benar

// Mendapatkan semua item menu mingguan
export const getWeeklyMenu = async () => {
  try {
    const response = await api.get('/weekly-menu');
    return response.data;
  } catch (error) {
    console.error('Error fetching weekly menu:', error);
    throw error;
  }
};

// Menambahkan item menu baru
export const createMenuItem = async (item) => {
  try {
    const response = await api.post('/weekly-menu', {
      name: item.name,
      time: item.time,
      day: item.day, // Mengirimkan hari, nama, dan waktu
    });
    return response.data;
  } catch (error) {
    console.error('Error creating menu item:', error);
    throw error;
  }
};

// Memperbarui item menu berdasarkan ID
export const updateMenuItem = async (id, updatedItem) => {
  try {
    const response = await api.put(`/weekly-menu/${id}`, {
      name: updatedItem.name,
      time: updatedItem.time,
      day: updatedItem.day, // Mengirimkan hari, nama, dan waktu untuk memperbarui item
    });
    return response.data;
  } catch (error) {
    console.error('Error updating menu item:', error);
    throw error;
  }
};

// Menghapus item menu berdasarkan ID
export const deleteMenuItem = async (id) => {
  try {
    const response = await api.delete(`/weekly-menu/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting menu item:', error);
    throw error;
  }
};

// API untuk mendapatkan informasi nutrisi berdasarkan nama makanan
export const getNutritionInfo = async (foodName) => {
  try {
    const response = await axios.get(NUTRITION_API_URL, {
      headers: {
        'x-api-key': API_KEY, // Mengirim API Key dalam header (sesuaikan jika berbeda)
      },
      params: {
        query: foodName,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch nutrition info:', error);
    throw error;
  }
};

export default api;
