import React, { FC } from 'react';
import clsx from 'clsx';
import s from './Logo.module.css';
import gs from '../../global.module.css';

type Props = {
    label?: string;
};

const Logo: FC<Props> = ({ label }) => (
    <>
        <div className={clsx(gs.fontExtraLarge, gs.defaultCursor)}>
            <span>Words</span>
            <span className={s.in}>in</span>
        </div>

        {label ? <span className={clsx(gs.fontDefault, gs.defaultCursor, gs.colorGray)}>{label}</span> : null}
    </>
);

export default Logo;
