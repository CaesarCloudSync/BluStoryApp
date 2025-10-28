import {StyleSheet } from 'react-native';
export const movieEditorStyles = StyleSheet.create({
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
    width: 65,
    height: 65,
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
    width: 75,
    height: 55,
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