import { z } from "zod";

export interface Frame {
    frameId: number;
    projectId: number;
    canvasUri: string;
    thumbnailUri: string;
}

export interface CurrentFrame {
    frameId: number;
    projectId: number;
}
export const CurrentFrameScheme = z.object({
    frameId: z.number(),
    projectId: z.number(),
});
export const frame_key = 'frame_';
// Define a schema (like a Pydantic model)
export const FrameScheme = z.object({
    frameId: z.number(),
    projectId: z.number(),
    canvasUri: z.string(),
    thumbnailUri: z.string(),
});

