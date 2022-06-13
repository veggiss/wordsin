import React, { FC } from 'react';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import clsx from 'clsx';
import s from './Home.module.css';
import gs from '../../global.module.css';
import Input from '../../components/Input/Input';

const Home: FC = () => {
    return (
        <div style={{ height: '85vh' }} className={clsx(gs.centerHorizontal, gs.centerVertical, gs.column)}>
            <div className={clsx(gs.fontExtraLarge, gs.pointer)}>
                <span>Words</span>
                <span className={s.in}>in</span>
            </div>

            <div className={clsx(gs.fontDefault, gs.pointer, s.subTitle)}>
                <span>Find the words within the word. Your life depends on it.</span>
            </div>

            <Card>
                <Input placeholder="Name" variant="dark" />
                <Button variant="dark">Play</Button>
            </Card>
        </div>
    );
};

export default Home;
