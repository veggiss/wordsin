import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './pages/Game/Game';
import { socket, SocketContext } from './context/SocketContext';

const App: FC = () => (
    <SocketContext.Provider value={socket}>
        <Router>
            <Routes>
                <Route path="/" element={<Game />} />
            </Routes>
        </Router>
    </SocketContext.Provider>
);

export default App;
