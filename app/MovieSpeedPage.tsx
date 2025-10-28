import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BottomBar from '@/components/BottomBar';
import { useHeaderHeight } from '@react-navigation/elements';
const MovieSpeedPage = () => {
  const [framesPerSecond, setFramesPerSecond] = useState(4);
  const headerHeight = useHeaderHeight();

  return (
    <View style={ [movieSpeedStyles.container,{ paddingTop: headerHeight }]}>
      <View style={movieSpeedStyles.card}>
        <TouchableOpacity style={movieSpeedStyles.backButton}>
          <Ionicons name="arrow-back" size={28} color="black" />
          <Text style={movieSpeedStyles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <View style={movieSpeedStyles.contentArea}>
          <Text style={movieSpeedStyles.headerText}>Movie speed</Text>
          <Text style={movieSpeedStyles.descriptionText}>
            Choose how many frames per second
          </Text>
            {/* 
          <Slider
            style={movieSpeedStyles.slider}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={framesPerSecond}
            onValueChange={setFramesPerSecond}
            minimumTrackTintColor="#F7D64B" // Yellow track
            maximumTrackTintColor="#D3D3D3"
            thumbTintColor="#003366" // Dark blue thumb
          />*/}
          <Text style={movieSpeedStyles.fpsValue}>{framesPerSecond}</Text>
        </View>
      </View>
      <BottomBar />
    </View>
  );
};

const movieSpeedStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA', // Light grey background
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    width: '90%',
    flex: 1, // Take up available space
    marginTop: 50,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#000',
    padding: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 18,
    marginLeft: 5,
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
  slider: {
    width: '80%',
    height: 40,
    marginBottom: 20,
  },
  fpsValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default MovieSpeedPage;