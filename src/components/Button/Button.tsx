import React, { FC, PropsWithChildren } from 'react';
import s from './Button.module.css';
import gs from '../../global.module.css';
import clsx from 'clsx';

interface Props {
    variant: 'light' | 'dark' | 'success';
    label: string;
    onClick?: () => void;
    disabled?: boolean;
}

const Button: FC<Props> = ({ label, onClick, disabled = false, variant = 'dark' }) => {
    return (
        <button
            onClick={() => onClick && onClick()}
            className={clsx(s.button, gs.uppercase, gs.textAlignCenter, {
                [s.dark]: variant === 'dark',
                [s.light]: variant === 'light',
                [s.success]: variant === 'success',
                [gs.pointerCursor]: !disabled,
            })}
        >
            {label}
        </button>
    );
};

export default Button;
