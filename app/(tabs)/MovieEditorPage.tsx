import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather, AntDesign, MaterialCommunityIcons, MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
import BottomBar from '@/components/BottomBar';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CurrentProject } from '@/interfaces/Projects';
import { CurrentFrame, CurrentFrameScheme, Frame, frame_key } from '@/interfaces/Frames';
import { multiget } from '@/utils/AsyncStorageCrud/MultiGetData';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { getData } from '@/components/ManageStorage';
import { movieEditorStyles } from '@/styles/MovieEditorPage';
import { z } from 'zod';
import { FrameThumbnail } from '@/components/MovieEditorPage/FrameThumbnail';
const MovieEditorPage = () => {
  const navigation = useNavigation();
  const [frames, setFrames] = React.useState<Frame[]>([]);
  const [currentFrame, setCurrentFrame] = React.useState<CurrentFrame | null>(null);

  
  const createandNavigateToCanvasPage = async () => {
    const current_project = await AsyncStorage.getItem('current_project');
    const current_project_parsed:CurrentProject = current_project ? JSON.parse(current_project) : {projectId:-1};
    console.log("Current project:", current_project_parsed.projectId);
    if (current_project_parsed.projectId !== -1){
        const frame_Id = Date.now();
        let frame_data:Frame = {"frameId":frame_Id,"projectId":current_project_parsed.projectId,"canvasUri":"","thumbnailUri":""}
        await AsyncStorage.setItem(`frame_${current_project_parsed.projectId}_${frame_Id}`, JSON.stringify(frame_data));
        await AsyncStorage.setItem('current_frame', JSON.stringify( { frameId: frame_Id, projectId: current_project_parsed.projectId }));
        navigation.navigate('CanvasPage');
    }
    else{
        console.log("No current project found");
    }

  }
  const getallframes = async () => {
    const frames = await multiget(frame_key);
    const current_frame_data = await getData('current_frame');
    const current_frame = CurrentFrameScheme.parse(current_frame_data);
    setCurrentFrame(current_frame);
    setFrames(frames);
    //console.log("All frames:", frames);
  }
  useFocusEffect(
  useCallback(() => {
    console.log('Screen is focused');

    // Example: fetch data or start animation
    getallframes();

    // Cleanup when screen loses focus
    return () => {
      console.log('Screen is unfocused');
    };
  }, [])
);


  return (
    <View style={movieEditorStyles.container}>
      <View style={movieEditorStyles.card}>
        <View style={movieEditorStyles.topToolbar}>
          <TouchableOpacity style={movieEditorStyles.topToolbarButton}>
            <Feather name="edit" size={24} color="black" />
            <Text style={movieEditorStyles.topToolbarButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>{createandNavigateToCanvasPage()}} style={movieEditorStyles.topToolbarButton}>
            <AntDesign name="plus-circle" size={24} color="black" />
            <Text style={movieEditorStyles.topToolbarButtonText}>Add frame</Text>
          </TouchableOpacity>
          <TouchableOpacity style={movieEditorStyles.topToolbarButton}>
            <AntDesign name="minus-circle" size={24} color="black" />
            <Text style={movieEditorStyles.topToolbarButtonText}>Delete frame</Text>
          </TouchableOpacity>
        </View>

        <View style={movieEditorStyles.timeline}>
          <View style={movieEditorStyles.movieTitleThumbnail}>
            <Text style={movieEditorStyles.movieTitleThumbnailText}>
              Add your movie title here Directed by (add name here)
            </Text>
          </View>
          {frames.length !== 0 &&  
          frames.map((frame,index) =>(
            <FrameThumbnail key={index} frame={frame} currentFrame={currentFrame} />))
          }
            
            
         

  


          <TouchableOpacity style={movieEditorStyles.timelineNavButton}>
            <Ionicons name="play-skip-forward" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={movieEditorStyles.mainDisplay}>
          <Image
            //source={require('../../assets/lblu-club-logo.png')} // Replace with an actual image
            style={movieEditorStyles.mainDisplayImage}
          />
          <TouchableOpacity style={movieEditorStyles.tapToTakePhotoButton}>
            <Text style={movieEditorStyles.tapToTakePhotoText}>Tap here to take photo</Text>
          </TouchableOpacity>
        </View>

        <View style={movieEditorStyles.bottomEditorToolbar}>
          <TouchableOpacity style={movieEditorStyles.editorToolbarButton}>
            <Feather name="edit" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={movieEditorStyles.editorToolbarButton}>
            <AntDesign name="reload" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={movieEditorStyles.editorToolbarButton}>
            <MaterialIcons name="undo" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={movieEditorStyles.editorToolbarButton}>
            <MaterialCommunityIcons name="music-note" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={movieEditorStyles.editorToolbarButton}>
            <AntDesign name="minus" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={movieEditorStyles.editorToolbarButton}>
            <AntDesign name="plus" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={movieEditorStyles.editorToolbarButton}>
            <Entypo name="controller-play" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={movieEditorStyles.editorToolbarButton}>
            <Feather name="save" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={movieEditorStyles.projectName}>Project name</Text>
      <BottomBar />
    </View>
  );
};


export default MovieEditorPage;