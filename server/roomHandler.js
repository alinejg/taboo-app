import {v4 as uuid} from 'uuid';

export const roomHandler = (socket) => {
    socket.on("join-room", ({ id }) => {
        socket.join(id);
        socket.broadcast.to(id).emit('new-user');
        console.log('new user joined room');
    });
    
    socket.on("create-room", ({ gameInfo }) => {
        const roomId = uuid();
        socket.emit("room-created", { roomId, gameInfo });
    });

    socket.on("currGame_update", ( {id, currGame} ) => { 
        socket.to(id.id).emit("currGame_updated", { currGame } ); }
    );
    socket.on("timer_update", ( {id, timer} ) => { socket.to(id.id).emit("timer_updated", { timer } ); });
    socket.on("firstTurn_update", ( {id} ) => { socket.to(id.id).emit("firstTurn_updated"); });
    socket.on("points_update", ( {id, points} ) => { socket.to(id.id).emit("points_updated", { points } ); });
    socket.on("status_update", ( {id, status} ) => { socket.to(id.id).emit("status_updated", { status } ); });

}
