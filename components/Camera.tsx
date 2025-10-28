import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { addToArrayData, storeData } from './ManageStorage';
import { router } from 'expo-router';
import { useNavigation } from 'expo-router';
import { getRandomId } from './utils';
interface CameraComponentProps {
  cameraMode: 'photo' | 'video';
  setCameraMode: (mode: 'photo' | 'video') => void;
}

export default function CameraComponent({ cameraMode, setCameraMode }: CameraComponentProps) {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const cameraRef = useRef<any>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const navigation = useNavigation();

  // Check if permissions are loading
  if (!cameraPermission) {
    return <View />;
  }

  // Check if camera permission is granted
  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to use the camera
        </Text>
        <TouchableOpacity onPress={requestCameraPermission} style={styles.button}>
          <Text style={styles.text}>Grant Camera Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
        console.log('Picture taken:', photo.uri);
        await addToArrayData("current-stickers",{"uri":photo.uri,"id":getRandomId()});
        navigation.navigate("CanvasPage");
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture. Please try again.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        
        enableTorch={false}
      />
      <View style={{ position: 'absolute', bottom: '15%', left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
          <TouchableOpacity
            style={{ padding: 10, backgroundColor: cameraMode === 'video' ? 'blue' : '', borderRadius: 10 }}
            onPress={() => setCameraMode('video')}
          >
            <Text style={{ color: 'white' }}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 10, backgroundColor: cameraMode === 'photo' ? 'blue' : '', borderRadius: 10 }}
            onPress={() => setCameraMode('photo')}
          >
            <Text style={{ color: 'white' }}>Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ position: 'absolute', bottom: '5%', left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
          <TouchableOpacity
            onPress={takePicture}
            style={{ borderRadius: 100, backgroundColor: 'black', width: 45, height: 45, justifyContent: 'center', alignItems: 'center' }}
          >
            <View style={{ borderRadius: 100, backgroundColor: 'white', width: 35, height: 35 }} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
            style={styles.button}
          >
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    padding: 20,
  },
});