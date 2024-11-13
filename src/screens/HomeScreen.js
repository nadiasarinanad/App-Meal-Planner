import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/736x/b6/db/4c/b6db4c634f67349c289e844ff11c65a4.jpg' }} // Background image URL
      style={styles.background}
    >
      {/* Top Section for Logo, Title, and Subtitle */}
      <View style={styles.topSection}>
        {/* Logo Image */}
        <Image 
          source={{ uri: 'https://example.com/logo.png' }} // Add your logo URL here
          style={styles.image} 
          resizeMode="contain"
        />

        {/* Title and Subtitle */}
        <Text style={styles.title}>Selamat Datang di Meal Planner</Text>
        <Text style={styles.subtitle}>Atur waktu makan dan rencana menu Anda.</Text>
      </View>

      {/* Bottom Section for Button */}
      <View style={styles.bottomSection}>
        <Button 
          title="Lihat Rencana Menu" 
          onPress={() => navigation.navigate('MenuPlan')}
          buttonStyle={styles.menuButton}
          titleStyle={styles.buttonTitle}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Ensure the background fills the screen
    justifyContent: 'space-between', // Ensures content is spread out between top and bottom
    alignItems: 'center',
    padding: 40,
  },
  image: {
    width: '800%',
    height: 190,
    marginBottom: 50,
    borderRadius: 10, // Keeps the rounded corners
  },
  topSection: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1, // Takes the top portion of the screen
    textAlign: 'center',
  },
  bottomSection: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 150, // Adjust this for more/less space between the button and bottom edge
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#98FB98 ', // Brighter yellow for better contrast
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: { 
    fontSize: 20, 
    color: '#708090', // White for clear readability
    textAlign: 'center', 
    marginBottom: 200, // Adds space between subtitle and button
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  menuButton: { 
    backgroundColor: '#90EE90', // A vibrant red-orange color for the button
    borderRadius: 60, // More rounded corners for the button
    paddingVertical: 10, // Increases vertical padding to make the button bigger
    paddingHorizontal: 20, // Increases horizontal padding for wider button
    elevation: 30, // Adds shadow to give a raised effect
    width: '100%', // Make button width 80% of screen width
    alignItems: 'center', // Centers the content horizontally
  },
  buttonTitle: {
    fontSize: 20, // Larger font size for the button text
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center', // Ensures text is centered horizontally
  },
});

export default HomeScreen;
