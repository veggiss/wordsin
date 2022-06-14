const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const { Game } = require('./game');
const io = new Server(server);

const PORT = process.env.PORT || 8080;
const DIST_DIR = path.join(__dirname, '..', 'build');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const EVENTS = {
    gameTick: 'game-tick',
    createRoom: 'create-room',
    joinRoom: 'join-room',
    connection: 'connection',
    disconnect: 'disconnect',
    roomCreated: 'room-created',
    gameState: 'game-state',
    playerReady: 'player-ready',
    guessWord: 'guess-word',
};

const games = {};

app.use(express.json());
app.use(express.static('build'));

const emitGameState = (game) => io.in(game.gameState.roomId).emit(EVENTS.gameState, game.gameState);
const emitRoundTime = (game) => io.in(game.gameState.roomId).emit(EVENTS.gameTick, game.gameState.roundTime);

const pushGame = (game) => (games[game.gameState.roomId] = game);
const getGames = () => Object.values(games);
const getRoom = (roomId) => io.sockets.adapter.rooms.get(roomId);
const getGameFromClientId = (clientId) =>
    getGames().find((game) => [game.gameState.player1.id, game.gameState.player2.id].some((id) => clientId === id));

app.all('*', (req, res) => {
    res.sendFile(HTML_FILE, (err) => {
        if (err) res.status(500).send(err);
    });
});

setInterval(() => {
    getGames().forEach((game) => {
        if (game.gameState.gameStarted) {
            game.update();

            if (game.gameState.initiationTime > 0) {
                emitGameState(game);
            } else if (!game.gameState.gameEnded) {
                game.gameState.roundTime === 30 ? emitGameState(game) : emitRoundTime(game);
            } else {
                emitGameState(game);
                delete games[game.gameState.roomId];
            }
        }
    });
}, 1000);

io.on(EVENTS.connection, (socket) => {
    socket.on(EVENTS.joinRoom, (roomId) => {
        const game = games[roomId];
        const clientId = socket.client.id;

        if (game) {
            const room = getRoom(roomId);

            if (!room || (room.size < 2 && !room.has(clientId))) {
                socket.join(roomId);
                game.playerJoin(clientId);

                emitGameState(game);
            }
        } else {
            const newGame = new Game(roomId);

            newGame.playerJoin(clientId);
            pushGame(newGame);

            socket.join(roomId);
            emitGameState(newGame);
        }
    });

    socket.on(EVENTS.playerReady, () => {
        const clientId = socket.client.id;
        const game = getGameFromClientId(clientId);

        if (game) {
            game.setPlayerReady(clientId);
            emitGameState(game);
        }
    });

    socket.on(EVENTS.guessWord, (word) => {
        const clientId = socket.client.id;
        const game = getGameFromClientId(clientId);

        if (word && game) {
            game.guessWord(clientId, word);
            emitGameState(game);
        }
    });

    socket.on(EVENTS.disconnect, () => {
        const clientId = socket.client.id;
        const game = getGameFromClientId(clientId);

        if (game) {
            game.playerLeave(clientId);
            emitGameState(game);
        }
    });
});

server.listen(PORT, () => console.log(`The app server is running on port: ${PORT}`));
