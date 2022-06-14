import React, { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';
import { GameStateContext, SocketContext, socketContextValue } from './Context';

export type Player = {
    id: string;
    disconnected: boolean;
    ready: boolean;
    points: number;
    guessedWords: string[];
    winner: boolean;
};

type IncomingPlayerState = {
    player1: Player;
    player2: Player;
};

type LocalPlayerState = {
    player: Player;
    opponent: Player;
};

interface Game {
    roundTime: number;
    initiationTime: number;
    roomId: string;
    currentWord: string;
    gameStarted: boolean;
    gameEnded: boolean;
}

export interface GameState extends Game, LocalPlayerState {}
interface IncomingGameState extends Game, IncomingPlayerState {}

export const SOCKET_EVENT = {
    gameTick: 'game-tick',
    createRoom: 'create-room',
    joinRoom: 'join-room',
    connection: 'connection',
    disconnect: 'disconnect',
    roomCreated: 'room-created',
    gameState: 'game-state',
    playerReady: 'player-ready',
    guessWord: 'guess-word',
};

const Provider: FC<PropsWithChildren> = ({ children }) => {
    const socket = socketContextValue;
    const [gameState, setGameState] = useState<GameState>();
    const gameStateRef = useRef<GameState>();

    useEffect(() => {
        socket.on(SOCKET_EVENT.gameState, (state: IncomingGameState) => {
            const id = socket.io.engine.id;
            const players = [state.player1, state.player2];

            const player = players.find((p) => p.id === id);
            const opponent = players.find((p) => p.id !== id);

            delete state.player1;
            delete state.player2;

            setGameState({ ...state, player, opponent });
        });

        socket.on(SOCKET_EVENT.gameTick, (tick: number) => {
            if (gameStateRef.current) setGameState({ ...gameStateRef.current, roundTime: tick });
        });
    }, []);

    useEffect(() => {
        gameStateRef.current = gameState;
    }, [gameState]);

    return (
        <SocketContext.Provider value={socket}>
            <GameStateContext.Provider value={{ gameState, setGameState }}>{children}</GameStateContext.Provider>
        </SocketContext.Provider>
    );
};

export default Provider;
