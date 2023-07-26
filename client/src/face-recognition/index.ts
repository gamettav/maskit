import "@tensorflow/tfjs";
import { load } from "@tensorflow-models/blazeface";
import type {
   BlazeFaceModel,
   NormalizedFace,
} from "@tensorflow-models/blazeface";
import Webcam from "react-webcam";
import type { RefObject } from "react";

export const runFaceDetection = async (webcamRef: RefObject<Webcam>) => {
   try {
      const model = await load();

      if (model) {
         const detectedFaces = await detect(model, webcamRef);
         if (detectedFaces) {
            return calcFaceBox(detectedFaces);
         }
      }
   } catch (error) {
      console.error("Error loading the face detection model:", error);
      throw error;
   }
};

const detect = async (model: BlazeFaceModel, webcamRef: RefObject<Webcam>) => {
   try {
      if (
         webcamRef.current &&
         webcamRef.current.video &&
         webcamRef.current.video.readyState === 4
      ) {
         const video = webcamRef.current.video;

         const prediction = await model.estimateFaces(video, false);
         return prediction;
      }
   } catch (error) {
      console.error("Error detecting faces:", error);
      throw error;
   }
};

const calcFaceBox = (faceBoxList: NormalizedFace[]) => {
   try {
      const SCALE_DOWN = 0.7;
      if (faceBoxList.length > 0) {
         return faceBoxList.map((faceBox) => {
            const start = faceBox.topLeft as [number, number];
            const end = faceBox.bottomRight as [number, number];
            const size = [end[0] - start[0], end[1] - start[1]];

            return {
               x: start[0],
               y: start[1],
               width: size[0] * SCALE_DOWN,
               height: size[1] * SCALE_DOWN,
            };
         });
      }
   } catch (error) {
      console.error("Error calculating face boxes:", error);
      throw error;
   }
};
