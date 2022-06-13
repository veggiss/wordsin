import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { GameStateContext, SocketContext, socketContextValue } from './Context';

export type Player = {
    id: string;
    disconnected: boolean;
    ready: boolean;
    points: number;
};

export type GameState = {
    roundTime: number;
    initiationTimer: number;
    roomId: string;
    currentWord: string;
    gameStarted: boolean;
    gameEnded: boolean;
    guessedWords: string[];
    player1: Player;
    player2: Player;
    error: boolean;
};

export const SOCKET_EVENT = {
    gameTick: 'game-tick',
    createRoom: 'create-room',
    joinRoom: 'join-room',
    connection: 'connection',
    disconnect: 'disconnect',
    roomCreated: 'room-created',
    gameState: 'game-state',
    playerReady: 'player-ready',
};

export const getOpponent = (gameState: GameState, clientId: string) =>
    [gameState.player1, gameState.player2].find((player) => player?.id && player.id !== clientId);

const Provider: FC<PropsWithChildren> = ({ children }) => {
    const socket = socketContextValue;
    const [gameState, setGameState] = useState<GameState>();

    useEffect(() => {
        socket.on(SOCKET_EVENT.gameState, (state: GameState) => {
            console.log('setting game state', state);
            setGameState(state);
        });

        socket.on(SOCKET_EVENT.gameTick, (tick: number) => {
            console.log('tick', tick);
        });
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            <GameStateContext.Provider value={{ gameState, setGameState }}>{children}</GameStateContext.Provider>
        </SocketContext.Provider>
    );
};

export default Provider;
