import React from 'react';
import { SocketContext } from '../context/SocketContext';
import { useState, useEffect, useContext } from 'react';

function Start(){

    const socket = useContext(SocketContext);

    const joinRoom = () => {
      socket.emit("create-room");
    }
  
    useEffect(() => {
  
      socket.on("room-created", ( {roomId} ) => {
        console.log(roomId);
      })
  
    }, [socket]);
  
    const [gameInfo,setGameInfo] = useState({
      numTeams: 2,
      numRounds: 2,
      roundTime: 10,
    })

    const [points, setPoints] = useState([])
    
    function setTeams(e){
        setGameInfo({...gameInfo, numTeams: e.target.value,})
        let arr = []
        for(let i = 0; i < e.target.value; i++){
          arr.push(0)
        }
        setPoints(arr)
        console.log(" points = ", arr)
    }

    return (
        <div className="App startScreen">
            <form>
            <div className="inputBox">
                <input
                value={gameInfo.numTeams} onChange={setTeams} />
                <label> Teams Playing </label>
            </div>
            <div className="inputBox">
                <input
                value={gameInfo.numRounds}
                onChange={e => setTeams(e)}
                />
                <label> Rounds per Game </label>
            </div>
            <div className="inputBox">
                <input
                value={gameInfo.roundTime}
                onChange={e => setGameInfo({...gameInfo, roundTime: e.target.value,})}
                />
                <label> Seconds per Turn </label>
            </div>
            </form>
            <button onClick={joinRoom}> Join Room Test </button>
            <button className="start"> Start Game </button>
        </div>
    );
}

export default Start;