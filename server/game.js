const gameData = require('./gameData/gameData.json');

class Player {
    constructor() {
        this.id = null;
        this.ready = false;
        this.points = 0;
        this.winner = false;
        this.guessedWords = [];
    }
}

class Game {
    #correctWords;

    constructor(roomId) {
        const index = Math.floor(Math.random() * gameData.length);
        const data = gameData[index];

        this.#correctWords = data.result;

        this.gameState = {
            roundTime: 30,
            initiationTime: 5,
            roomId: roomId,
            currentWord: data.word,
            roundStarted: false,
            gameStarted: false,
            gameEnded: false,
            player1: new Player(),
            player2: new Player(),
        };
    }

    getPlayers() {
        return [this.gameState.player1, this.gameState.player2];
    }

    getPlayer(id) {
        return this.getPlayers().find((player) => player.id === id);
    }

    update() {
        if (this.gameState.gameEnded || !this.gameState.gameStarted) return;

        if (!this.gameState.roundStarted) {
            this.gameState.initiationTime--;

            if (this.gameState.initiationTime === 0) this.gameState.roundStarted = true;
        } else {
            if (this.gameState.roundTime > 0) {
                this.gameState.roundTime--;

                if (this.gameState.roundTime === 0) {
                    const player1 = this.gameState.player1;
                    const player2 = this.gameState.player2;

                    if (player1.points > player2.points) player1.winner = true;
                    else if (player1.points < player2.points) player2.winner = true;

                    this.gameState.gameEnded = true;
                }
            }
        }
    }

    guessWord(playerId, word) {
        if (this.gameState.initiationTime > 0) return;

        const player = this.getPlayer(playerId);

        if (player) {
            const wordUppercase = word.toUpperCase();
            const guessedWords = this.getPlayers()
                .map((player) => player.guessedWords)
                .flat();

            if (this.#correctWords.includes(wordUppercase) && !guessedWords.includes(wordUppercase)) {
                player.guessedWords.push(wordUppercase);
                player.points += word.length;
                this.gameState.roundTime = 30;
            }
        }
    }

    playerJoin(id) {
        for (const player of this.getPlayers()) {
            if (!player.id) {
                player.id = id;

                break;
            }
        }
    }

    playerLeave(id) {
        const player = this.getPlayer(id);

        if (player) {
            player.id = null;

            if (!this.gameState.gameStarted) player.ready = false;
        }
    }

    setPlayerReady(id) {
        const player = this.getPlayer(id);

        if (player) {
            player.ready = true;

            if (!this.gameState.gameStarted && this.gameState.player1.ready && this.gameState.player2.ready) {
                this.gameState.gameStarted = true;
            }
        }
    }
}

module.exports = { Game, Player };
