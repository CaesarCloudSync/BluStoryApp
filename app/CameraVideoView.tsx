import React, { useState, useRef } from 'react';
import { View, StyleSheet, Button, Dimensions, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import DrawingCanvas from '@/components/DrawingCanvas';
import Controls from '@/components/Controls';
import * as ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from 'react';
import CameraVideo from '@/components/CameraVideo';

export default function CameraVideoView() {


  return (
    <View style={styles.container}>
      <CameraVideo />
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