export const dataUrlToFile = async (
   dataUrl: string,
   fileName: string = "image"
): Promise<File> => {
   const res: Response = await fetch(dataUrl);
   const blob: Blob = await res.blob();
   return new File([blob], fileName, { type: "image/png" });
};

export async function convertImportedImageToBase64(importedImage: string) {
   try {
      const response = await fetch(importedImage);
      const blob = await response.blob();

      const base64String = await readBlobAsBase64(blob);

      return base64String;
   } catch (error) {
      console.error("Error converting imported image to base64:", error);
      return null;
   }
}

function readBlobAsBase64(blob: Blob) {
   return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
         resolve(reader.result);
      };

      reader.onerror = () => {
         reject(new Error("Failed to convert the blob to base64"));
      };

      reader.readAsDataURL(blob);
   });
}

export function downloadImage(src: string, filename: string = "maskedphoto") {
   const img = new Image();
   img.crossOrigin = "anonymous";
   img.src = src;
   img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
         ctx.drawImage(img, 0, 0);
         const a = document.createElement("a");
         a.download = filename + ".png";
         a.href = canvas.toDataURL("image/png");
         a.click();
      }
   };
}
