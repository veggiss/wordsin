import React, { FC } from 'react';
import s from './Game.module.css';
import gs from '../../global.module.css';
import Input from '../../components/Input/Input';
import clsx from 'clsx';

const Game: FC = () => {
    const textList: string[] = [];

    return (
        <>
            <div className={gs.column}>
                <div className={clsx(s.titleContainer, gs.defaultCursor)}>
                    <div className={s.label}>Find the words in</div>
                    <div className={s.title}>WORD</div>
                </div>

                <div className={gs.centerHorizontal}>
                    <Input
                        size="large"
                        uppercase={true}
                        placeholder="Write here"
                        onChange={(e) => console.log('change', e)}
                        //onEnter={(e) => setTextList([e, ...textList])}
                        clearOnEnter={true}
                    />
                </div>

                <div className={clsx(gs.spaceBetween, gs.defaultCursor)}>
                    <div className={gs.fullWidth}>
                        {textList.map((item, index) => (
                            <div
                                key={`${item}_${index}`}
                                className={clsx(gs.fontLarge, gs.uppercase, gs.textAlignCenter)}
                            >
                                {item}
                            </div>
                        ))}
                    </div>

                    <div className={gs.fullWidth}>
                        {textList.map((item, index) => (
                            <div
                                key={`${item}_${index}`}
                                className={clsx(gs.fontLarge, gs.uppercase, gs.textAlignCenter)}
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Game;
