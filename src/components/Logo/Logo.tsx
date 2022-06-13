import React, { FC } from 'react';
import clsx from 'clsx';
import s from './Logo.module.css';
import gs from '../../global.module.css';

type Props = {
    disableSubText?: boolean;
};

const Logo: FC<Props> = ({ disableSubText }) => (
    <>
        <div className={clsx(gs.fontExtraLarge, gs.defaultCursor)}>
            <span>Words</span>
            <span className={s.in}>in</span>
        </div>

        {disableSubText ? null : (
            <span className={clsx(gs.fontDefault, gs.defaultCursor, s.subTitle)}>
                Find the words within the word. Your life depends on it.
            </span>
        )}
    </>
);

export default Logo;
