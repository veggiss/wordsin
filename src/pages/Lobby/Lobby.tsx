import React, { FC, useContext, useEffect, useState } from 'react';
import Logo from '../../components/Logo/Logo';
import { CenterContainer } from '../../components/Container';
import { useParams } from 'react-router-dom';
import gs from '../../global.module.css';
import clsx from 'clsx';
import { SOCKET_EVENT } from '../../context/Provider';
import { GameStateContext, SocketContext } from '../../context/Context';
import PlayerCard from '../../components/PlayerCard/PlayerCard';

const Lobby: FC = () => {
    const socket = useContext(SocketContext);
    const { gameState } = useContext(GameStateContext);
    const [ready, setReady] = useState(false);
    const { roomId } = useParams();

    const opponentReady = gameState?.opponent?.ready;
    const opponentId = gameState?.opponent?.id;

    const onClick = () => {
        setReady(true);

        socket.emit(SOCKET_EVENT.playerReady);
    };

    useEffect(() => {
        socket.emit(SOCKET_EVENT.joinRoom, roomId);
    }, []);

    return (
        <CenterContainer>
            <Logo />

            <div className={clsx(gs.colorGray, gs.textAlignCenter)}>
                <div className={gs.paddingBottom}>
                    All answers are at least three letters or more. <br />
                    You gain one point for each correct guessed word. <br />
                    The timer is reset when someone gains point. <br />
                </div>

                <span>Use the link to join this lobby. Ready up to start the game.</span>
            </div>

            <div className={gs.row}>
                <PlayerCard ready={ready} onClick={onClick}>
                    You
                </PlayerCard>

                <PlayerCard ready={opponentReady} disabled={true}>
                    {opponentId ? 'Opponent' : 'Waiting for opponent..'}
                </PlayerCard>
            </div>
        </CenterContainer>
    );
};

export default Lobby;
