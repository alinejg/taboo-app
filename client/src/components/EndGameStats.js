import React from 'react';

function EndGameStats({ points }){

    const listScore = points.map((point, index) => 
        <li key={index}>
            Team {index+1} scored {point} points
        </li>
        )

    return(
        <div className="endGameStats">
            <ul> {listScore} </ul>
            {console.log(listScore)}
        </div>
    );
}

export default EndGameStats;