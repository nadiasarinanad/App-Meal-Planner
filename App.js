import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Ensure you are using the correct import
import 'react-native-screens'; // Ensure this is imported for better performance
import HomeScreen from './src/screens/HomeScreen'; // Make sure this path is correct
import MenuPlanScreen from './src/screens/MenuPlanScreen'; // Make sure this path is correct
import ShoppingListScreen from './src/screens/ShoppingListScreen'; // Make sure this path is correct
import NutritionScreen from './src/screens/NutritionScreen'; // Make sure this path is correct

// Create a stack navigator instance
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Define your stack screens */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MenuPlan" component={MenuPlanScreen} />
        <Stack.Screen name="ShoppingList" component={ShoppingListScreen} />
        <Stack.Screen name="Nutrition" component={NutritionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
