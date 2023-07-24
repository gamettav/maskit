type Mask = {
   name: string;
};

type MaskPickerProps = {
   maskList: Mask[];
   onPick: (value: string) => void;
   value: string | null;
};

export const MaskPicker = ({ maskList, onPick, value }: MaskPickerProps) => {
   return (
      <div className="flex flex-col items-center">
         <h2 className="text-xl font-large text-gray-900">Pick A Mask</h2>
         <div className="flex gap-5">
            {maskList.map(({ name }) => (
               <img
                  key={name}
                  src={name}
                  onClick={() => {
                     onPick(name);
                  }}
                  className={`p-5 cursor-pointer max-w-[150px] rounded-lg border-2 ${
                     value === name ? "border-green-600" : ""
                  } `}
               />
            ))}
         </div>
      </div>
   );
};
