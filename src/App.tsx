import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Play from './pages/Play/Play';
import Provider from './context/Provider';

const App: FC = () => {
    return (
        <Provider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:roomId" element={<Play />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
