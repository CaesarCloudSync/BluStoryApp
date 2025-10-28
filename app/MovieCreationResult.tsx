import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';

export default function VideoScreen() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load video URL from AsyncStorage
  useEffect(() => {
    const loadVideoUrl = async () => {
      try {
        const storedUrl = await AsyncStorage.getItem('current_video_url');
        if (storedUrl) {
          const { video_url } = JSON.parse(storedUrl);
          setVideoUrl(video_url);
        } else {
          console.warn('No video URL found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error loading video URL:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadVideoUrl();
  }, []);

  const player = useVideoPlayer(videoUrl || '', (player: any) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  if (isLoading) {
    return (
      <View style={styles.contentContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!videoUrl) {
    return (
      <View style={styles.contentContainer}>
        <Button title="No video found" onPress={() => {}} disabled />
      </View>
    );
  }

  return (
    <View style={styles.contentContainer}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
