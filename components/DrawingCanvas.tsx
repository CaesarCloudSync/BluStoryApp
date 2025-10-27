import React, { useRef, useEffect } from "react";
import { StyleSheet, Dimensions, PanResponder, View } from "react-native";
import { Canvas, Path, useImage, Image as SkiaImage } from "@shopify/react-native-skia";
import { GestureHandlerRootView, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle } from "react-native-reanimated";
import { Skia } from "@shopify/react-native-skia";
import {  useState } from "react";
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system"; // if you're using Expo
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { CurrentFrameScheme, FrameScheme } from "@/interfaces/Frames";
import { getData } from "./ManageStorage";
import { loadLocalFrame } from "@/utils/SkiaUtils/LoadFrame";
import type { SkImage } from "@shopify/react-native-skia";


const { width, height } = Dimensions.get("window");

export interface PathItem {
  path: string;
  color: string;
  width: number;
}

export interface Sticker {
  id: string;
  uri: string;
}

interface Props {
  backgroundUri: string;
  brushColor: string;
  brushWidth: number;
  paths: PathItem[];
  setPaths: React.Dispatch<React.SetStateAction<PathItem[]>>;
  stickers: Sticker[];
  captureRef: React.RefObject<View>;
  isPainting: boolean;
  setIsPainting: (painting: boolean) => void;
  clearCanvas: () => void;
}

export default function DrawingCanvas({
  backgroundUri,
  brushColor,
  brushWidth,
  paths,
  setPaths,
  stickers,
  captureRef,
  isPainting,
  clearCanvas
}: Props) {
  const [bgImage, setBgImage] = useState<SkImage | null>(null);
  const backgroundimg = useImage(backgroundUri);
  const currentPath = useRef<string | null>(null);

  const canvasRef = useRef<View>(null);
  const canvasOffset = useRef({ x: 0, y: 0 });

  // Measure canvas position for correct coordinates
  useEffect(() => {
    canvasRef.current?.measure((x, y, w, h, pageX, pageY) => {
      canvasOffset.current = { x: pageX, y: pageY };
    });
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => isPainting,
    onPanResponderGrant: (evt) => {
      const { pageX, pageY } = evt.nativeEvent;
      const x = pageX - canvasOffset.current.x;
      const y = pageY - canvasOffset.current.y;
      currentPath.current = `M ${x} ${y}`;
      setPaths([...paths]);
    },
    onPanResponderMove: (evt) => {
      const { pageX, pageY } = evt.nativeEvent;
      const x = pageX - canvasOffset.current.x;
      const y = pageY - canvasOffset.current.y;
      if (currentPath.current) {
        currentPath.current += ` L ${x} ${y}`;
        setPaths([...paths]);
      }
    },
    onPanResponderRelease: () => {
      if (currentPath.current) {
        setPaths([...paths, { path: currentPath.current, color: brushColor, width: brushWidth }]);
        currentPath.current = null;
      }
    },
  });
  const get_current_frame = async () => {
    clearCanvas();
    console.log('Fetching current frame data...');
    // Your logic to get the current frame
    const current_frame_unparsed = await getData('current_frame');
    const current_frame_metadata = CurrentFrameScheme.parse(current_frame_unparsed);
    const current_frame_data = await getData(`frame_${current_frame_metadata.projectId}_${current_frame_metadata.frameId}`);
    const current_frame = FrameScheme.parse(current_frame_data); // Validate frame data
    console.log('Current frame data:', current_frame);
    await loadLocalFrame(current_frame.canvasUri,setBgImage);


  }
  useFocusEffect(
  useCallback(() => {
    console.log('Screen is focused');

    // Example: fetch data or start animation
    get_current_frame();

    // Cleanup when screen loses focus
    return () => {
      console.log('Screen is unfocused');
    };
  }, [])
);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View ref={captureRef} collapsable={false} style={styles.captureView}>
        <View ref={canvasRef} style={styles.canvasContainer} {...panResponder.panHandlers}>
          {/* Skia Canvas */}
          <Canvas style={styles.canvas}>
              {bgImage && (
              <SkiaImage
                    image={bgImage}
                    x={0} // Center horizontally
                    y={0} // Center vertically
                    width={width}
                    height={height}
                    fit="cover"
                  />
            )}


            {paths.map((p, idx) => (
              <Path key={idx} path={p.path} color={p.color} style="stroke" strokeWidth={p.width} />
            ))}
            {currentPath.current && <Path path={currentPath.current} color={brushColor} style="stroke" strokeWidth={brushWidth} />}
          </Canvas>

          {/* Stickers */}
          {stickers.map((sticker) => (
            <StickerItem key={sticker.id} uri={sticker.uri} isPainting={isPainting} />
          ))}
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

/**
 * Sticker overlay with drag + pinch-to-scale + rotation gestures
 */
function StickerItem({ uri, isPainting }: { uri: string; isPainting: boolean }) {
  const img = useImage(uri);

  const translateX = useSharedValue(width / 2 - 50);
  const translateY = useSharedValue(height / 2 - 50);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const scale = useSharedValue(1);
  const startScale = useSharedValue(1);

  const rotation = useSharedValue(0); // radians
  const startRotation = useSharedValue(0);

  // Pan gesture
  const pan = Gesture.Pan()
    .onBegin(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
    })
    .onUpdate((e) => {
      translateX.value = startX.value + e.translationX;
      translateY.value = startY.value + e.translationY;
    });

  // Pinch gesture for scaling
  const pinch = Gesture.Pinch()
    .onBegin(() => { startScale.value = scale.value; })
    .onUpdate((e) => { scale.value = startScale.value * e.scale; });

  // Rotation gesture
  const rotationGesture = Gesture.Rotation()
    .onBegin(() => { startRotation.value = rotation.value; })
    .onUpdate((e) => { rotation.value = startRotation.value + e.rotation; });

  // Combine pinch + rotation simultaneously, then simultaneous with pan
  const scaleRotate = Gesture.Simultaneous(pinch, rotationGesture);
  const composed = Gesture.Simultaneous(pan, scaleRotate);

  const style = useAnimatedStyle(() => ({
    position: "absolute",
    left: translateX.value,
    top: translateY.value,
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    transform: [
      { scale: scale.value },
      { rotateZ: `${rotation.value}rad` },
    ],
  }));

  if (!img) return null;

  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={style} pointerEvents={isPainting ? "box-none" : "auto"}>
        <Canvas style={{ width: 100, height: 100 }}>
          <SkiaImage image={img} x={0} y={0} width={100} height={100} />
        </Canvas>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  captureView: { flex: 1, position: "relative",backgroundColor: 'white' },
  canvasContainer: { flex: 1 },
  canvas: { flex: 1 },
});
