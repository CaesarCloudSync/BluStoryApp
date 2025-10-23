import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomBar from '@/components/BottomBar';
const CreationTypePage = () => {
  return (
    <View style={creationTypeStyles.container}>
      <View style={creationTypeStyles.card}>
        <TouchableOpacity style={creationTypeStyles.optionButton}>
          <Text style={creationTypeStyles.optionText}>Story</Text>
        </TouchableOpacity>

        <Text style={creationTypeStyles.orText}>OR</Text>

        <TouchableOpacity style={creationTypeStyles.optionButton}>
          <Text style={creationTypeStyles.optionText}>Movie</Text>
        </TouchableOpacity>
      </View>
      <BottomBar />
    </View>
  );
};

const creationTypeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA', // Light grey background
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 30,
    width: '85%',
    aspectRatio: 0.8, // Adjust aspect ratio to control card height
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2, // Border for the card
    borderColor: '#000',
  },
  optionButton: {
    width: '70%',
    aspectRatio: 2, // Make it a horizontal rectangle
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15, // Space between options
  },
  optionText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  orText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    marginVertical: 10,
  },
});

export default CreationTypePage;