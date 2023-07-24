import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Camera } from "./components/Camera";
import Webcam from "react-webcam";
import { Button } from "./components/Button";
import { ImgBox } from "./components/ImgBox";
import { Switch } from "./components/Switch";
import { Placeholder } from "./components/Placeholder";
import { convertImportedImageToBase64, downloadImage } from "./util/img";
import { MaskPicker } from "./components/MaskPicker";
import { Connection } from "./components/Connection";
import { SocketContext } from "./api/socket";

const masks = import.meta.glob("../public/masks/*");

function App() {
   const webcamRef = useRef<Webcam>(null);
   const socket = useContext(SocketContext);
   const [isConnected, setIsConnected] = useState(false);
   const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
   const [imgSrc, setImgSrc] = useState<string | null>(null);
   const [maskSrc, setMaskSrc] = useState<string | null>(null);

   const sendMessage = async (imageSrc: string) => {
      if (maskSrc && imageSrc) {
         const maskImg = await convertImportedImageToBase64(maskSrc);
         socket.emit("send_img", {
            img: imageSrc,
            mask: maskImg,
         });
      }
   };

   const captureImgHandler = useCallback(() => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
         sendMessage(imageSrc);
      }
   }, [webcamRef, maskSrc]);

   const downloadImageHandler = () => {
      if (imgSrc) downloadImage(imgSrc);
   };

   useEffect(() => {
      function imgSetter({ img }: { img: string }) {
         setImgSrc(img);
      }
      socket.on("receive_img", imgSetter);
      return () => {
         socket.off("receive_img", imgSetter);
      };
   }, [socket, imgSrc]);

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
               <MaskPicker
                  maskList={Object.values(masks)}
                  onPick={setMaskSrc}
                  value={maskSrc}
               />
               <Button
                  onClick={captureImgHandler}
                  disabled={Boolean(!maskSrc) || !isCaptureEnable}
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
