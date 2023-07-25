import React from "react";

type ButtonProps = React.PropsWithChildren<{
   onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
   disabled?: boolean;
}>;

export const Button = ({
   onClick,
   children,
   disabled = false,
}: ButtonProps) => {
   return (
      <>
         <button
            disabled={disabled}
            className="disabled:opacity-50 px-6 py-3 text-m font-semibold rounded-xl border-2 border- hover:text-white hover:bg-gray-400 hover:border-transparent focus:outline-none enabled:active:bg-green-600"
            onClick={onClick}
         >
            {children}
         </button>
      </>
   );
};
