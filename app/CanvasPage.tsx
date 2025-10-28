import React, { useState, useRef } from 'react';
import { View, StyleSheet, Button, Dimensions, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { z } from 'zod';
import DrawingCanvas from '@/components/DrawingCanvas';
import Controls from '@/components/Controls';
import * as ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from 'react';
import { getData, removeData } from '@/components/ManageStorage';
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { getRandomId } from '@/components/utils';
import { persistFrame } from '@/utils/PersistFrame';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CurrentFrameScheme, FrameScheme } from '@/interfaces/Frames';
export interface PathItem {
  path: string;
  color: string;
  width: number;
}



const { width, height } = Dimensions.get('window');

export default function CanvasPage() {
  const navigation = useNavigation();
  const [backgroundImage, setImage] = useState<string | null>(null);
  const [brushColor, setBrushColor] = useState<string>('red');
  const [brushWidth, setBrushWidth] = useState<number>(5);
  const [paths, setPaths] = useState<PathItem[]>([]);
  const [stickers, setStickers] = useState<any[]>([]);
  const [stickerPickerVisible, setStickerPickerVisible] = useState<boolean>(false);
  const captureRef = useRef<View>(null);
  const [isPainting, setIsPainting] = useState<boolean>(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //console.log(permissionResult);
    if (!permissionResult.granted) {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
   
      setStickers([...stickers,{uri:result.assets[0].uri,id:getRandomId()} ]);
    }
  };
    const cleanPhotoSticker = async () => { 
    await removeData("current-stickers");
  } 
  const clearCanvas =async () => {
    setPaths([]);
    setStickers([]);
    await cleanPhotoSticker();
  }

  const addSticker = (stickerUri: string) => {
    setStickers([...stickers, {
      uri: stickerUri,
      x: width / 2,
      y: height / 2,
      scale: 1,
    }]);
    setStickerPickerVisible(false);
  };

  const removeSticker = () => {
    setStickers((prev) => prev.slice(0, -1));
  }

  const saveImage = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant permission to save images.');
      return;
    }

    try {
      const uri = await ViewShot.captureRef(captureRef, {
        format: 'png',
        quality: 1,
      });
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Success', 'Image saved to gallery!');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save image.');
    }
  };

  const addCurrentPhotoSticker = async () => { }

  useEffect(() => {
    // Hide the Android navigation bar
    NavigationBar.setVisibilityAsync("hidden");
    cleanPhotoSticker();
    // Optional: set behavior so it stays hidden until user swipes
    NavigationBar.setBehaviorAsync("overlay-swipe");
  }, []);
    useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const stored = await getData("current-stickers");
        console.log("Loaded data:", stored);
        if (stored){
          setStickers([...stickers, ...stored ]);
        }
        
      };
      loadData();
    }, [])
  );

  const addFrame = async () => {
    // Logic to add a new frame
      const uri = await ViewShot.captureRef(captureRef, {
        format: 'png',
        quality: 1,
      });
      const newUri = await persistFrame(uri);
      console.log("Captured frame URI:", newUri);
      const current_frame_data = await getData('current_frame');
      console.log("Current frame data fetched:", current_frame_data.frameId);
      const current_frame = CurrentFrameScheme.parse(current_frame_data);
      console.log("Current frame data:", current_frame);
      
      const frame_data: z.infer<typeof FrameScheme> = {"frameId":current_frame.frameId,"projectId":current_frame.projectId,"canvasUri":newUri,"thumbnailUri":""}
           
      await AsyncStorage.setItem(`frame_${current_frame.projectId}_${current_frame.frameId}`, JSON.stringify(frame_data));
      console.log("Frame data saved:", frame_data);
      navigation.navigate('MovieEditorPage');


    //navigation.navigate('MovieEditorPage');
    // You can implement navigation to a new frame creation page here
  }

  return (
    <View style={styles.container}>
      
        <DrawingCanvas
          backgroundUri={backgroundImage}
          brushColor={brushColor}
          brushWidth={brushWidth}
          paths={paths}
          setPaths={setPaths}
          stickers={stickers}
          captureRef={captureRef}
          isPainting={isPainting}
          setIsPainting={setIsPainting}
          clearCanvas={clearCanvas}
        />
      
      
        <Controls
          brushColor={brushColor}
          setBrushColor={setBrushColor}
          brushWidth={brushWidth}
          setBrushWidth={setBrushWidth}
          setPaths={setPaths}
          setStickerPickerVisible={setStickerPickerVisible}
          stickerPickerVisible={stickerPickerVisible}
          addSticker={addSticker}
          addFrame={addFrame}
          onSave={saveImage}
          isPainting={isPainting}
          setIsPainting={setIsPainting}
          removeSticker={removeSticker}
          clearCanvas={clearCanvas}
          pickImage={pickImage}
        />
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});