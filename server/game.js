const gameData = require('./gameData/gameData.json');

class Player {
    constructor() {
        this.id = null;
        this.disconnected = false;
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
            gameStarted: false,
            gameEnded: false,
            player1: new Player(),
            player2: new Player(),
        };
    }

    getPlayers() {
        return [this.gameState.player1, this.gameState.player2];
    }

    update() {
        if (this.gameState.gameEnded || !this.gameState.gameStarted) return;

        if (this.gameState.initiationTime > 0) {
            this.gameState.initiationTime--;
        } else {
            if (this.gameState.roundTime > 0) {
                this.gameState.roundTime--;
            } else {
                const p1Points = this.gameState.player1.points;
                const p2Points = this.gameState.player2.points;

                if (p1Points > p2Points) this.gameState.player1.winner = true;
                else if (p1Points < p2Points) this.gameState.player2.winner = true;

                this.gameState.gameEnded = true;
            }
        }
    }

    guessWord(playerId, word) {
        if (this.gameState.initiationTime > 0) return;

        for (const [i, player] of this.getPlayers().entries()) {
            if (player.id === playerId && this.#correctWords.includes(word.toUpperCase())) {
                const key = 'player' + (i + 1);

                this.gameState[key].guessedWords.push(word);
                this.gameState[key].points += word.length;
                this.gameState.roundTime = 30;
            }
        }
    }

    playerJoin(id) {
        for (const [i, player] of this.getPlayers().entries()) {
            const index = i + 1;
            const key = 'player' + index;

            if (!player.id) {
                this.gameState[key].id = id;

                break;
            } else if (player.disconnected) {
                this.gameState[key].id = id;
                this.gameState[key].disconnected = false;

                break;
            }
        }
    }

    playerLeave(id) {
        for (const [i, player] of this.getPlayers().entries()) {
            if (id === player.id) {
                this.gameState['player' + (i + 1)].disconnected = true;

                break;
            }
        }
    }

    setPlayerReady(id) {
        for (const [i, player] of this.getPlayers().entries()) {
            if (id === player.id) {
                this.gameState['player' + (i + 1)].ready = true;

                break;
            }
        }

        if (!this.gameState.gameStarted && this.gameState.player1.ready && this.gameState.player2.ready) {
            this.gameState.gameStarted = true;
        }
    }
}

module.exports = { Game, Player };
