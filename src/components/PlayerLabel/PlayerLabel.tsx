import React, { FC } from 'react';
import { ColumnContainer } from '../Container';
import clsx from 'clsx';
import gs from '../../global.module.css';
import s from './PlayerLabel.module.css';
import AnimatedText from '../AnimatedText/AnimatedText';

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
            <AnimatedText id={name} text={score} />
        </div>
    </ColumnContainer>
);

export default PlayerLabel;
