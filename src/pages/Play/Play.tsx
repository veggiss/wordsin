import React, { FC, useContext, useEffect, useState } from 'react';
import Game from '../Game/Game';
import Lobby from '../Lobby/Lobby';
import { GameStateContext } from '../../context/Context';

const Play: FC = () => {
    const [gameStarted, setGameStarted] = useState(false);
    const { gameState } = useContext(GameStateContext);

    useEffect(() => {
        if (!gameState) return;

        setGameStarted(gameState.gameStarted);
    }, [gameState]);

    return gameStarted ? <Game /> : <Lobby />;
};

export default Play;
