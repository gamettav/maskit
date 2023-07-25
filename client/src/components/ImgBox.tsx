export const ImgBox = ({ children }: React.PropsWithChildren) => {
   return (
      <div
         style={{
            display: "flex",
            width: "fit-content",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         {children}
      </div>
   );
};
