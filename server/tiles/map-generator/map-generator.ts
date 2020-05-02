import { tilePart } from '../models';
import { getRandomNumber } from '../../helpers/randomizer';
import { ROAD_TILE_5 } from '../road-tile/constants';
import { ForestTile } from '../forest-tile/forest-tile';
import { TINI_TREE, BIG_TREE } from '../forest-tile/constants';
import { RiverTile } from '../river-tile/river-tile';

export class MapGenerator {
    private tileSize: number = 17;
    private mapConfig: tilePart[][] = [];
    constructor(private width: number, private height: number) {}

    public generateMap() {
        this.mapConfig = this.createSpaceMap(this.width, this.height);

        this.addTexture(40, TINI_TREE);
        this.addTexture(30, BIG_TREE);

        const forestWidth = getRandomNumber(2, 3);
        const forestHeight = getRandomNumber(3, 4);
        const forest = new ForestTile('green', forestWidth, forestHeight);
        this.addTexture(5, forest.getForest());

        const forestWidth2 = getRandomNumber(2, 3);
        const forestHeight2 = getRandomNumber(3, 4);
        const forest2 = new ForestTile('orange', forestWidth2, forestHeight2);
        this.addTexture(5, forest2.getForest());

        const rivertWidth = getRandomNumber(7, 9);
        const rivertHeight = getRandomNumber(3, 5);
        const river = new RiverTile(rivertWidth, rivertHeight);

        const x = getRandomNumber(0, this.width);
        const y = getRandomNumber(0, this.height);
        this.includeTiles(x, y, river.getRiver());

        return { land: this.mapConfig, tileSize: this.tileSize };
    }

    addTexture(count: number, obstruction: tilePart[][] | null[][]) {
        for (let i = 0; i < count; i++) {
            const x = getRandomNumber(0, this.width);
            const y = getRandomNumber(0, this.height);
            this.includeTiles(x, y, obstruction);
        }
    }

    getRandomPosition() {
        const x = getRandomNumber(0, this.width);
        const y = getRandomNumber(0, this.height);

        return { x, y };
    }

    private includeTiles(x0: number, y0: number, obstruction: tilePart[][] | null[][]) {
        const isRightMapEdge = x0 + obstruction.length > this.width;
        const isBottomMapEdge = y0 + obstruction[0].length > this.height;

        const xl = isRightMapEdge ? this.width : x0 + obstruction.length;
        const yl = isBottomMapEdge ? this.height : y0 + obstruction[0].length;

        for (let i = x0; i < xl; i++) {
            for (let j = y0; j < yl; j++) {
                if (obstruction[i - x0][j - y0]) {
                    this.mapConfig[i][j] = obstruction[i - x0][j - y0];
                }
            }
        }
    }

    private createSpaceMap(width: number, height: number): tilePart[][] {
        return JSON.parse(JSON.stringify(new Array(height).fill(new Array(width).fill(ROAD_TILE_5))));
    }
}
