import React, { FC, PropsWithChildren } from 'react';
import s from './Animate.module.css';
import clsx from 'clsx';

interface Props extends PropsWithChildren {
    id: string;
    text?: string | number;
    variant?: 'fade-in' | 'pulsate';
    animate?: boolean;
}

const Animate: FC<Props> = ({ id, text, children, animate = true, variant = 'pulsate' }) => {
    return (
        <div
            key={`${id}_${text}`}
            className={clsx({
                [s.pulsate]: animate && variant === 'pulsate',
                [s.fadeIn]: animate && variant === 'fade-in',
            })}
        >
            {children ? children : text}
        </div>
    );
};

export default Animate;
