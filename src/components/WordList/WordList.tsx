import React, { FC } from 'react';
import { ColumnContainer } from '../Container';
import clsx from 'clsx';
import gs from '../../global.module.css';
import Animate from '../Animate/Animate';

type Props = {
    words: string[];
};

const WordList: FC<Props> = ({ words }) => (
    <ColumnContainer>
        {words.map((word) => (
            <div key={word} className={clsx(gs.fontLarge, gs.uppercase, gs.textAlignCenter)}>
                <Animate id={word} text={word} />
            </div>
        ))}
    </ColumnContainer>
);

export default WordList;
