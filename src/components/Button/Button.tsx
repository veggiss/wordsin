import React, { FC, PropsWithChildren } from 'react';
import s from './Button.module.css';
import gs from '../../global.module.css';
import clsx from 'clsx';

interface Props extends PropsWithChildren {
    variant: 'light' | 'dark';
    onClick?: () => void;
}

const Button: FC<Props> = ({ children, onClick, variant = 'dark' }) => {
    return (
        <button
            onClick={() => onClick && onClick()}
            className={clsx(s.button, gs.uppercase, gs.textAlignCenter, {
                [s.dark]: variant === 'dark',
                [s.light]: variant === 'light',
            })}
        >
            {children}
        </button>
    );
};

export default Button;
