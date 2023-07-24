import Jimp from "jimp";
import { base64PrefixRegExp } from "../common/constants.js";

const resizeMask = (image: Jimp, mask: Jimp) => {
   const SCALE_DOWN = 0.5;
   const [imgWidth, imgHeight] = [image.getWidth(), image.getHeight()];
   const [maskWidth, maskHeight] = [mask.getWidth(), mask.getHeight()];
   const newMask =
      maskWidth >= imgWidth || maskHeight <= imgHeight
         ? mask.resize(imgWidth * SCALE_DOWN, imgHeight * SCALE_DOWN)
         : mask;
   return newMask;
};

export const randMaskPositionAndSize = (image: Jimp, mask: Jimp) => {
   const resizedMask = resizeMask(image, mask);
   const [imgWidth, imgHeight] = [image.getWidth(), image.getHeight()];
   const [maskWidth, maskHeight] = [
      resizedMask.getWidth(),
      resizedMask.getHeight(),
   ];
   const randCoord = (n: number) => Math.floor(Math.random() * n);

   return {
      width: maskWidth,
      height: maskHeight,
      x: randCoord(imgWidth - maskWidth),
      y: randCoord(imgHeight - maskHeight),
   };
};

export const bufferImgFromBase64 = async (dataUrl: string) => {
   const imgSrc =
      dataUrl.indexOf("base64") != -1
         ? dataUrl.replace(base64PrefixRegExp, "")
         : dataUrl;
   return Buffer.from(imgSrc, "base64");
};
