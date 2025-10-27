import AsyncStorage from '@react-native-async-storage/async-storage';
import { CurrentProject } from '@/interfaces/Projects';
export const getCurrentProject = async (): Promise<number | null> => {
  try {
    const currentProjectString = await AsyncStorage.getItem('current_project');
    if (currentProjectString) {
      const currentProject = JSON.parse(currentProjectString) as CurrentProject;
      return currentProject.projectId;
    }
    return null;
  } catch (error) {
    console.error('Error getting current project:', error);
    return null;
  }
};
