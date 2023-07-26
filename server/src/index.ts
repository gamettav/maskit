import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { CLIENT_URL, PORT } from "./common/config.js";
import { socketRoutes } from "./routes/socket.js";
import type { Application } from "express";

const app: Application = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: CLIENT_URL,
        methods: ["GET", "POST"],
    },
});

socketRoutes(io);

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
