import React from 'react';

export default function Timer( {timer} ){
    return(
        <p>
            {parseInt(timer/60)} : {parseInt(timer%60)}
        </p>
    )
}