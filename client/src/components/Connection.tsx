type ConnectionProps = {
   isConnected: boolean;
};

export const Connection = ({ isConnected }: ConnectionProps) => {
   return isConnected ? (
      <p className="absolute w-screen text-center text-s font-large text-green-600">
         Connected
      </p>
   ) : (
      <p className="absolute w-screen text-center text-s font-large text-red-600">
         Disconected
      </p>
   );
};
