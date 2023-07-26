import { useState, useEffect } from "react";

type ErrorTagprops = {
   errorMessage: string | null;
};

export const ErrorTag = ({ errorMessage }: ErrorTagprops) => {
   const [visible, setVisible] = useState<boolean>(false);
   useEffect(() => {
      if (!errorMessage) {
         setVisible(false);
         return;
      }

      setVisible(true);

      //   const timer = setTimeout(() => {
      //      setVisible(false);
      //   }, 3000);

      //   return () => clearTimeout(timer);
   }, [errorMessage]);

   return (
      visible && (
         <p className="text-lg text-red-600">
            <strong>Error</strong>: {errorMessage}
         </p>
      )
   );
};
