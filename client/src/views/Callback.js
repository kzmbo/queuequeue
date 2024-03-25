import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider'
import axios from 'axios';

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  // Changing user auth state
  const {authUser, setAuth} = useContext(AuthContext)

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // Extract code from URL parameters
        const params = new URLSearchParams(location.search);
        const code = params.get('code');

        // Make a request to your backend to exchange the code for an access token
        const response = await axios.post('http://localhost:3001/api/token', { code });
        const accessToken = response.data.access_token;

        // Do something with the access token, e.g., save it to local storage or state
        console.log('Access Token:', accessToken);

        setIsLoading(false); // Set loading status to false
        setAuth(accessToken)
        navigate(`/dashboard/${accessToken}`, {replace: true})
      } catch (error) {
        console.error('Error fetching token:', error);
        // Handle error
        setIsLoading(false); // Set loading status to false
      }
    };

    fetchToken();
  }, [location]);

  if (isLoading) {
    return <p>Loading...</p>; // Render loading indicator while fetching token
  }
};

export default Callback;
