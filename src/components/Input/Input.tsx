import React, { FC, ChangeEvent, KeyboardEvent, useState } from 'react';
import s from './Input.module.css';
import gs from '../../global.module.css';
import clsx from 'clsx';

type Props = {
    placeholder?: string;
    label?: string;
    size?: 'default' | 'large';
    onChange?: (v: string) => void;
    onEnter?: (v: string) => void;
    clearOnEnter?: boolean;
    uppercase?: boolean;
    variant?: 'light' | 'dark';
};

const Input: FC<Props> = ({
    placeholder,
    label,
    onEnter,
    onChange,
    clearOnEnter = false,
    uppercase = false,
    size = 'default',
    variant = 'light',
}) => {
    const [value, setValue] = useState<string>('');

    const changeEvent = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setValue(text);

        if (onChange) onChange(text);
    };

    const keyEvent = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && (clearOnEnter || onEnter)) {
            if (onEnter) onEnter(value);
            if (clearOnEnter) setValue('');
        }
    };

    return (
        <div className={gs.column}>
            {label ? <span>Label</span> : null}
            <input
                placeholder={placeholder}
                className={clsx([
                    s.input,
                    {
                        [gs.uppercase]: uppercase,
                        [gs.fontDefault]: size === 'default',
                        [gs.fontLarge]: size === 'large',
                    },
                    {
                        [s.light]: variant === 'light',
                        [s.dark]: variant === 'dark',
                    },
                ])}
                value={value}
                onKeyPress={keyEvent}
                onChange={changeEvent}
            />
        </div>
    );
};

export default Input;
