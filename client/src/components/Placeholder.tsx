type PlaceholderProps = {
   width?: number;
   height?: number;
   color?: string;
   label: string;
};

export const Placeholder = ({
   width = 500,
   height = 375,
   color = "orange-600",
   label,
}: PlaceholderProps) => {
   return (
      <div
         className={`text-white bg-${color} flex items-center justify-center w-[${width}px] h-[${height}px]`}
      >
         <span>{label}</span>
      </div>
   );
};
