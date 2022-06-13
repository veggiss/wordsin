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
};

const games = [];

app.use(express.json());
app.use(express.static('build'));

setInterval(() => {
    games.forEach((game) => {
        game.update();

        io.in(game.gameState.roomId).emit(EVENTS.gameTick, game);
    });
}, 1000);

const roomExist = (roomId) => io.sockets.adapter.rooms.get(roomId);
const gameExist = (roomId) => games.some((game) => game.gameState.roomId === roomId);
const findGame = (roomId) => games.find((game) => game.gameState.roomId === roomId);
const findGameFromPlayer = (clientId) =>
    games.find((game) => [game.gameState.player1.id, game.gameState.player2.id].some((id) => clientId === id));

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE, (err) => {
        if (err) res.status(500).send(err);
    });
});

io.on(EVENTS.connection, (socket) => {
    socket.on(EVENTS.joinRoom, (roomId) => {
        const game = findGame(roomId);
        const clientId = socket.client.id;

        if (roomExist(roomId) && game) {
            socket.join(roomId);
            game.playerJoin(clientId);
            game.setPlayerReady(clientId);

            console.log(socket.client.id, 'joining', roomId);
        } else socket.emit('errorMessage', `Unknown room id '${roomId}'`);
    });

    socket.on(EVENTS.createRoom, () => {
        const clientId = socket.client.id;

        if (!gameExist(clientId) && !roomExist(clientId)) {
            const game = new Game(clientId);

            socket.join(clientId);
            game.playerJoin(clientId);
            game.setPlayerReady(clientId);
            games.push(game);

            console.log(clientId, 'created a room');
        } else socket.emit('errorMessage', `Room id '${clientId}' already exists`);
    });

    socket.on(EVENTS.disconnect, () => {
        const clientId = socket.client.id;
        const game = findGameFromPlayer(clientId);

        if (game) game.playerLeave(clientId);
    });
});

server.listen(PORT, () => console.log(`The app server is running on port: ${PORT}`));
