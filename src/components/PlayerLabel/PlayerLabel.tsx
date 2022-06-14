import React, { FC } from 'react';
import { ColumnContainer } from '../Container';
import clsx from 'clsx';
import gs from '../../global.module.css';
import s from './PlayerLabel.module.css';
import Animated from '../Animate/Animate';

type Props = {
    name: string;
    score: number;
};

const PlayerLabel: FC<Props> = ({ name, score }) => (
    <ColumnContainer>
        <span className={clsx(gs.fontLarge, gs.uppercase, gs.textAlignCenter, gs.defaultCursor, gs.colorGray)}>
            {name}
        </span>

        <div className={clsx(s.score, gs.colorLight, gs.textAlignCenter)}>
            <Animated id={name} text={score} animate={score !== 0} />
        </div>
    </ColumnContainer>
);

export default PlayerLabel;
