import "@tensorflow/tfjs-node";

import * as faceapi from "face-api.js";
import canvas from "canvas";

const { Canvas, Image, ImageData }: any = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

export { canvas };
