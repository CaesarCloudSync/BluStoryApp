import * as FileSystem from 'expo-file-system/legacy';
import { getFilenameFromUri } from './Filenameutil';

export const persistFrame = async (cacheUri: string) => {
  const newUri = `${FileSystem.documentDirectory}${getFilenameFromUri(cacheUri)}`;

  await FileSystem.copyAsync({
    from: cacheUri,
    to: newUri,
  });

  return newUri;
};
