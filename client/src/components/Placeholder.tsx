type PlaceholderProps = {
   color?: string;
   label: string;
};

export const Placeholder = ({
   color = "orange-600",
   label,
}: PlaceholderProps) => {
   return (
      <div
         className={`text-white bg-${color} flex items-center justify-center w-[500px] h-[375px]`}
      >
         <span>{label}</span>
      </div>
   );
};
