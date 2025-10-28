import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomBar from '@/components/BottomBar';

const StoryboardSelectionPage = () => {
  const renderSmallFrame = () => (
    <View style={storyboardSelectionStyles.smallFrame} />
  );

  return (
    <View style={storyboardSelectionStyles.container}>
      <View style={storyboardSelectionStyles.card}>
        <Text style={storyboardSelectionStyles.headerText}>Select a storyboard</Text>
        <View style={storyboardSelectionStyles.contentContainer}>
          <View style={storyboardSelectionStyles.largeFrame} />
          <View style={storyboardSelectionStyles.smallFramesGrid}>
            {renderSmallFrame()}
            {renderSmallFrame()}
            {renderSmallFrame()}
            {renderSmallFrame()}
            {renderSmallFrame()}
            {renderSmallFrame()}
          </View>
        </View>
      </View>
      <Text style={storyboardSelectionStyles.projectName}>Project name</Text>
      <BottomBar />
    </View>
  );
};

const storyboardSelectionStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA', // Light grey background
    justifyContent: 'space-between', // Push content to top and bottom
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    marginTop: 50, // Space from top
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2, // Border for the card
    borderColor: '#000',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  largeFrame: {
    width: '48%', // Roughly half the width
    aspectRatio: 1.2, // Make it a horizontal rectangle
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
  },
  smallFramesGrid: {
    width: '48%', // Roughly half the width
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  smallFrame: {
    width: '48%', // Two per row
    aspectRatio: 1.5, // Make it a horizontal rectangle
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#000',
    marginBottom: '4%', // Space between rows
  },
  projectName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20, // Space above bottom bar
  },
});

export default StoryboardSelectionPage;