import React, { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import gs from '../global.module.css';

export const CenterContainer: FC<PropsWithChildren> = ({ children }) => (
    <div style={{ paddingTop: '10rem' }} className={clsx(gs.centerHorizontal, gs.centerVertical, gs.column)}>
        {children}
    </div>
);

export const ColumnContainer: FC<PropsWithChildren> = ({ children }) => (
    <div className={clsx(gs.fullWidth, gs.column)}>{children}</div>
);
