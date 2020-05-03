"use strict";
exports.__esModule = true;
var map_generator_1 = require("./tiles/map-generator/map-generator");
var models_1 = require("./tiles/models");
var app = require('express')();
var server = require('http').Server(app);
var cors = require('cors');
var PORT = 8081;
var io = require('socket.io')(server);
var fs = require('fs');
var gameSocket;
app.use(cors());
app.get('/source_map', function (req, res) {
    fs.createReadStream('./resources/lands/tilemap.png').pipe(res);
});
var gameCoordinator = io.on('connection', function (socket) {
    gameSocket = socket;
    var mapGenerator = new map_generator_1.MapGenerator(100, 100);
    mapGenerator
        .addMapObject(models_1.mapObjectInformation.tree, 20)
        .addMapObject(models_1.mapObjectInformation.forest, 10)
        .addMapObject(models_1.mapObjectInformation.river, 2);
    mapGenerator.concatGeneratedObject();
    mapGenerator.amputateGeneratedObject();
    mapGenerator.createObjectOutline();
    mapGenerator.includeInMap();
    gameSocket.emit('data', mapGenerator.getMap());
});
server.listen(PORT);
