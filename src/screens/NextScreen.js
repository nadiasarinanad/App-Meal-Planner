import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const NextScreen = ({ route, navigation }) => {
    const { item } = route.params; // Menerima item dari parameter navigasi

    return (
        <View style={styles.container}>
            <Text style={styles.title}>This is the Next Screen!</Text>
            
            {/* Tombol untuk navigasi ke NutritionInfoScreen dengan data terbaru */}
            <Button
              title="Info Nutrisi"
              onPress={() => navigation.navigate('Nutrition', { foodName: item.name })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default NextScreen;
