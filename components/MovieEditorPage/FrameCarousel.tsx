import React from "react";
import { ScrollView, View } from "react-native";
import { FrameThumbnail } from "./FrameThumbnail";
import { movieEditorStyles } from "@/styles/MovieEditorPage";
import { CurrentFrame, Frame } from "@/interfaces/Frames";

const FrameCarousel = ({ frames, currentFrame }: {frames:Frame[],currentFrame:CurrentFrame|null}) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center",width:305 }}>
      <ScrollView
        horizontal
       
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10, // spacing between frames
          paddingHorizontal: 10,
          
        }}
      >
        {frames.map((frame, index) => (
          <FrameThumbnail
            key={index}
            frame={frame}
            currentFrame={currentFrame}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FrameCarousel;
