import React from 'react';
import Home from './views/Home';
import { SocketProvider } from './context/SocketContext';

function App() {

  return (
    <SocketProvider>
      <div className="App">
        <Home />
      </div>
    </SocketProvider>
  );
}

export default App;
