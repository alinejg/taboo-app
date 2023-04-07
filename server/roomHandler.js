import {v4 as uuid} from 'uuid';

export const roomHandler = (socket) => {
    socket.on("join-room", () => {
        console.log("user joined room");
    });
    
    socket.on("create-room", () => {
        console.log("user created room");
        const roomId = uuid();
        socket.join(roomId);
        socket.emit("room-created", { roomId });
    });

}