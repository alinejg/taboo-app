import React from 'react';
import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext.js';

function GameInfo({ currGame, points }){
    const { gameInfo } = useContext(SocketContext);

    return(
        <div className='gameInfo'>
            <p className='rounds'> {currGame.currRound}/{gameInfo.numRounds} Rounds</p>
            <p className='points'> Team {currGame.currTeam+1} has {points[currGame.currTeam]} points</p>
        </div>
    )
}

export default GameInfo;