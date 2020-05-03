"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var constants_1 = require("./constants");
var big_title_1 = require("../big-title");
var ForestTile = /** @class */ (function (_super) {
    __extends(ForestTile, _super);
    function ForestTile(color, width, height) {
        var _this = _super.call(this, width, height, constants_1.FOREST[color]) || this;
        _this.color = color;
        return _this;
    }
    ForestTile.prototype.getForest = function () {
        this.forest = this.getRandomFigure(this.width, this.height);
        return this.forest;
    };
    return ForestTile;
}(big_title_1.BigTitle));
exports.ForestTile = ForestTile;
