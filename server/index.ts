import { MapGenerator } from './tiles/map-generator/map-generator';

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
    const mapGenerator = new MapGenerator(100, 100);

    gameSocket.emit('data', mapGenerator.generateMap());
});

server.listen(PORT);
