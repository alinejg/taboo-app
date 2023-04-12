import {v4 as uuid} from 'uuid';

const rooms = { check: [] }

export const roomHandler = (socket) => {
    socket.on("join-room", ({ id, socketId }) => {
        const roomId = id.id;
        if(rooms[roomId]){
            //console.log('user joined room', roomId, 'rooms[] ', rooms, 'rooms[0] ', rooms[roomId]);
            console.log(socketId, " joined ", roomId);
            rooms[roomId].push(socketId);
            socket.join(roomId);
            socket.emit('joined-room', {participants: rooms[roomId]})
        }
    });

    socket.on("create-room", ({ gameInfo }) => {
        const roomId = uuid();
        rooms[roomId] = [gameInfo];
        console.log("room created ", roomId, "rooms = ", rooms[roomId]);
        socket.emit("room-created", { roomId, gameInfo });
    });

    socket.on("currGame_update", ( {id, currGame} ) => { 
        socket.to(id.id).emit("currGame_updated", { currGame } ); }
    );

    socket.on("timer_update", ( {id, timer} ) => { socket.to(id.id).emit("timer_updated", { timer } ); console.log('timer updated');});
    socket.on("firstTurn_update", ( {id} ) => { socket.to(id.id).emit("firstTurn_updated"); });
    socket.on("points_update", ( {id, points} ) => { socket.to(id.id).emit("points_updated", { points } ); });
    socket.on("status_update", ( {id, status} ) => { socket.to(id.id).emit("status_updated", { status } ); });

}
