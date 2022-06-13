import React, { FC, useContext } from 'react';
import Game from '../Game/Game';
import Lobby from '../Lobby/Lobby';
import { GameStateContext } from '../../context/Context';

const Play: FC = () => {
    const { gameState } = useContext(GameStateContext);

    return gameState?.gameStarted ? <Game /> : <Lobby />;
};

export default Play;
