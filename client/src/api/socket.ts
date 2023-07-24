import * as io from "socket.io-client";
import { url } from "./config";
import React from "react";

export const socket = io.connect(url);

export const SocketContext = React.createContext(socket);
