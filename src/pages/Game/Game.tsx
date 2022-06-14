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
import Animate from '../../components/Animate/Animate';
import Button from '../../components/Button/Button';

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
    const roundStarted = gameState?.roundStarted;
    const gameEnded = gameState?.gameEnded;

    const getWinnerText = () => (player.winner ? 'You win!' : opponent.winner ? 'Opponent won!' : 'Draw!');
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
                        {roundStarted && !gameEnded ? (
                            <Animate id="input" variant="fade-in">
                                <Input
                                    size="large"
                                    uppercase={true}
                                    placeholder="Write here"
                                    onEnter={(word) => guessWord(word)}
                                    clearOnEnter={true}
                                />
                            </Animate>
                        ) : null}
                    </ColumnContainer>

                    <PlayerLabel name="Opponent" score={opponent?.points} />
                </div>

                <div className={clsx(gs.spaceBetween, gs.defaultCursor)}>
                    <WordList words={playerWords} />

                    <ColumnContainer>
                        {gameEnded ? (
                            <span className={clsx(gs.fontExtraLarge, gs.textAlignCenter, gs.colorLight)}>
                                <Animate id="win_text" text={getWinnerText()} />

                                <Animate id="play_again" variant="fade-in">
                                    <Button label="Play again" variant="light" onClick={() => location.reload()} />
                                </Animate>
                            </span>
                        ) : (
                            <Timer
                                timeLeft={roundStarted ? roundTime : initiationTime}
                                label={roundStarted ? 'Time left' : 'Game starting in'}
                                enableAnimation={roundStarted ? roundTime <= 10 : initiationTime < 5}
                            />
                        )}
                    </ColumnContainer>

                    <WordList words={opponentWords} />
                </div>
            </div>
        </>
    );
};

export default Game;
