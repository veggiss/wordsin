import React, { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import gs from '../global.module.css';

const Container: FC<PropsWithChildren> = ({ children }) => (
    <div style={{ height: '85vh' }} className={clsx(gs.centerHorizontal, gs.centerVertical, gs.column)}>
        {children}
    </div>
);

export default Container;
