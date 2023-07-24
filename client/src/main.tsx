import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SocketContext, socket } from "./api/socket.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <SocketContext.Provider value={socket}>
      <App />
   </SocketContext.Provider>
);
