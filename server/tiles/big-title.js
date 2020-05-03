"use strict";
exports.__esModule = true;
var randomizer_1 = require("../helpers/randomizer");
var random_figures_1 = require("./random-figures");
var BigTitle = /** @class */ (function () {
    function BigTitle(width, height, tilePack) {
        this.width = width;
        this.height = height;
        this.tilePack = tilePack;
    }
    BigTitle.prototype.getRandomFigure = function (width, height) {
        var _this = this;
        var key = Object.keys(random_figures_1.figures)[randomizer_1.getRandomNumber(0, Object.keys(random_figures_1.figures).length - 1)];
        var randomFigure = this.resize(random_figures_1.figures[key], height, width);
        randomFigure = randomFigure.map(function (line) { return line.map(function (cell) { return (cell === 1 ? _this.tilePack.PART_5 : null); }); });
        return randomFigure;
    };
    BigTitle.prototype.resize = function (template, CoefW, CoefH) {
        var initialLength = template[0].length;
        var newLength = Math.ceil(initialLength * CoefW);
        var step = Math.floor((newLength - 2) / (initialLength - 1));
        var resizeArray = template.map(function (arrayInside) {
            var line = new Array(newLength).fill(null);
            line = line.map(function (elem, index) {
                if (index === 0) {
                    return arrayInside[0];
                }
                else if (index === newLength - 1) {
                    return arrayInside[initialLength - 1];
                }
                else if (!(index % step)) {
                    return arrayInside[index / step];
                }
                else {
                    return null;
                }
            });
            line.forEach(function (elem, index) {
                if (elem == null) {
                    line[index] = line[index - 1];
                }
            });
            return line;
        });
        if (CoefH) {
            return this.reverseArray(this.resize(this.reverseArray(resizeArray), CoefH, 0));
        }
        else {
            return resizeArray;
        }
    };
    BigTitle.prototype.reverseArray = function (initialArray) {
        var reversedArray = new Array(initialArray[0].length).fill(new Array(initialArray.length).fill(null));
        reversedArray.forEach(function (elem, index) {
            reversedArray[index] = elem.map(function (_, innerIndex) { return initialArray[innerIndex][index]; });
        });
        return reversedArray;
    };
    return BigTitle;
}());
exports.BigTitle = BigTitle;
