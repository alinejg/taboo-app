import React from 'react';

function EndGameStats({ points }){

    const listScore = points.map((point, index) => 
        <p key={index}>
            Team {index+1} scored {point} points
        </p>
        )

    return(
        <div className="endGameStats">
            <p className='endGameHeading'> Scoreboard </p>
             {listScore} 
        </div>
    );
}

export default EndGameStats;