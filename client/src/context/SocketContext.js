import React from 'react';
import { useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

export const SocketContext = createContext();

export const SocketProvider = ({children}) => {

    const navigate = useNavigate();
    
    function enterRoom({ roomId }){
        navigate(`/room/${roomId}`);
    }

    useEffect(() => {
        socket.on('room-created', enterRoom);
    }, [socket]);

    return (
        <SocketContext.Provider value= {socket}>
            {children}
        </SocketContext.Provider>
    );
}