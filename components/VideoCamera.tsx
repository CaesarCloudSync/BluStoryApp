import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions, useMicrophonePermissions, CameraType } from 'expo-camera';

interface VideoComponentProps {
  cameraMode: 'photo' | 'video';
  setCameraMode: (mode: 'photo' | 'video') => void;
}

export default function VideoComponent({ cameraMode, setCameraMode }: VideoComponentProps) {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const cameraRef = useRef<any>(null);
  const [facing, setFacing] = useState<CameraType>('back');
  const [isRecording, setIsRecording] = useState(false);

  // Check if permissions are loading
  if (!cameraPermission || !microphonePermission) {
    return <View />;
  }

  // Check if both camera and microphone permissions are granted
  if (!cameraPermission.granted || !microphonePermission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to use the camera and microphone
        </Text>
        {!cameraPermission.granted && (
          <TouchableOpacity onPress={requestCameraPermission} style={styles.button}>
            <Text style={styles.text}>Grant Camera Permission</Text>
          </TouchableOpacity>
        )}
        {!microphonePermission.granted && (
          <TouchableOpacity onPress={requestMicrophonePermission} style={styles.button}>
            <Text style={styles.text}>Grant Microphone Permission</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  const startRecording = async () => {
    if (cameraRef.current && !isRecording) {
      try {
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync({
          quality: '720p',
          maxDuration: 30,
        });
        console.log('Video URI:', video.uri);
      } catch (error) {
        console.error('Recording error:', error);
        Alert.alert('Error', 'Failed to record video. Please try again.');
      } finally {
        setIsRecording(false);
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current && isRecording) {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        await cameraRef.current.stopRecording();
        setIsRecording(false);
      } catch (error) {
        console.error('Stop recording error:', error);
        Alert.alert('Error', 'Failed to stop recording. Please try again.');
        setIsRecording(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        mode="video"
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
            onPress={isRecording ? stopRecording : startRecording}
            style={[styles.button, isRecording ? styles.recordingButton : null]}
            disabled={!cameraPermission.granted || !microphonePermission.granted}
          >
            <Text style={styles.text}>{isRecording ? 'Stop Recording' : 'Record Video'}</Text>
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
  recordingButton: {
    backgroundColor: 'red',
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