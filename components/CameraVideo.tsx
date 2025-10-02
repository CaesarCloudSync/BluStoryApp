import React, { useState, useRef } from 'react';
import { View, StyleSheet, Button, Dimensions, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import DrawingCanvas from '@/components/DrawingCanvas';
import Controls from '@/components/Controls';
import * as ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from 'react';
import Camera from '@/components/Camera';
import VideoCamera from '@/components/VideoCamera';


export default function CameraVideo() {
  const [cameraMode, setCameraMode] = useState<'photo' | 'video' | null>("photo");

  return (
    <View style={styles.container}>
      {cameraMode === 'photo' && <Camera setCameraMode={setCameraMode} cameraMode={cameraMode}  />}
      {cameraMode === 'video' && <VideoCamera setCameraMode={setCameraMode} cameraMode={cameraMode} />}


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});