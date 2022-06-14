import React, { FC, useContext, useEffect } from 'react';
import Logo from '../../components/Logo/Logo';
import { CenterContainer } from '../../components/Container';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import gs from '../../global.module.css';
import s from '../../components/Logo/Logo.module.css';
import { SocketContext } from '../../context/Context';

const Home: FC = () => {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();

    useEffect(() => {
        const roomId = socket.io.engine.id;

        if (roomId) navigate(roomId);
    }, [socket]);

    return (
        <CenterContainer>
            <Logo disableSubText={true} />

            <span className={clsx(gs.fontMedium, gs.defaultCursor, s.subTitle)} onClick={() => navigate('roomId')}>
                Creating lobby..
            </span>
        </CenterContainer>
    );
};

export default Home;
