import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera, Button, ImgBox, ErrorTag } from "./components";
import { Switch, Placeholder, MaskPicker, Connection } from "./components";
import { convertImportedImageToBase64, downloadImage } from "./util/img";
import { SocketContext } from "./api/socket";
import { runFaceDetection } from "./face-recognition";
import type { Socket } from "socket.io-client";

const masks = import.meta.glob("../public/masks/*");

function App() {
   const socket = useContext<Socket>(SocketContext);
   const webcamRef = useRef<Webcam>(null);
   const [isConnected, setIsConnected] = useState<boolean>(false);
   const [imgError, setImageError] = useState<string | null>(null);
   const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
   const [imgSrc, setImgSrc] = useState<string | null>(null);
   const [maskSrc, setMaskSrc] = useState<string | null>(null);

   const captureButtonDisabled =
      Boolean(!maskSrc) ||
      Boolean(imgError) ||
      !isCaptureEnable ||
      !isConnected;

   const sendMessage = useCallback(
      async (imageSrc: string) => {
         try {
            const faceBoxList = await runFaceDetection(webcamRef);

            if (maskSrc && imageSrc) {
               const maskImg = await convertImportedImageToBase64(maskSrc);
               socket.emit("send_img", {
                  captureDataURL: imageSrc,
                  maskDataURL: maskImg,
                  faceBoxList: faceBoxList,
               });
            }
         } catch (error) {
            console.error("Error while sending message:", error);
            setImageError("Failed to process the image.");
         }
      },
      [webcamRef, maskSrc, socket]
   );

   const captureImgHandler = useCallback(() => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
         sendMessage(imageSrc);
      }
   }, [webcamRef, sendMessage]);

   const downloadImageHandler = useCallback(() => {
      if (imgSrc) downloadImage(imgSrc);
   }, [imgSrc]);

   useEffect(() => {
      function imgSetter({ captureDataURL }: { captureDataURL: string }) {
         setImgSrc(captureDataURL);
      }
      function imgErrorSetter({ error }: { error: string }) {
         setImageError(error);
      }

      socket.on("receive_img", imgSetter); // TODO: move evt names to const

      socket.on("receive_img_error", imgErrorSetter);
      return () => {
         socket.off("receive_img", imgSetter);
         socket.off("receive_img_error", imgErrorSetter);
      };
   }, [socket]);

   useEffect(() => {
      function onConnect() {
         setIsConnected(true);
      }

      function onDisconnect() {
         setIsConnected(false);
      }
      socket.on("connect", onConnect);
      socket.on("disconnect", onDisconnect);

      return () => {
         socket.off("connect", onConnect);
         socket.off("disconnect", onDisconnect);
      };
   }, [socket]);

   return (
      <>
         <Connection isConnected={isConnected} />
         <div className="h-screen w-screen flex items-center justify-end gap-40">
            <div className="h-screen w-[25vw] p-2 gap-12 flex flex-col items-center justify-center">
               <Switch
                  label="Camera"
                  onChange={setCaptureEnable}
                  value={isCaptureEnable}
               />
               <ErrorTag errorMessage={imgError} />
               <MaskPicker
                  maskList={Object.values(masks)}
                  onPick={setMaskSrc}
                  value={maskSrc}
               />
               <Button
                  onClick={captureImgHandler}
                  disabled={captureButtonDisabled}
               >
                  Capture and add mask
               </Button>
               <Button onClick={downloadImageHandler} disabled={!imgSrc}>
                  Save image
               </Button>
            </div>

            <div className="w-[50vw] flex flex-col gap-6">
               <ImgBox>
                  {isCaptureEnable ? (
                     <Camera cameraRef={webcamRef} />
                  ) : (
                     <Placeholder label="Turn on the camera" />
                  )}
               </ImgBox>

               <ImgBox>
                  {imgSrc ? (
                     <img src={imgSrc} />
                  ) : (
                     <Placeholder
                        color="green-600"
                        label="Masked photo will appear here"
                     />
                  )}
               </ImgBox>
            </div>
         </div>
      </>
   );
}

export default App;
