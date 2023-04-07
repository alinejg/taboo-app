import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import { roomHandler } from './roomHandler.js';
import cors from 'cors';

const app = express();
app.use(cors());
 
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

io.on("connect", (socket) => {
    console.log("user connected");

    roomHandler(socket);
    
    socket.on("disconnect", () => {
        console.log("user disconnected");
    })
});

server.listen(3001, () => {
    console.log("server listening on port 3001");
});