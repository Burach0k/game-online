import { MapGenerator } from './tiles/map-generator/map-generator';
import { mapObjectInformation } from './tiles/models';

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

    const mapGenerator = new MapGenerator(120, 80);
    mapGenerator
        .addMapObject(mapObjectInformation.tree, 20)
        .addMapObject(mapObjectInformation.forest, 10)
        .addMapObject(mapObjectInformation.river, 2);

    mapGenerator.concatGeneratedObject();
    mapGenerator.amputateGeneratedObject();
    mapGenerator.createObjectOutline();
    mapGenerator.includeInMap();

    gameSocket.emit('data', mapGenerator.getMap());
});

server.listen(PORT);
 