import { Frame } from "@/interfaces/Frames";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import { CurrentFrameScheme } from "@/interfaces/Frames";
import { CurrentFrame } from "@/interfaces/Frames";
import { movieEditorStyles } from "@/styles/MovieEditorPage";
export const FrameThumbnail = ({ frame,currentFrame }: { frame?: Frame,currentFrame:CurrentFrame | null }) => {
const navigation = useNavigation();
const navigateToFrame = async () => {
    if (frame) {
    await AsyncStorage.setItem('current_frame', JSON.stringify( { frameId: frame.frameId, projectId: frame.projectId }));
    navigation.navigate('CanvasPage');
    }
}
return (
        <TouchableOpacity
        onPress={() =>{navigateToFrame()}}
    style={[
    movieEditorStyles.thumbnail,
    currentFrame?.frameId === frame?.frameId && movieEditorStyles.currentThumbnail,
    ]}
>
    {currentFrame?.frameId === frame?.frameId ? (
    <Image
        //source={require('../../assets/lblu-club-logo.png')} // Replace with an actual image
        style={movieEditorStyles.thumbnailImage}
    />
    ) : (
    <View style={movieEditorStyles.emptyThumbnail} />
    )}
</TouchableOpacity>
)
};