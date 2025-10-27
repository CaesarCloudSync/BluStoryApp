import AsyncStorage from '@react-native-async-storage/async-storage';
import { Project } from '@/interfaces/Projects';
export const multiget = async (keyname:string) =>{
    let keys = await AsyncStorage.getAllKeys();
    const projects = await AsyncStorage.multiGet(keys.filter(key => key.startsWith(keyname)))
    if (projects.length === 0) {
        return [];
    }
    else{
    const parsedProjects = projects.map(([key, value]) => value ? JSON.parse(value) : null).filter(project => project !== null);
    return parsedProjects;
}
}