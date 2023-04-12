import React from 'react';
import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext.js';

function GameInfo({ currGame, points }){
    const { gameInfo } = useContext(SocketContext);

    return(
        <div className='gameInfo'>
            <p> {currGame.currRound}/{gameInfo.numRounds} Rounds</p>
            <p> {currGame.currTeam} scored {points[currGame.currTeam]} points (total) </p>
        </div>
    )
}

export default GameInfo;