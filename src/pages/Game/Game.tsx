import React, { FC, useContext, useEffect, useState } from 'react';
import s from './Game.module.css';
import gs from '../../global.module.css';
import Input from '../../components/Input/Input';
import clsx from 'clsx';
import { SocketContext } from '../../context/SocketContext';

const Game: FC = () => {
    const [textList, setTextList] = useState<string[]>([]);
    const [roomId, setRoomId] = useState<string>();
    const socket = useContext(SocketContext);

    useEffect(() => {
        socket.on('errorMessage', (e) => console.log(e));
        socket.on('message', (e) => console.log(e));
        socket.on('game-tick', (e) => console.log(e));
        socket.on('connect', () => setRoomId(socket.io.engine.id));
    }, []);

    return (
        <>
            <div className={gs.column}>
                <Input placeholder="join-room" onEnter={(e) => socket.emit('join-room', e)} clearOnEnter={true} />
                <Input placeholder="create-room" onEnter={() => socket.emit('create-room')} clearOnEnter={true} />

                <div className={clsx(s.titleContainer, gs.pointer)}>
                    <div className={s.label}>ID: {roomId}</div>
                    <div className={s.label}>Find the words in</div>
                    <div className={s.title}>WORD</div>
                </div>

                <div className={gs.centerHorizontal}>
                    <Input
                        size="large"
                        uppercase={true}
                        placeholder="Write here"
                        onChange={(e) => console.log('change', e)}
                        onEnter={(e) => setTextList([e, ...textList])}
                        clearOnEnter={true}
                    />
                </div>

                <div className={clsx(gs.spaceBetween, gs.pointer)}>
                    <div className={gs.fullWidth}>
                        {textList.map((item, index) => (
                            <div
                                key={`${item}_${index}`}
                                className={clsx(gs.fontLarge, gs.uppercase, gs.textAlignCenter)}
                            >
                                {item}
                            </div>
                        ))}
                    </div>

                    <div className={gs.fullWidth}>
                        {textList.map((item, index) => (
                            <div
                                key={`${item}_${index}`}
                                className={clsx(gs.fontLarge, gs.uppercase, gs.textAlignCenter)}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Game;
