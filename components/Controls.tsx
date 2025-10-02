import React from 'react';
import { View, Button, StyleSheet, Slider } from 'react-native';
import type { PathItem } from '../App';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { TouchableOpacity } from 'react-native';
import { router } from "expo-router";


interface Props {
  brushColor: string;
  setBrushColor: (color: string) => void;
  brushWidth: number;
  setBrushWidth: (width: number) => void;
  setPaths: React.Dispatch<React.SetStateAction<PathItem[]>>;
  setStickerPickerVisible: (visible: boolean) => void;
  stickerPickerVisible: boolean;
  addSticker: (uri: string) => void;
  onSave: () => void;
  isPainting: boolean;
  setIsPainting: (painting: boolean) => void;
    removeSticker: () => void;
    addFrame: () => void;
    pickImage: () => void;
    clearCanvas: () => void;
}

export default function Controls({
  brushColor,
  setBrushColor,
  brushWidth,
  setBrushWidth,
  setPaths,
  setStickerPickerVisible,
  stickerPickerVisible,
  addSticker,
  onSave,
  isPainting,
    setIsPainting,
    removeSticker,
    addFrame,
    clearCanvas,
    pickImage,

}: Props) {
  const colors = ['red', 'blue', 'green', 'black'];
  const storedstickers = [
    'https://picsum.photos/200/300', // Replace with actual sticker URLs or local assets
    'https://picsum.photos/200/300',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.colorContainer}>
        {colors.map((color) => (
          <Button
            key={color}
            title={color}
            color={color}
            onPress={() => setBrushColor(color)}
          />
        ))}
      </View>
      <View style={styles.sliderContainer}>

      </View>
      <View style={styles.buttonContainer}> 
  <TouchableOpacity onPress={() => setIsPainting(!isPainting)} style={styles.iconButton}>
    {isPainting ? (
      <FontAwesome name="paint-brush" size={24} color="black" />
    ) : (
      <Octicons name="paintbrush" size={24} color="black" />
    )}
  </TouchableOpacity>

  <TouchableOpacity onPress={() => setPaths((prev) => prev.slice(0, -1))} style={styles.iconButton}>
    <FontAwesome name="undo" size={24} color="black" />
  </TouchableOpacity>

  <TouchableOpacity onPress={clearCanvas} style={styles.iconButton}>
    <AntDesign name="clear" size={24} color="black" />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => setStickerPickerVisible(true)} style={styles.iconButton}>
    <MaterialCommunityIcons name="sticker" size={24} color="black" />
  </TouchableOpacity>

  <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
    <Entypo name="images" size={24} color="black" />
  </TouchableOpacity>

  <TouchableOpacity onPress={() =>{router.push("/CameraVideoView")}} style={styles.iconButton}>
    <MaterialIcons name="add-a-photo" size={24} color="black" />
  </TouchableOpacity>

  <TouchableOpacity onPress={addFrame} style={styles.iconButton}>
    <Ionicons name="add-outline" size={24} color="black" />
  </TouchableOpacity>

  <TouchableOpacity onPress={onSave} style={styles.iconButton}>
    <FontAwesome6 name="save" size={24} color="black" />
  </TouchableOpacity>
    
      </View>
      {stickerPickerVisible && (
        <View style={styles.stickerPicker}>
          {storedstickers.map((sticker, index) => (
            <Button
              key={index}
              title={`Sticker ${index + 1}`}
              onPress={() => addSticker(sticker)}
            />
          ))}
          <Button title="Remove Stickers" onPress={() => removeSticker()} />
          <Button title="Close" onPress={() => setStickerPickerVisible(false)} />
        </View>
      )}
    </View>
  );
}
/*        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={20}
          value={brushWidth}
          onValueChange={setBrushWidth}
        /> */
const styles = StyleSheet.create({
  container: {

    backgroundColor: '#f0f0f0',
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  sliderContainer: {
    marginBottom: 10,
  },
  slider: {
    width: '100%',
  },
   iconButton: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 6,
    marginHorizontal: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  stickerPicker: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
});