import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const WelcomePage = () => {
  return (
    <View style={welcomeStyles.container}>
      <Image
        //source={require('../../assets/blu-club-logo.png')} // Replace with your logo path
        style={welcomeStyles.logo}
        resizeMode="contain"
      />
      <View style={welcomeStyles.textContainer}>
        <Text style={welcomeStyles.bluClubText}>BLU Club</Text>
        <Text style={welcomeStyles.sloganText}>We Play, Learn</Text>
        <Text style={welcomeStyles.sloganText}>and Communicate</Text>
      </View>
    </View>
  );
};

const welcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7D64B', // Yellow background
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150, // Adjust size as needed
    height: 150,
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  bluClubText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366', // Dark blue text
    marginBottom: 5,
  },
  sloganText: {
    fontSize: 16,
    color: '#CC0000', // Red text
    // fontFamily: 'Comic Sans MS', // If you have a custom font, use it here
  },
});

export default WelcomePage;