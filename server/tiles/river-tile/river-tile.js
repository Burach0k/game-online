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
var RiverTile = /** @class */ (function (_super) {
    __extends(RiverTile, _super);
    function RiverTile(width, height) {
        return _super.call(this, width, height, constants_1.RIVER) || this;
    }
    RiverTile.prototype.getRiver = function () {
        this.river = this.getRandomFigure(this.width, this.height);
        return this.river;
    };
    return RiverTile;
}(big_title_1.BigTitle));
exports.RiverTile = RiverTile;
