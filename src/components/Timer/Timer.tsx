import React, { FC } from 'react';
import clsx from 'clsx';
import s from './Timer.module.css';
import gs from '../../global.module.css';
import Animate from '../Animate/Animate';

type Props = {
    timeLeft: number;
    label: string;
    enableAnimation?: boolean;
};

const Timer: FC<Props> = ({ timeLeft, label, enableAnimation = true }) => (
    <div className={clsx(s.timerContainer, gs.column)}>
        <span className={clsx(gs.colorGray, gs.textAlignCenter)}>{label}</span>

        <div className={clsx(s.timer, gs.textAlignCenter)}>
            <Animate id="timer" text={timeLeft} animate={enableAnimation} />
        </div>
    </div>
);

export default Timer;
