import React, { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Game from './pages/Game/Game';

const App: FC = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Game />} />
        </Routes>
    </Router>
);

export default App;
