import React, { useState, useEffect, useContext } from 'react'
import { useSocket } from '../context/SocketContext';
import { AuthContext } from '../context/AuthProvider'
import { useParams, useNavigate } from 'react-router-dom'
import Axios from 'axios'

const Home = () => {
    const socket = useSocket();
    const navigate = useNavigate();

    const CLIENT_ID = '103382d6342a44e3aeb5cfbdcbb18d3c';
    const RESPONSE_TYPE = 'token';
    const REDIRECT_URI = 'http://localhost:3000/';
    const AUTH_URI = 'http://accounts.spotify.com/en/authorize'
    const SCOPE = 'user-read-private%20user-read-email%20streaming%20user-read-email'

    // Changing user auth state
    const { authUser, setAuth } = useContext(AuthContext)

    const [currentUsername, setUsername] = useState('')
    const [roomName, setRoomName] = useState();
    const [isSubmitted, setStatus] = useState(false)

    //Retrieves the token, stores the token into userToken, gets list of playlists and user's spotify info such as username and profile picture
    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
        }
        setAuth(token)
        navigate(`/dashboard/:token`, {replace: true})
    }, [authUser])

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    };

    const createUser = async () => {
        if (currentUsername !== '' || !null) {
            try {
                await socket.emit('create-user', { username: currentUsername })
                setStatus(() => true)
            } catch (e) {
                console.log(e)
            }
        }
    }

    const joinRoom = async () => {
        try {
            await socket.emit('join-room', { roomName });
        } catch (error) {
            console.log('Error joining room:', error);
        }
    };

    const handleLogin = () => {
        // Redirect users to Spotify authentication endpoint
        const client_id = "103382d6342a44e3aeb5cfbdcbb18d3c"
        const redirect_uri = 'http://localhost:3000/callback'
        const scope = 'user-read-private%20user-read-email%20streaming%20user-read-email'
        window.location.href = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}`;
    };

    return (
        <div>
            {isSubmitted === true ? (
                <div>
                    <input type='text' onChange={handleUsername} />
                    <button onClick={createUser}>Submit</button>
                </div>
            ) : (
                <div>
                    <div className='create-room'>
                        <h1>Create Room</h1>
                        <a href={`${AUTH_URI}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}>
                            <button className=''>Login with Spotify</button>
                        </a>
                    </div>
                    <div className='join-room'>
                        <h1>Join Room</h1>
                        <input type='text' onChange={handleRoomNameChange} />
                        <button onClick={joinRoom}>Join</button>
                    </div>
                </div>
            )}



        </div>
    )
}
export default Home