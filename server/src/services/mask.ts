import jimp from "jimp";
import { bufferImgFromBase64, randMaskPositionAndSize } from "../util/img.js";
import { getErrorMessage } from "../util/error.js";
import type { MaskImg } from "../common/types.js";

export const maskImg = async ({
    captureDataURL,
    maskDataURL,
    faceBoxList,
}: MaskImg) => {
    try {
        const bufferdCapture = await bufferImgFromBase64(captureDataURL);
        const bufferdMask = await bufferImgFromBase64(maskDataURL);

        if (!bufferdCapture || !bufferdMask) {
            throw new Error("Failed to load image data.");
        }
        const capture = await jimp.read(bufferdCapture);
        const mask = await jimp.read(bufferdMask);
        let compositeImg = capture;

        const boxList = faceBoxList || [randMaskPositionAndSize(capture, mask)];

        boxList.forEach((box) => {
            const { x, y, width, height } = box;

            const maskResized = mask.resize(width, height);

            compositeImg = compositeImg.composite(maskResized, x, y);
        });

        const finalImage = await compositeImg.getBufferAsync("image/png");
        return finalImage.toString("base64");
    } catch (error) {
        console.error("Error while processing image:", getErrorMessage(error));
        throw error;
    }
};
