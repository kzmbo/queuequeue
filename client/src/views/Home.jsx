import React, { useState } from 'react'
import { useSocket } from '../context/SocketContext';

const Home = () => {
    const socket = useSocket();

    const [currentUsername, setUsername] = useState()

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const createUser = async () => {
        try{
            await socket.emit('create-user', {username: currentUsername})
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div>
            <input type='text' onChange={handleUsername} />
            <button onClick={createUser}>Submit</button>
        </div>
    )
}

export default Home