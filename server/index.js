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
};

const games = [];

app.use(express.json());
app.use(express.static('build'));

setInterval(() => {
    games.forEach((game) => {
        if (game.gameState.gameStarted) {
            game.update();

            io.in(game.gameState.roomId).emit(EVENTS.gameTick, game.gameState.roundTime);
        }
    });
}, 1000);

const emitGameState = (game) => io.in(game.gameState.roomId).emit(EVENTS.gameState, game.gameState);
const gameExist = (roomId) => games.some((game) => game.gameState.roomId === roomId);

const getRoom = (roomId) => io.sockets.adapter.rooms.get(roomId);
const getGameFromRoomId = (roomId) => games.find((game) => game.gameState.roomId === roomId);
const getGameFromClientId = (clientId) =>
    games.find((game) => [game.gameState.player1.id, game.gameState.player2.id].some((id) => clientId === id));

app.all('*', (req, res) => {
    res.sendFile(HTML_FILE, (err) => {
        if (err) res.status(500).send(err);
    });
});

io.on(EVENTS.connection, (socket) => {
    socket.on(EVENTS.joinRoom, (roomId) => {
        const game = getGameFromRoomId(roomId);
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
            games.push(newGame);

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
