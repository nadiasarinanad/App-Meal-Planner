import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';

const NutritionInfoScreen = ({ navigation }) => {
  const route = useRoute();
  const { itemId } = route.params;
  const [nutritionInfo, setNutritionInfo] = useState(null);

  useEffect(() => {
    fetchNutritionData(itemId);
  }, [itemId]);

  const fetchNutritionData = async (id) => {
    setNutritionInfo({
      name: 'Nasi Goreng',
      calories: 400,
      protein: 10,
      carbohydrates: 50,
      fat: 12,
      vitamins: 'Vitamin A, B, C',
      minerals: 'Calcium, Iron',
      fiber: 5,
      sugar: 4,
      sodium: 300
    });
  };

  const handleAddToCart = () => {
    navigation.navigate('ShoppingCart', { item: nutritionInfo });
  };

  const handleViewRecipe = () => {
    navigation.navigate('ResepMakanan', { itemId });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {nutritionInfo ? (
        <View style={styles.card}>
          <Text style={styles.title}>{nutritionInfo.name}</Text>
          <Text style={styles.subtitle}>Nutrition Facts</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}><Text style={styles.label}>Calories:</Text> {nutritionInfo.calories} kcal</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Protein:</Text> {nutritionInfo.protein} g</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Carbohydrates:</Text> {nutritionInfo.carbohydrates} g</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Fat:</Text> {nutritionInfo.fat} g</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Vitamins:</Text> {nutritionInfo.vitamins}</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Minerals:</Text> {nutritionInfo.minerals}</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Fiber:</Text> {nutritionInfo.fiber} g</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Sugar:</Text> {nutritionInfo.sugar} g</Text>
            <Text style={styles.infoText}><Text style={styles.label}>Sodium:</Text> {nutritionInfo.sodium} mg</Text>
          </View>
          <Button title="View Recipe" onPress={handleViewRecipe} color="#2196F3" />
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading nutrition info...</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E5F9E1',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#616161',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  infoContainer: {
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    lineHeight: 24,
  },
  label: {
    fontWeight: '600',
    color: '#4CAF50',
  },
  loadingText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
  },
});

export default NutritionInfoScreen;
