import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // For the plus icon
import BottomBar from '@/components/BottomBar';

const RecentCreationsPage = () => {

  function ExistingProjects({name}:any) {
    const navigateToProject = () => {
        console.log("Navigate to project:", name);
    };
    return (
    <TouchableOpacity onPress={navigateToProject} style={recentCreationsStyles.projectPlaceholder}>
      <Text style={recentCreationsStyles.projectNameText}>{name}</Text>
    </TouchableOpacity>
    )
  }

  return (
    <View style={recentCreationsStyles.container}>
      <ScrollView contentContainerStyle={recentCreationsStyles.scrollContent}>
        <Text style={recentCreationsStyles.headerText}>
          Start creating,
          {'\n'}stories or movies
        </Text>

        <Text style={recentCreationsStyles.sectionTitle}>Recent creations</Text>
        <View style={recentCreationsStyles.projectsGrid}>
            <ExistingProjects name="Project name 1" />
            <ExistingProjects name="Project name 2" />
            <ExistingProjects name="Project name 3" />
            <ExistingProjects name="Project name 4" />
            <ExistingProjects name="Project name 5" />
            <ExistingProjects name="Project name 6" />
        </View>
        <TouchableOpacity style={recentCreationsStyles.viewAllButton}>
          <Text style={recentCreationsStyles.viewAllText}>View all</Text>
        </TouchableOpacity>

        <Text style={recentCreationsStyles.sectionTitle}>Start a new creation</Text>
        <TouchableOpacity style={recentCreationsStyles.createButton}>
          <AntDesign name="plus" size={40} color="black" />
        </TouchableOpacity>
      </ScrollView>

      <BottomBar />
    </View>
  );
};

const recentCreationsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA', // Light grey background
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 80, // Space for the bottom bar
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 15,
    color: '#333',
  },
  projectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  projectPlaceholder: {
    width: '30%', // Roughly three per row with spacing
    aspectRatio: 1, // Makes it a square
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 5,
    paddingBottom: 10,
  },
  projectNameText: {
    fontSize: 14,
    color: '#000',
    marginTop: 5, // Position text at the bottom
  },
  viewAllButton: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },
  viewAllText: {
    fontSize: 16,
    color: '#007AFF', // Blue link color
  },
  createButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F7D64B', // Yellow background for plus
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default RecentCreationsPage;