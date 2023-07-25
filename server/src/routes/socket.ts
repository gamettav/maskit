import { maskImg } from "../services/mask.js";
import { base64PrefixStr } from "../common/constants.js";
import { getErrorMessage } from "../util/error.js";
import type { MaskImg } from "../common/types.js";
import type { Server, Socket } from "socket.io";

export const socketRoutes = (io: Server) => {
   io.on("connection", (socket: Socket) => {
      console.log(`Connected: ${socket.id}`);

      socket.on("send_img", async (data: MaskImg) => {
         try {
            const maskedImg = await maskImg({ ...data });
            if (maskedImg)
               socket.emit("receive_img", {
                  captureDataURL: base64PrefixStr + maskedImg,
               });
         } catch (error) {
            console.error(
               "Error processing image on socket:",
               getErrorMessage(error)
            );
            socket.emit("receive_img_error", {
               error: "Failed to process image.",
            });
         }
      });
   });

   io.on("error", (error) => {
      console.error("Socket server error:", getErrorMessage(error));
   });
};
