export type FaceBox = {
   x: number;
   y: number;
   width: number;
   height: number;
};

export type MaskImg = {
   captureDataURL: string;
   maskDataURL: string;
   faceBoxList: FaceBox[];
};
