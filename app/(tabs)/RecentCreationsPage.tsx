import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // For the plus icon
import BottomBar from '@/components/BottomBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Project,ProjectProps,project_key } from '@/interfaces/Projects';
import { multiget } from '@/utils/AsyncStorageCrud/MultiGetData';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useNavigation } from 'expo-router';
const RecentCreationsPage = () => {
  const [existingProjects, setExistingProjects] = React.useState<Project[]>([]);
  const navigation = useNavigation();
  const getExistingProjects = async () => {
    // Placeholder function to fetch existing projects
    //const projects = await AsyncStorage.getItem('projects');

    const projects:Project[] = await multiget(project_key);
    console.log("Fetched projects:", projects);
    if (projects.length > 0) {
      setExistingProjects(projects);
      return projects;
    }
    else{
      setExistingProjects([]);
    }
    
  };
  const removeAllProjects = async () => {
    let keys = await AsyncStorage.getAllKeys();
    let projectKeys = keys.filter(key => key.startsWith(project_key));
    await AsyncStorage.multiRemove(projectKeys);
    setExistingProjects([]);
    console.log("All projects removed");
  }

    useFocusEffect(
    useCallback(() => {
      console.log('Screen is focused');

      // Example: fetch data or start animation
      getExistingProjects();

      // Cleanup when screen loses focus
      return () => {
        console.log('Screen is unfocused');
      };
    }, [])
  );
  const createproject = async () => {
    console.log("Create new project");
    let _id = Date.now()
    let project:Project = {"projectId":_id,"name":`New Project ${_id}`,"createdAt":new Date().toISOString(),"thumbnail":"","framesId":""}
    await AsyncStorage.setItem(`project_${_id}`, JSON.stringify(project));
    await AsyncStorage.setItem('current_project', JSON.stringify( { projectId: project.projectId }));
    navigation.navigate('CreationTypePage');
  }

  function ExistingProjects({project}:ProjectProps) {
    const navigateToProject = async () => {
        await AsyncStorage.setItem('current_project', JSON.stringify( { projectId: project.projectId }));
        navigation.navigate('MovieEditorPage', { projectId: project.projectId});
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
        <TouchableOpacity onPress={() =>{createproject()}} style={recentCreationsStyles.createButton}>
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