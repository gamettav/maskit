import * as faceapi from "face-api.js";
import path from "path";
import { fileURLToPath } from "url";
import {
   canvas,
   faceDetectionNet,
   faceDetectionOptions,
} from "./common/index.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const detectFacePosition = async (
   imgSrc: string
): Promise<faceapi.Box<any> | undefined> => {
   await faceDetectionNet.loadFromDisk(path.join(__dirname, "../../weights"));

   const img: any = await canvas.loadImage(imgSrc);
   const detections = await faceapi.detectAllFaces(img, faceDetectionOptions);

   const out = faceapi.createCanvasFromMedia(img) as any;
   faceapi.draw.drawDetections(out, detections);
   if (Array.isArray(detections) && detections.length) return detections[0].box;
};
