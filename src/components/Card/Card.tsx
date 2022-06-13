import React, { FC, PropsWithChildren } from 'react';
import s from './Card.module.css';
import gs from '../../global.module.css';
import clsx from 'clsx';

const Card: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div>
            <div className={clsx(s.container, gs.centerHorizontal, gs.column)}>{children}</div>
        </div>
    );
};

export default Card;
