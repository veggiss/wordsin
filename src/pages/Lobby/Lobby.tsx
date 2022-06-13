import React, { FC, PropsWithChildren, useContext, useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import Logo from '../../components/Logo/Logo';
import Container from '../../components/Container';
import { useParams } from 'react-router-dom';
import gs from '../../global.module.css';
import clsx from 'clsx';
import { getOpponent, Player, SOCKET_EVENT } from '../../context/Provider';
import { GameStateContext, SocketContext } from '../../context/Context';

interface ReadyButtonProps extends PropsWithChildren {
    ready: boolean;
    disabled?: boolean;
    onClick?: () => void;
}

const PlayerCard: FC<ReadyButtonProps> = ({ ready, onClick, children, disabled = false }) => (
    <Card>
        <span className={clsx(gs.fontDefault, gs.textAlignCenter, gs.colorDark)} style={{ padding: '1rem 0' }}>
            {children}
        </span>

        <Button
            label={ready ? 'Ready' : 'Not ready'}
            variant={ready ? 'success' : 'dark'}
            onClick={() => onClick && onClick()}
            disabled={disabled}
        />
    </Card>
);

const Lobby: FC = () => {
    const socket = useContext(SocketContext);
    const { gameState } = useContext(GameStateContext);
    const [ready, setReady] = useState(false);
    const [opponent, setOpponent] = useState<Player>();
    const { roomId } = useParams();

    const onClick = () => {
        setReady(true);

        socket.emit(SOCKET_EVENT.playerReady);
    };

    useEffect(() => {
        socket.emit(SOCKET_EVENT.joinRoom, roomId);
    }, []);

    useEffect(() => {
        if (gameState) {
            const opponent = getOpponent(gameState, socket.io.engine.id);

            if (opponent) setOpponent(opponent);
        }
    }, [gameState]);

    return (
        <Container>
            <Logo />

            <div className={gs.row}>
                <PlayerCard ready={ready} onClick={onClick}>
                    You
                </PlayerCard>

                <PlayerCard ready={opponent?.ready} disabled={true}>
                    {opponent ? 'Opponent' : 'Waiting for opponent..'}
                </PlayerCard>
            </div>
        </Container>
    );
};

export default Lobby;
