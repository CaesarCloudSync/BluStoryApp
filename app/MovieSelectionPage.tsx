import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomBar from '@/components/BottomBar';

const MusicSelectionPage = () => {
  const renderMusicOption = (title:any) => (
    <TouchableOpacity style={musicSelectionStyles.musicOption}>
      <MaterialCommunityIcons name="music-note" size={24} color="black" style={musicSelectionStyles.musicIcon} />
      <Text style={musicSelectionStyles.musicOptionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={musicSelectionStyles.container}>
      <View style={musicSelectionStyles.card}>
        <TouchableOpacity style={musicSelectionStyles.backButton}>
          <Ionicons name="arrow-back" size={28} color="black" />
          <Text style={musicSelectionStyles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <View style={musicSelectionStyles.contentArea}>
          <Text style={musicSelectionStyles.headerText}>Music</Text>
          <View style={musicSelectionStyles.optionsContainer}>
            {renderMusicOption('Select from library')}
            {renderMusicOption('Fairytale')}
            {renderMusicOption('Space ship')}
          </View>
        </View>
      </View>
      <BottomBar />
    </View>
  );
};

const musicSelectionStyles = StyleSheet.create({
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
    marginBottom: 30,
    color: '#333',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  musicOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '80%',
    marginBottom: 15,
  },
  musicIcon: {
    marginRight: 15,
  },
  musicOptionText: {
    fontSize: 18,
    color: '#333',
  },
});

export default MusicSelectionPage;