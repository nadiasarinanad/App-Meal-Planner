import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

const ShoppingCartScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [cartItems, setCartItems] = useState([]);

  const addToCart = () => {
    // Add item to the cart
    setCartItems([...cartItems, item]);
  };

  const handleCheckout = () => {
    // Placeholder for checkout action
    alert('Proceeding to checkout');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>
          )}
        />
      )}
      <Button title="Add More" onPress={addToCart} color="#4CAF50" />
      <Button title="Proceed to Checkout" onPress={handleCheckout} color="#FF6347" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
  cartItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 10,
    elevation: 5,
  },
  itemName: {
    fontSize: 18,
    color: '#333',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ShoppingCartScreen;
