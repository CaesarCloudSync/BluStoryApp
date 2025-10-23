import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather, AntDesign, MaterialCommunityIcons, MaterialIcons, Entypo, Ionicons } from '@expo/vector-icons';
import BottomBar from '@/components/BottomBar';
const MovieEditorPage = () => {
  const renderFrameThumbnail = (isCurrent = false) => (
    <TouchableOpacity
      style={[
        movieEditorStyles.thumbnail,
        isCurrent && movieEditorStyles.currentThumbnail,
      ]}
    >
      {isCurrent ? (
        <Image
          //source={require('../../assets/lblu-club-logo.png')} // Replace with an actual image
          style={movieEditorStyles.thumbnailImage}
        />
      ) : (
        <View style={movieEditorStyles.emptyThumbnail} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={movieEditorStyles.container}>
      <View style={movieEditorStyles.card}>
        <View style={movieEditorStyles.topToolbar}>
          <TouchableOpacity style={movieEditorStyles.topToolbarButton}>
            <Feather name="edit" size={24} color="black" />
            <Text style={movieEditorStyles.topToolbarButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={movieEditorStyles.topToolbarButton}>
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
          {renderFrameThumbnail(true)} {/* Current frame */}
          {renderFrameThumbnail()}
          {renderFrameThumbnail()}
          {renderFrameThumbnail()}
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

const movieEditorStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAEA', // Light grey background
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    width: '95%',
    marginTop: 30, // Space from top
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 20,
  },
  topToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  topToolbarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  topToolbarButtonText: {
    marginLeft: 5,
    fontSize: 16,
  },
  timeline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 15,
    height: 70, // Fixed height for timeline
  },
  movieTitleThumbnail: {
    backgroundColor: '#F0F0F0',
    width: 80,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    marginRight: 5,
  },
  movieTitleThumbnailText: {
    fontSize: 8,
    textAlign: 'center',
    color: '#555',
  },
  thumbnail: {
    width: 80,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCC',
    marginHorizontal: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentThumbnail: {
    borderColor: '#F7D64B', // Yellow border for current frame
    borderWidth: 3,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  emptyThumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E0E0E0',
  },
  timelineNavButton: {
    padding: 8,
  },
  mainDisplay: {
    width: '100%',
    aspectRatio: 16 / 9, // Common movie aspect ratio
    backgroundColor: '#000', // Black background for movie screen
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainDisplayImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute', // To allow overlaying the "Tap to take photo" button
  },
  tapToTakePhotoButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.7)', // Semi-transparent white
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F7D64B', // Yellow border
  },
  tapToTakePhotoText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  bottomEditorToolbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  editorToolbarButton: {
    padding: 8,
  },
  projectName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20, // Space above bottom bar
  },
});

export default MovieEditorPage;