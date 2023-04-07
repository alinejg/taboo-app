import React from 'react';
import { createContext } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

export const SocketContext = createContext();

export const SocketProvider = ({children}) => {
    return (
        <SocketContext.Provider value= {socket}>
            {children}
        </SocketContext.Provider>
    );
}