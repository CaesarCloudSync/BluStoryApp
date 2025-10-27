import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data
export const storeData = async (key:string,value:string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('Error saving data', e);
  }
};

// Read data
export  const getData = async (key:string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    else{
        return null;
    }
  } catch (e) {
    console.error('Error reading data', e);
  }
};
export const removeData = async (key:string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error('Error removing data', e);
    }
};
export const checkExists = async (key:string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value !== null;
    } catch (e) {
        console.error('Error checking data', e);
        return false;
    }
};

export const addToArrayData = async (key:string,newItem:any) => {
    try {
        const existingData = await getData(key);
        let dataArray = existingData ? existingData : [];
        dataArray.push(newItem);
        await storeData(key, JSON.stringify(dataArray));
    }
    catch (e) {
        console.error('Error adding to array data', e);
    }
};
