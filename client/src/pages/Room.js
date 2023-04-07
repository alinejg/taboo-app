import React from 'react';
import { useState, useEffect } from 'react';
import Card from '../components/Card.js';
import Timer from '../components/Timer.js';
import EndGameStats from '../components/EndGameStats.js';

export default function Room(){

    {console.log({roomId})}
    const gameInfo = {
        numTeams: 2,
        numRounds: 2,
        roundTime: 10,
    }

    const [currGame, setCurrGame] = useState({
        currTeam: 0,
        currRound: 0,
        currCard: 0,
    })
    
    const [status, setStatus] = useState('playing')
    const [points, setPoints] = useState([0, 0])
    const [timer, setTimer] = useState(0)
    const [firstTurn, setFirstTurn] = useState(true)
    const [visibility, setVisibility] = useState(true)

    function next() {
    console.log("points = ", points)
    setCurrGame({...currGame, currCard: currGame.currCard + 1})
    const newPoints = points.map((p, i) => {
        if(i === currGame.currTeam) {
        return p + 1;
        }else{
        return p;
        }
    });
    setPoints(newPoints)
    }

    function startTurn() {
        setTimer(gameInfo.roundTime);
        if(firstTurn){
          setFirstTurn(false)
        }else if(currGame.currRound === gameInfo.numRounds - 1 &&
          currGame.currTeam === gameInfo.numTeams - 1){
            setStatus('endGame')
        }else if(currGame.currTeam === gameInfo.numTeams - 1){
          setCurrGame({...currGame, currTeam: 0, currRound: currGame.currRound+1})
        }else{
          setCurrGame({...currGame, currTeam: currGame.currTeam + 1})
        }
    }

    function restartGame(){
        setCurrGame({...currGame, currTeam: 0, currRound: 0})
        setPoints(points.map(() => {return 0}))
        setTimer(0)
        setFirstTurn(true)
        setStatus('startScreen')
    }

    useEffect(() => {
        const id = setInterval(() => {
            if(timer > 0){
            setTimer(c => c - 1);
            }
        }, 1000);

        return() => (
        clearInterval(id)
        );

    }, [timer]);

    if(status === 'playing'){

        return( 
          <div className="App playing">
            <button className="visibility" onClick={() => {setVisibility(!visibility)}}> 
            {visibility?"Hide Card":"Show Card"} </button>
            
            <button className="endGame" onClick={() => {setStatus('endGame')}}> End Game </button>
            <br />
            <Timer className="timer" timer={timer} />
    
            <Card currCard={currGame.currCard} visibility={visibility}/> 
    
            <button className="next" onClick={next} disabled={!visibility || timer <= 0}> Next </button>
            <button className="skip" onClick={() => {setCurrGame({...currGame, currCard: currGame.currCard + 1})}} disabled={!visibility || timer <= 0}> Skip </button>
            <br />
            <button className="startTurn" onClick={startTurn} disabled={timer > 0}> Start Timer </button>
            {console.log(points)}
          </div>
        );
    
      }else if(status === 'endGame'){
    
        return(
        <div className="App endScreen">
          <EndGameStats points={points} />
          <button onClick={restartGame}> Restart </button>
        </div>
        );
      }
}