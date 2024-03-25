import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'; // Correct import
import axios from 'axios';

const Dashboard = () => {
    const { token } = useParams(); // Retrieve accessToken from URL params

    const [devices, setDevices] = useState([]);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await getAvailableDevices(token);
                setDevices(response.data.devices);
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        };

        fetchDevices();
    }, [token]);

    const getAvailableDevices = (accessToken) => {
        return axios.get('https://api.spotify.com/v1/me/player/devices', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
    };

    // const playMusic = () => {
    //     axios.put(
    //         'https://api.spotify.com/v1/me/player/play',
    //         {
    //             context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',
    //             offset: {
    //                 position: 5
    //             },
    //             position_ms: 0
    //         },
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         }
    //     )
    //         .then(response => {
    //             console.log('Music played successfully:', response);
    //         })
    //         .catch(error => {
    //             console.error('Error playing music:', error);
    //         });
    // };


    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Available Devices:</h2>
            <ul>
                {devices.map(device => (
                    <li key={device.id}>{device.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default Dashboard