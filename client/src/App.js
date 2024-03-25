import React, { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'; // Correct import
import { AuthContext } from './context/AuthProvider'
import Home from './views/Home';
import { SocketProvider } from './context/SocketContext';
import Dashboard from './views/Dashboard';
import Callback from './views/Callback';

function App() {

  const [authUser, setAuth] = useState()

  let { token } = useParams()
  token = authUser


  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ authUser, setAuth }}>
        <SocketProvider>
          <Routes>
            <Route path='/' index element={<Home />} />
            <Route path="/callback" element={<Callback />} />
            <Route path='/dashboard/:token' element={<Dashboard />} />
          </Routes>
        </SocketProvider>
      </AuthContext.Provider>
    </BrowserRouter>

  );
}

export default App;
