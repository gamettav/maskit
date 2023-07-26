import Jimp from "jimp";
import { base64PrefixRegExp } from "../common/constants.js";
import type { FaceBox } from "../common/types.js";
import { getErrorMessage } from "./error.js";

const resizeMask = (image: Jimp, mask: Jimp): Jimp => {
    try {
        const SCALE_DOWN = 0.5;
        const [imgWidth, imgHeight] = [image.getWidth(), image.getHeight()];
        const [maskWidth, maskHeight] = [mask.getWidth(), mask.getHeight()];
        const newMask =
            maskWidth >= imgWidth || maskHeight <= imgHeight
                ? mask.resize(imgWidth * SCALE_DOWN, imgHeight * SCALE_DOWN)
                : mask;
        return newMask;
    } catch (error) {
        console.error(
            "Error while resizing the mask image:",
            getErrorMessage(error)
        );
        throw error;
    }
};

export const randMaskPositionAndSize = (image: Jimp, mask: Jimp): FaceBox => {
    try {
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
    } catch (error) {
        console.error(
            "Error while generating random mask position and size:",
            getErrorMessage(error)
        );
        throw error;
    }
};

export const bufferImgFromBase64 = async (dataUrl: string): Promise<Buffer> => {
    try {
        const imgSrc =
            dataUrl.indexOf("base64") !== -1
                ? dataUrl.replace(base64PrefixRegExp, "")
                : dataUrl;
        return Buffer.from(imgSrc, "base64");
    } catch (error) {
        console.error(
            "Error while converting image dataURL to Buffer:",
            getErrorMessage(error)
        );
        throw error;
    }
};
