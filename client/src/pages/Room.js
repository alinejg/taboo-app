import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useParams } from 'react-router-dom';
import Card from '../components/Card.js';
import Timer from '../components/Timer.js';
import EndGameStats from '../components/EndGameStats.js';
import GameInfo from '../components/GameInfo.js';

export default function Room(){

    const id = useParams();
    const socket = useContext(SocketContext);

    useEffect(() => { console.log(`${socket.id} joined the room`)
        socket.emit("join-room", id); }, [id])

    const gameInfo = {
        numTeams: 2,
        numRounds: 2,
        roundTime: 10,
    }

    let arr = []
    for(let i = 0; i < gameInfo.numTeams; i++){ arr.push(0) }
    const [points, setPoints] = useState(arr)

    const [currGame, setCurrGame] = useState({
        currTeam: 0,
        currRound: 0,
        currCard: 0,
    })
    
    const [status, setStatus] = useState('playing')
    const [timer, setTimer] = useState(0)
    const [firstTurn, setFirstTurn] = useState(true)
    const [visibility, setVisibility] = useState(true)

    useEffect(() => {
        socket.on('points_updated', ( { points } ) => { setPoints(points) })
        socket.on('status_updated', ({ status }) => { setStatus(status) })
        socket.on('timer_updated', ({ timer }) => { setTimer(timer) })
        socket.on('currGame_updated', ({ currGame }) => { console.log(`currGame updated by ${socket.id}`); setCurrGame(currGame) })
        socket.on('firstTurn_updated', () => { setFirstTurn(false) })
        // socket.on('new-user', () => {
        //     console.log('new user joined room');
        //     socket.emit('status_update', {id, status});
        //     socket.emit('points_update', { id, points });
        //     socket.emit('timer_update', { id, timer });
        //     socket.emit('currGame_update', { id, currGame, socket });
        // })
    }, [socket])

    useEffect(() => { socket.emit('status_update', {id, status}); }, [status])
    useEffect(() => { socket.emit('points_update', { id, points }) }, [JSON.stringify(points)])
    useEffect(() => { socket.emit('timer_update', { id, timer }); }, [timer])
    useEffect(() => { socket.emit('currGame_update', { id, currGame }); }, [JSON.stringify(currGame)])

    function startTurn() {
        setTimer(gameInfo.roundTime);
        if(firstTurn){
          setFirstTurn(false)
          socket.emit('firstTurn_update', { id });
        }else if(currGame.currRound === gameInfo.numRounds - 1 &&
          currGame.currTeam === gameInfo.numTeams - 1){
            setStatus('endGame')
        }else if(currGame.currTeam === gameInfo.numTeams - 1){
          setCurrGame({...currGame, currTeam: 0, currRound: currGame.currRound+1})
        }else{
          setCurrGame({...currGame, currTeam: currGame.currTeam + 1})
        }
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

    function next() {
        setCurrGame({...currGame, currCard: currGame.currCard + 1})
        const newPoints = points.map((p, i) => {
            return (i === currGame.currTeam) ? (p + 1) : p;
        });
        setPoints(newPoints)
    }

    function restartGame(){
        setCurrGame({...currGame, currTeam: 0, currRound: 0})
        setPoints(points.map(() => {return 0}))
        setTimer(0)
        setFirstTurn(true)
        setStatus('playing')
    }

    return( 
        status === 'playing' ?
        (<div className='playingBox'>
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
            <GameInfo currGame={currGame} points={points}/>           
          </div>

        </div>
        ) : (
        <div className="App endScreen">
          <EndGameStats points={points} />
          <button onClick={restartGame}> Restart </button>
        </div>
        )
    );
}