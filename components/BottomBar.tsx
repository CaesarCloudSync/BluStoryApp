import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const BottomBar = () => {
  return (
    <View style={styles.bottomBar}>
      <Image
        //source={require('../../assets/blu-club-logo.png')} // Replace with your logo path
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={styles.bluClubText}>BLU Club</Text>
        <Text style={styles.sloganText}>We Play, Learn</Text>
        <Text style={styles.sloganText}>and Communicate</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7D64B', // Yellow color
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 60, // Adjust height as needed
    borderTopWidth: 1, // Optional: for a subtle separation
    borderTopColor: '#eee',
  },
  logo: {
    width: 40, // Adjust size as needed
    height: 40,
    marginRight: 10,
  },
  textContainer: {
    // If you want text to wrap or align differently
  },
  bluClubText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000', // Or your desired text color
  },
  sloganText: {
    fontSize: 8,
    color: '#000',
  },
});

export default BottomBar;