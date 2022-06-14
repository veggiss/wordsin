import React, { FC, useContext } from 'react';
import Logo from '../../components/Logo/Logo';
import { CenterContainer } from '../../components/Container';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../context/Context';
import Button from '../../components/Button/Button';
import gs from '../../global.module.css';
import clsx from 'clsx';

const Home: FC = () => {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();

    return (
        <CenterContainer>
            <div className={clsx(gs.paddingBottom, gs.textAlignCenter)}>
                <Logo label="Race against a friend to find the most words within a word." />
            </div>

            <Button label="Create lobby" variant="light" onClick={() => socket.id && navigate(socket.id)} />
        </CenterContainer>
    );
};

export default Home;
