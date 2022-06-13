import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Game from './pages/Game/Game';
import { socket, SocketContext } from './context/SocketContext';
import Home from './pages/Home/Home';

const App: FC = () => (
    <SocketContext.Provider value={socket}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<Game />} />
            </Routes>
        </BrowserRouter>
    </SocketContext.Provider>
);

export default App;
