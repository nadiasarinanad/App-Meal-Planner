import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput, Button, Alert } from 'react-native';
import { getWeeklyMenu, createMenuItem, updateMenuItem, deleteMenuItem } from '../services/api';
import { useNavigation } from '@react-navigation/native';

const MenuPlanScreen = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [newItemTime, setNewItemTime] = useState('');
  const [newItemDay, setNewItemDay] = useState('');
  const [selectedItem, setSelectedItem] = useState(null); // Menyimpan item yang dipilih untuk diedit
  const navigation = useNavigation();

  useEffect(() => {
    fetchMenu();
  }, []);

  // Mengambil menu mingguan dari API
  const fetchMenu = async () => {
    setLoading(true);
    setError(null); // Reset error saat fetching dimulai
    try {
      const response = await getWeeklyMenu(); // Mengambil data menu dari API
      setMenu(response.data || []); // Pastikan response adalah array
    } catch (error) {
      console.error('Failed to fetch weekly menu:', error);
      setError('Gagal memuat menu. Silakan coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  // Menambahkan item baru ke dalam menu
  const handleAddItem = async () => {
    if (!newItemName || !newItemTime || !newItemDay) {
      Alert.alert('Error', 'Harap isi nama, waktu makan, dan hari');
      return;
    }
    const newItem = { name: newItemName, time: newItemTime, day: newItemDay };
    try {
      await createMenuItem(newItem); // Kirim data ke API untuk ditambahkan

      // Menambahkan item baru ke state menu secara langsung
      setMenu(prevMenu => [
        ...prevMenu,
        { ...newItem, id: Math.random().toString() } // id sementara, Anda bisa menyesuaikan jika ID diterima dari API
      ]);

      setNewItemName('');
      setNewItemTime('');
      setNewItemDay('');
    } catch (error) {
      console.error('Gagal menambahkan item menu:', error);
      Alert.alert('Error', 'Tidak dapat menambahkan item menu. Silakan coba lagi.');
    }
  };

  // Fungsi untuk memilih item yang akan diedit
  const handleUpdate = (item) => {
    setSelectedItem(item);
    setNewItemName(item.name);
    setNewItemTime(item.time);
    setNewItemDay(item.day);
  };

  // Menyimpan perubahan setelah mengedit item
  const handleSaveUpdate = async () => {
    if (!selectedItem || !newItemName || !newItemTime || !newItemDay) return;

    const updatedItem = { name: newItemName, time: newItemTime, day: newItemDay };
    try {
      // Update item ke API
      const updatedMenuItem = await updateMenuItem(selectedItem.id, updatedItem);

      // Menyimpan perubahan di state menu
      setMenu(prevMenu => prevMenu.map(item =>
        item.id === selectedItem.id ? { ...item, ...updatedItem } : item
      ));

      // Reset form dan item yang dipilih
      setSelectedItem(null);
      setNewItemName('');
      setNewItemTime('');
      setNewItemDay('');
    } catch (error) {
      console.error('Gagal memperbarui item menu:', error);
      Alert.alert('Error', 'Tidak dapat memperbarui item menu. Silakan coba lagi.');
    }
  };

  // Menghapus item menu berdasarkan ID
  const handleDelete = async (id) => {
    try {
      await deleteMenuItem(id); // Hapus item dari API
      setMenu(prevMenu => prevMenu.filter(item => item.id !== id)); // Menghapus item dari state menu
    } catch (error) {
      console.error('Gagal menghapus item menu:', error);
      Alert.alert('Error', 'Tidak dapat menghapus item menu. Silakan coba lagi.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rencana Menu Harian</Text>

      {/* Form untuk menambahkan atau memperbarui item */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nama Makanan"
          value={newItemName}
          onChangeText={setNewItemName}
        />
        <TextInput
          style={styles.input}
          placeholder="Waktu Makan (misal: 'Pagi', 'Sore')"
          value={newItemTime}
          onChangeText={setNewItemTime}
        />
        <TextInput
          style={styles.input}
          placeholder="Hari (misal: 'Senin')"
          value={newItemDay}
          onChangeText={setNewItemDay}
        />
        {selectedItem ? (
          <Button title="Simpan Perubahan" onPress={handleSaveUpdate} color="#FF8C00" />
        ) : (
          <Button title="Tambah Item" onPress={handleAddItem} color="#CB4335" />
        )}
      </View>

      {/* Daftar menu */}
      {loading ? (
        <View style={styles.centeredContainer}>
          <ActivityIndicator size="large" color="#CB4335" />
        </View>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={menu} // Daftar menu yang diambil dari API
          keyExtractor={(item) => item.id.toString()} // Menggunakan ID sebagai key untuk tiap item
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Text style={styles.dayTitle}>{item.day}</Text>
              <Text style={styles.mealText}>Nama: {item.name}</Text>
              <Text style={styles.mealText}>Waktu: {item.time}</Text>
              <View style={styles.buttonRow}>
                <Button title="Edit" onPress={() => handleUpdate(item)} color="#FF8C00" />
                <Button title="Hapus" onPress={() => handleDelete(item.id)} color="#DC143C" />
                <Button
                  title="Info Nutrisi"
                  onPress={() => navigation.navigate('Nutrition', { itemId: item.id })}
                  color="#008000"
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E5F9E1',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#CB4335',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  menuItem: {
    padding: 16,
    backgroundColor: '#FAE5D3',
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CB4335',
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4682B4',
    marginBottom: 8,
  },
  mealText: {
    fontSize: 14,
    color: '#555',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default MenuPlanScreen;
