import React, { FC } from 'react';
import s from './AnimatedText.module.css';
import clsx from 'clsx';

type Props = {
    id: string;
    text: string | number;
    animate?: boolean;
};

const AnimatedText: FC<Props> = ({ id, text, animate = true }) => (
    <div key={`${id}_${text}`} className={clsx({ [s.pulsate]: animate })}>
        {text}
    </div>
);

export default AnimatedText;
