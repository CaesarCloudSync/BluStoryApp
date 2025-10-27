import AsyncStorage from '@react-native-async-storage/async-storage';

const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    console.log('All data cleared!');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};
export default clearAll;    