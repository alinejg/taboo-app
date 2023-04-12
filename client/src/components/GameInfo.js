import React from 'react';

function GameInfo({ currGame, points }){
    return(
        <div className='gameInfo'>
            <p> Rounds Played: {currGame.currRound}</p>
            <p> Team Playing: {currGame.currTeam} </p>
            <p> Points: {points} </p>
        </div>
    )
}

export default GameInfo;