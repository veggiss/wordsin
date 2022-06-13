import { createContext, Dispatch, SetStateAction } from 'react';
import { io } from 'socket.io-client';
import { GameState } from './Provider';

export const socketContextValue = io();
export const SocketContext = createContext<typeof socketContextValue>(null);

export const GameStateContext = createContext<{
    gameState: GameState;
    setGameState: Dispatch<SetStateAction<GameState>>;
}>(null);
