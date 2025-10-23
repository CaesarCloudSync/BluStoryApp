import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Assuming you have @expo/vector-icons installed

export default function HomeScreen() {
  const recentCreations = [
    { name: 'Project name 1' },
    { name: 'Project name 2' },
    { name: 'Project name 3' },
    { name: 'Project name 4' },
    { name: 'Project name 5' },
    { name: 'Project name 6' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.headerText}>Start creating,{"\n"}stories or movies</Text>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent creations</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentCreationsGrid}>
          {recentCreations.map((project, index) => (
            <View key={index} style={styles.projectCard}>
              <View style={styles.projectImagePlaceholder} />
              <Text style={styles.projectName}>{project.name}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Start a new creation</Text>
        </View>

        <TouchableOpacity style={styles.newCreationButton}>
          <MaterialIcons name="add" size={48} color="black" />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        {/* Placeholder for the logo, you can replace with an actual Image component */}
        <View style={styles.logoPlaceholder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingTop: 60, // Adjust as needed
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 38,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllText: {
    fontSize: 16,
    color: '#888',
  },
  recentCreationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  projectCard: {
    width: '30%', // Roughly 3 items per row with some spacing
    marginBottom: 20,
    alignItems: 'center',
  },
  projectImagePlaceholder: {
    width: '100%',
    aspectRatio: 1, // Makes it a square
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
  },
  projectName: {
    fontSize: 14,
    textAlign: 'center',
  },
  newCreationButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFD700', // Gold color
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  footer: {
    backgroundColor: '#FFD700', // Gold color
    height: 60, // Adjust as needed
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  logoPlaceholder: {
    width: 80,
    height: 40,
    backgroundColor: '#fff', // Placeholder color for the logo
    borderRadius: 5,
  },
});