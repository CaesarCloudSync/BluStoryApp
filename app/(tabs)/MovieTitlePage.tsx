import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import BottomBar from '@/components/BottomBar';

const MovieTitlePage = () => {
  return (
    <View style={movieTitleStyles.container}>
      <View style={movieTitleStyles.card}>
        <View style={movieTitleStyles.inputContainer}>
          <TextInput
            style={movieTitleStyles.titleInput}
            placeholder="Add your movie title here"
            placeholderTextColor="#666"
          />
          <TextInput
            style={movieTitleStyles.directorInput}
            placeholder="Directed by (add name here)"
            placeholderTextColor="#666"
          />
        </View>
      </View>
      <Text style={movieTitleStyles.projectName}>Project name</Text>
      <BottomBar />
    </View>
  );
};

const movieTitleStyles = StyleSheet.create({
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
    aspectRatio: 0.8, // Adjust aspect ratio to control card height
    marginTop: 50,
    marginBottom: 20, // Space above project name
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2, // Border for the card
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#F9F9F9', // Slightly different background for the input box
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  directorInput: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
  },
  projectName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20, // Space above bottom bar
  },
});

export default MovieTitlePage;