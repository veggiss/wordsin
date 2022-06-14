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

    const gState = {
        player: gameState?.player,
        opponent: gameState?.opponent,
        currentWord: gameState?.currentWord,
        roundTime: gameState?.roundTime,
        initiationTime: gameState?.initiationTime,
        roundStarted: gameState?.roundStarted,
        gameEnded: gameState?.gameEnded,
    };

    const getWinnerText = () =>
        gState.player.winner ? 'You win!' : gState.opponent.winner ? 'Opponent won!' : 'Draw!';
    const guessWord = (word: string) => socket.emit(SOCKET_EVENT.guessWord, word);

    return (
        <>
            <div className={gs.column}>
                <div className={clsx(s.titleContainer, gs.defaultCursor)}>
                    <div className={clsx(gs.colorGray, gs.textAlignCenter)}>Find the words in</div>
                    <div className={s.title}>{gState.currentWord ? gState.currentWord : '...'}</div>
                </div>

                <div className={clsx(gs.spaceBetween, gs.centerHorizontal)}>
                    <PlayerLabel name="You" score={gState.player?.points} />

                    <ColumnContainer>
                        {gState.roundStarted && !gState.gameEnded ? (
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

                    <PlayerLabel name="Opponent" score={gState.opponent?.points} />
                </div>

                <div className={clsx(gs.spaceBetween, gs.defaultCursor)}>
                    <WordList words={gState.player?.guessedWords || []} />

                    <ColumnContainer>
                        {gState.gameEnded ? (
                            <span className={clsx(gs.fontExtraLarge, gs.textAlignCenter, gs.colorLight)}>
                                <Animate id="win_text" text={getWinnerText()} />

                                <Animate id="play_again" variant="fade-in">
                                    <Button label="Play again" variant="light" onClick={() => location.reload()} />
                                </Animate>
                            </span>
                        ) : (
                            <Timer
                                timeLeft={gState.roundStarted ? gState.roundTime : gState.initiationTime}
                                label={gState.roundStarted ? 'Time left' : 'Game starting in'}
                                enableAnimation={
                                    gState.roundStarted ? gState.roundTime <= 10 : gState.initiationTime < 5
                                }
                            />
                        )}
                    </ColumnContainer>

                    <WordList words={gState.opponent?.guessedWords || []} />
                </div>
            </div>
        </>
    );
};

export default Game;
