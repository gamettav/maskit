type PlaceholderProps = {
   bgColor?: string;
   label: string;
};

export const Placeholder = ({
   bgColor = "bg-orange-600",
   label,
}: PlaceholderProps) => {
   return (
      <div
         className={`text-white ${bgColor} flex items-center justify-center w-[500px] h-[375px]`}
      >
         <span>{label}</span>
      </div>
   );
};
