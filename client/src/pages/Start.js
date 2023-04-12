import React from 'react';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';

function Start(){

    const {socket, gameInfo, setGameInfo} = useContext(SocketContext);

    const createRoom = () => {
      socket.emit("create-room", { gameInfo });
    }

    return (
        <div className="App startScreen">
            <form>

                <input
                value={gameInfo.numTeams} 
                onChange={e => {setGameInfo({...gameInfo, numTeams: e.target.value,})}} />
                <label> Teams Playing </label>

                <input
                value={gameInfo.numRounds}
                onChange={e => {setGameInfo({...gameInfo, numRounds: e.target.value,})}}
                />
                <label> Rounds per Game </label>

                <input
                value={gameInfo.roundTime}
                onChange={e => setGameInfo({...gameInfo, roundTime: e.target.value,})}
                />
                <label> Seconds per Turn </label>

            </form>
            
            <button className="start" onClick={createRoom}> Create Room </button>
        </div>
    );
}

export default Start;