import express, { Application } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import jimp from "jimp";
import { detectFacePosition } from "./face-recognition/index.js";
import { bufferImgFromBase64, randMaskPositionAndSize } from "./util/img.js";
import { base64PrefixStr } from "./common/constants.js";
import { CLIENT_URL, PORT } from "./common/config.js";

const app: Application = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
   cors: {
      origin: CLIENT_URL,
      methods: ["GET", "POST"],
   },
});

const maskImg = async (imgSrc: string, maskSrc: string) => {
   const bufferdImg = await bufferImgFromBase64(imgSrc);
   const bufferdMask = await bufferImgFromBase64(maskSrc);
   if (bufferdImg && bufferdMask) {
      const image = await jimp.read(bufferdImg);
      const mask = await jimp.read(bufferdMask);
      const faceBox = await detectFacePosition(imgSrc);

      const { x, y, width, height } =
         faceBox || randMaskPositionAndSize(image, mask);

      const maskResized = mask.resize(width, height);

      const compositeImg = image.composite(maskResized, x, y);
      const finalImage = await compositeImg.getBufferAsync("image/png");
      return finalImage.toString("base64");
   }
};

io.on("connection", (socket) => {
   console.log(`Connected: ${socket.id}`);

   socket.on("send_img", async (data) => {
      const maskedImg = await maskImg(data.img, data.mask);
      if (maskedImg)
         socket.emit("receive_img", {
            img: base64PrefixStr + maskedImg,
         });
   });
});

server.listen(PORT, () => {
   console.log(`Server listening on ${PORT}`);
});
