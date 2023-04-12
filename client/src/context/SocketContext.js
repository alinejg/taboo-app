import React from 'react';
import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

export const SocketContext = createContext();


export const SocketProvider = ({children}) => {

    const [gameInfo, setGameInfo] = useState({
        numRounds: 2,
        numTeams: 2,
        roundTime: 10,
    })

    const navigate = useNavigate();
    
    function enterRoom({ roomId }){
        navigate(`/room/${roomId}`);
    }

    useEffect(() => {
        socket.on('room-created', ({ roomId, gameInfo }) => {
            console.log('room id = ', roomId, 'game info = ', gameInfo)
            enterRoom({roomId});
        });
    }, [socket]);

    return (
        <SocketContext.Provider value= { {socket, gameInfo, setGameInfo}}>
            {children}
        </SocketContext.Provider>
    );
}