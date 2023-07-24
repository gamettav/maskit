import { Ref } from "react";
import Webcam from "react-webcam";

type CameraProps = {
   cameraRef: Ref<Webcam>;
};

export const Camera = ({ cameraRef }: CameraProps) => (
   <div className="w-[500px] h-[375px]">
      <Webcam
         audio={false}
         width="500px"
         ref={cameraRef}
         screenshotFormat="image/png"
      />
   </div>
);
