const gameData = require('./gameData/gameData.json');

class Player {
    constructor() {
        this.id = null;
        this.disconnected = false;
        this.ready = false;
        this.points = 0;
    }
}

class Game {
    constructor(roomId) {
        const index = Math.floor(Math.random() * gameData.length);
        const data = gameData[index];
        const correctWords = data.result;

        this.gameState = {
            roundTime: 30,
            initiationTimer: 5,
            roomId: roomId,
            currentWord: data.word,
            gameStarted: false,
            gameEnded: false,
            guessedWords: [],
            player1: new Player(),
            player2: new Player(),
            error: false,
        };
    }

    getPlayers() {
        return [this.gameState.player1, this.gameState.player2];
    }

    update() {
        if (this.gameState.gameEnded || !this.gameState.gameStarted) return;

        if (this.gameState.initiationTimer > 0) {
            this.gameState.initiationTimer--;
        } else {
            if (this.gameState.roundTime > 0) {
                this.gameState.roundTime--;
            } else {
                this.gameState.gameEnded = true;
            }
        }
    }

    guessWord(playerId, word) {}

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

    end() {}
}

module.exports = { Game, Player };
