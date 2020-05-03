"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var models_1 = require("../models");
var randomizer_1 = require("../../helpers/randomizer");
var constants_1 = require("../road-tile/constants");
var forest_tile_1 = require("../forest-tile/forest-tile");
var constants_2 = require("../forest-tile/constants");
var river_tile_1 = require("../river-tile/river-tile");
var constants_3 = require("../river-tile/constants");
var MapGenerator = /** @class */ (function () {
    function MapGenerator(width, height) {
        this.width = width;
        this.height = height;
        this.tileSize = 17;
        this.mapConfig = [];
        this.objectMapInformaition = [];
        this.mapConfig = this.createSpaceMap(this.width, this.height, constants_1.ROAD_TILE_5);
    }
    MapGenerator.prototype.getMap = function () {
        return { land: this.mapConfig, tileSize: this.tileSize };
    };
    MapGenerator.prototype.includeInMap = function () {
        var _this = this;
        this.objectMapInformaition.forEach(function (info) {
            _this.includeTiles(info.x0, info.y0, info.obstruction, _this.mapConfig);
        });
    };
    MapGenerator.prototype.concatGeneratedObject = function () {
        var _this = this;
        this.objectMapInformaition.forEach(function (inner) {
            _this.concatOverlayObject(inner);
        });
    };
    MapGenerator.prototype.amputateGeneratedObject = function () {
        var _this = this;
        this.objectMapInformaition.forEach(function (inner) {
            _this.amputateObject(inner);
        });
    };
    MapGenerator.prototype.amputateObject = function (inner) {
        var _this = this;
        var overlayelements = this.objectMapInformaition
            .filter(function (o) { return o.type !== 'tree'; })
            .filter(function (o) { return o.type !== inner.type; })
            .filter(function (outsider) { return _this.isOverlay(inner, outsider); });
        overlayelements.forEach(function (el) {
            for (var i = 0; i < inner.obstruction.length; i++) {
                for (var j = 0; j < inner.obstruction[0].length; j++) {
                    if (inner.obstruction[i][j]) {
                        var absoluteX = j + inner.x0;
                        var absoluteY = i + inner.y0;
                        var obj2j = absoluteX - el.x0;
                        var obj2i = absoluteY - el.y0;
                        if (obj2i >= 0 && obj2j >= 0 && el.obstruction[obj2i] && el.obstruction[obj2i][obj2j])
                            inner.obstruction[i][j] = null;
                    }
                }
            }
        });
        if (overlayelements.length > 0) {
            this.concatOverlayObject(inner);
        }
    };
    MapGenerator.prototype.addMapObject = function (name, count) {
        var tile = null;
        switch (name) {
            case models_1.mapObjectInformation.forest:
                var forestWidth = randomizer_1.getRandomNumber(2, 4);
                var forestHeight = randomizer_1.getRandomNumber(2, 4);
                var forest = new forest_tile_1.ForestTile('green', forestWidth, forestHeight);
                tile = forest.getForest();
                break;
            case models_1.mapObjectInformation.tree:
                tile = constants_2.TINI_TREE;
                break;
            case models_1.mapObjectInformation.river:
                var riverWidth = randomizer_1.getRandomNumber(2, 4);
                var rivertHeight = randomizer_1.getRandomNumber(2, 4);
                var river = new river_tile_1.RiverTile(riverWidth, rivertHeight);
                tile = river.getRiver();
                break;
        }
        this.addTexture(count, tile, name);
        return this;
    };
    MapGenerator.prototype.createObjectOutline = function () {
        var _this = this;
        this.objectMapInformaition.forEach(function (info) {
            _this.createOutline(info.obstruction, info.type);
        });
    };
    MapGenerator.prototype.isOverlay = function (obj1, obj2) {
        for (var i = 0; i < obj1.obstruction.length; i++) {
            for (var j = 0; j < obj1.obstruction[0].length; j++) {
                if (obj1.obstruction[i][j]) {
                    var absoluteX = j + obj1.x0;
                    var absoluteY = i + obj1.y0;
                    var obj2j = absoluteX - obj2.x0;
                    var obj2i = absoluteY - obj2.y0;
                    if (obj2i >= 0 && obj2j >= 0 && obj2.obstruction[obj2i] && obj2.obstruction[obj2i][obj2j])
                        return true;
                }
            }
        }
        return false;
    };
    MapGenerator.prototype.concatOverlayObject = function (inner) {
        var _this = this;
        var overlayelements = this.objectMapInformaition
            .filter(function (o) { return o.type !== 'tree'; })
            .filter(function (o) { return o.type === inner.type; })
            .filter(function (o) { return o.id !== inner.id; })
            .filter(function (outsider) { return _this.isOverlay(inner, outsider); });
        overlayelements.forEach(function (el) {
            var obj1 = _this.objectMapInformaition.findIndex(function (obj) { return obj.id === el.id; });
            var lll = _this.objectMapInformaition.findIndex(function (inf) { return inf.id === inner.id; });
            var size = {
                x0: el.x0 < inner.x0 ? el.x0 : inner.x0,
                xl: el.xl > inner.xl ? el.xl : inner.xl,
                y0: el.y0 < inner.y0 ? el.y0 : inner.y0,
                yl: el.yl > inner.yl ? el.yl : inner.yl
            };
            var aaa = _this.createSpaceMap(size.xl - size.x0 + 1, size.yl - size.y0 + 1, null);
            _this.includeTiles(el.x0 - size.x0, el.y0 - size.y0, el.obstruction, aaa);
            _this.includeTiles(inner.x0 - size.x0, inner.y0 - size.y0, inner.obstruction, aaa);
            _this.objectMapInformaition[lll] = __assign(__assign({}, size), { type: el.type, obstruction: aaa, id: _this.objectMapInformaition[lll].id });
            _this.objectMapInformaition.splice(obj1, 1);
        });
        if (overlayelements.length > 0) {
            var lll = this.objectMapInformaition.findIndex(function (inf) { return inf.id === inner.id; });
            this.concatOverlayObject(this.objectMapInformaition[lll]);
        }
    };
    MapGenerator.prototype.addTexture = function (count, obstruction, type) {
        for (var i = 0; i < count; i++) {
            var x0 = randomizer_1.getRandomNumber(0, this.width - 1);
            var y0 = randomizer_1.getRandomNumber(0, this.height - 1);
            var xl = x0 + obstruction[0].length - 1 > this.width - 1 ? this.width - 1 : x0 + obstruction[0].length - 1;
            var yl = y0 + obstruction.length - 1 > this.height - 1 ? this.height - 1 : y0 + obstruction.length - 1;
            var id = this.objectMapInformaition.length + x0 + y0;
            this.objectMapInformaition.push({ x0: x0, y0: y0, xl: xl, yl: yl, id: id, obstruction: obstruction, type: type });
        }
    };
    MapGenerator.prototype.includeTiles = function (x0, y0, obstruction, map) {
        var isRightMapEdge = x0 + obstruction[0].length > map[0].length;
        var isBottomMapEdge = y0 + obstruction.length > map.length;
        var xl = isRightMapEdge ? map[0].length : x0 + obstruction[0].length;
        var yl = isBottomMapEdge ? map.length : y0 + obstruction.length;
        for (var i = y0; i < yl; i++) {
            for (var j = x0; j < xl; j++) {
                if (obstruction[i - y0][j - x0]) {
                    map[i][j] = obstruction[i - y0][j - x0];
                }
            }
        }
    };
    MapGenerator.prototype.createSpaceMap = function (width, height, innerElement) {
        var newArray = [];
        for (var i = 0; i < width - 1; i++) {
            newArray[i] = [];
            for (var j = 0; j < height - 1; j++) {
                newArray[i][j] = innerElement;
            }
        }
        return newArray; //JSON.parse(JSON.stringify(new Array(width).fill(new Array(height).fill(innerElement))));
    };
    MapGenerator.prototype.getElementsPosition = function (array, tilePact) {
        var outline = new models_1.Outline();
        array.forEach(function (line, i) {
            line.forEach(function (cell, j) {
                var position = { tileX: i, tileY: j };
                var isLeftLineElements = j === 0 || array[i][j - 1] === null;
                var isRightLineElements = j === line.length - 1 || array[i][j + 1] === null;
                var isTopLineElements = i === 0 || array[i - 1][j] === null;
                var isBottomLineElement = i === array.length - 1 || array[i + 1][j] === null;
                if (cell) {
                    if (isLeftLineElements && !isTopLineElements && !isBottomLineElement)
                        outline.PART_4.push(position);
                    if (isRightLineElements && !isTopLineElements && !isBottomLineElement)
                        outline.PART_6.push(position);
                    if (isLeftLineElements && isBottomLineElement)
                        outline.PART_7.push(position);
                    if (isLeftLineElements && isTopLineElements)
                        outline.PART_1.push(position);
                    if (isRightLineElements && isTopLineElements)
                        outline.PART_3.push(position);
                    if (isRightLineElements && isBottomLineElement)
                        outline.PART_9.push(position);
                    if (isTopLineElements && !isLeftLineElements && !isRightLineElements)
                        outline.PART_2.push(position);
                    if (isBottomLineElement && !isRightLineElements && !isLeftLineElements)
                        outline.PART_8.push(position);
                }
            });
        });
        return outline;
    };
    MapGenerator.prototype.createOutline = function (mapTitles, type) {
        var tilePact = {};
        switch (type) {
            case 'tree':
                return;
                break;
            case 'forest':
                tilePact = constants_2.FOREST.green;
                break;
            case 'river':
                tilePact = constants_3.RIVER;
                break;
            default:
                return;
        }
        var outlineInfo = this.getElementsPosition(mapTitles, tilePact); //todo
        Object.keys(outlineInfo).forEach(function (key) {
            outlineInfo[key].forEach(function (cell) {
                mapTitles[cell.tileX][cell.tileY] = tilePact[key];
            });
        });
    };
    return MapGenerator;
}());
exports.MapGenerator = MapGenerator;
