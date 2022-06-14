import React, { FC, useContext } from 'react';
import s from './Game.module.css';
import gs from '../../global.module.css';
import Input from '../../components/Input/Input';
import clsx from 'clsx';
import { GameStateContext, SocketContext } from '../../context/Context';
import { SOCKET_EVENT } from '../../context/Provider';
import Timer from '../../components/Timer/Timer';
import { ColumnContainer } from '../../components/Container';
import PlayerLabel from '../../components/PlayerLabel/PlayerLabel';
import WordList from '../../components/WordList/WordList';

const Game: FC = () => {
    const socket = useContext(SocketContext);
    const { gameState } = useContext(GameStateContext);

    const player = gameState?.player;
    const opponent = gameState?.opponent;
    const playerWords = player?.guessedWords || [];
    const opponentWords = opponent?.guessedWords || [];
    const currentWord = gameState?.currentWord;
    const roundTime = gameState?.roundTime;
    const initiationTime = gameState?.initiationTime;

    const guessWord = (word: string) => socket.emit(SOCKET_EVENT.guessWord, word);

    return (
        <>
            <div className={gs.column}>
                <div className={clsx(s.titleContainer, gs.defaultCursor)}>
                    <div className={clsx(gs.colorGray, gs.textAlignCenter)}>Find the words in</div>
                    <div className={s.title}>{currentWord ? currentWord : '...'}</div>
                </div>

                <div className={clsx(gs.spaceBetween, gs.centerHorizontal)}>
                    <PlayerLabel name="You" score={player?.points} />

                    <ColumnContainer>
                        <Input
                            size="large"
                            uppercase={true}
                            placeholder="Write here"
                            onEnter={(word) => guessWord(word)}
                            clearOnEnter={true}
                        />
                    </ColumnContainer>

                    <PlayerLabel name="Opponent" score={opponent?.points} />
                </div>

                <div className={clsx(gs.spaceBetween, gs.defaultCursor)}>
                    <WordList words={playerWords} />

                    <ColumnContainer>
                        <Timer
                            timeLeft={initiationTime ? initiationTime : roundTime}
                            label={initiationTime ? 'Game starting in' : 'Time left'}
                            enableAnimation={initiationTime ? true : roundTime <= 10}
                        />
                    </ColumnContainer>

                    <WordList words={opponentWords} />
                </div>
            </div>
        </>
    );
};

export default Game;
