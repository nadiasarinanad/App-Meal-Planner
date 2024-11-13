// server.js (Backend Express)
const express = require('express');
const app = express();
const port = 5000;

// Data Dummy untuk informasi nutrisi
const nutritionData = {
  1: {
    id: 1,
    name: "Nasi Goreng",
    calories: 500,
    protein: 12,
    carbs: 80,
    fat: 20,
  },
  2: {
    id: 2,
    name: "Sate Ayam",
    calories: 300,
    protein: 25,
    carbs: 15,
    fat: 10,
  },
};

// Endpoint untuk mendapatkan informasi nutrisi berdasarkan itemId
app.get('/api/nutrition-info/:id', (req, res) => {
  const { id } = req.params;
  const item = nutritionData[id];

  if (item) {
    res.json(item); // Mengirimkan data nutrisi
  } else {
    res.status(404).json({ message: 'Item not found' }); // Jika item tidak ditemukan
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
