const app = require('express')();
const server = require('http').Server(app);
const cors = require('cors');
const PORT = 8081;
const io = require('socket.io')(server);
const fs = require('fs');
let gameSocket;

app.use(cors());

app.get('/source_map', (req, res) => {
    fs.createReadStream('./resources/lands/tilemap.png').pipe(res);
});

const gameCoordinator = io.on('connection', (socket) => {
    gameSocket = socket;

    gameSocket.emit('data', {
        tileSize: 16,
        land: [{ tile_x: 0, tile_y: 0, map_x: 0, map_y: 0 }],
    });
});

server.listen(PORT);
