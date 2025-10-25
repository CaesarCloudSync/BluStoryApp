import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // For the plus icon
import BottomBar from '@/components/BottomBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Project,ProjectProps } from '@/interfaces/Projects';
const RecentCreationsPage = () => {
  const [existingProjects, setExistingProjects] = React.useState<Project[]>([]);
  const getExistingProjects = async () => {
    // Placeholder function to fetch existing projects
    //const projects = await AsyncStorage.getItem('projects');
    const projects = JSON.stringify([
  {
    "name": "Project 1",
    "thumbnailUrl": "https://example.com/thumbnails/project1.png",
    "email": "alice.johnson@example.com",
    "role": "owner",
    "avatarUrl": "https://example.com/avatars/alice.png",
    "joinedAt": "2023-09-15T10:30:00Z"
  },
  {
    "name": "Project 2",
    "thumbnailUrl": "https://example.com/thumbnails/project2.png",
    "email": "bob.smith@example.com",
    "role": "developer",
    "avatarUrl": "https://example.com/avatars/bob.png",
    "joinedAt": "2024-01-22T14:45:00Z"
  },
  {
    "name": "Project 3",
    "thumbnailUrl": "https://example.com/thumbnails/project3.png",
    "email": "carla.nguyen@example.com",
    "role": "manager",
    "avatarUrl": "https://example.com/avatars/carla.png",
    "joinedAt": "2024-03-10T09:00:00Z"
  },
  {
    "name": "Project 4",
    "thumbnailUrl": "https://example.com/thumbnails/project4.png",
    "email": "daniel.rivera@example.com",
    "role": "viewer",
    "avatarUrl": "https://example.com/avatars/daniel.png",
    "joinedAt": "2024-06-25T16:20:00Z"
  },
  {
    "name": "Project 5",
    "thumbnailUrl": "https://example.com/thumbnails/project5.png",
    "email": "emily.tan@example.com",
    "role": "developer",
    "avatarUrl": "https://example.com/avatars/emily.png",
    "joinedAt": "2024-09-03T12:10:00Z"
  },
  {
    "name": "Project 6",
    "thumbnailUrl": "https://example.com/thumbnails/project6.png",
    "email": "frank.williams@example.com",
    "role": "manager",
    "avatarUrl": "https://example.com/avatars/frank.png",
    "joinedAt": "2024-12-12T08:45:00Z"
  }
])

    if (projects) {
      const parsedProjects = JSON.parse(projects);
      setExistingProjects(parsedProjects);
      return parsedProjects;
    }
    else{
    setExistingProjects([]);
  }
    return [];
  };
  useEffect(() => {
    getExistingProjects();
  }, []);

  function ExistingProjects({project}:ProjectProps) {
    const navigateToProject = () => {
        console.log("Navigate to project:", name);
    };
    return (
    <TouchableOpacity onPress={navigateToProject} style={recentCreationsStyles.projectPlaceholder}>
      <Text style={recentCreationsStyles.projectNameText}>{project.name}</Text>
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
            {existingProjects.length > 0 ? existingProjects.map((project:Project, index:number) => (
                <ExistingProjects key={index} project={project} />
            )) : (
                <Text style={{ color: '#666', fontStyle: 'italic' }}>No recent creations found.</Text>
            )}
  
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