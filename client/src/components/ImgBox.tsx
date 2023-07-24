type ImgBoxProps = {
   children: string | JSX.Element | JSX.Element[];
};

export const ImgBox = ({ children }: ImgBoxProps) => {
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
