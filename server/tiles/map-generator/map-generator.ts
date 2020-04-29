import { tilePart } from '../models';
import { getRandomNumber } from '../../helpers/randomizer';
import { ROAD_TILE_5 } from '../road-tile/constants';
import { ForestTile } from '../forest-tile/forest-tile';
import { TINI_TREE, BIG_TREE } from '../forest-tile/constants';

export class MapGenerator {
    private tileSize: number = 17;
    constructor(private width: number, private height: number) {}

    public generateMap() {
        let mapConfig = this.createSpaceMap(this.width, this.height);

        const countObstruction = getRandomNumber(15, 30);

        for (let i = 0; i < countObstruction; i++) {
            const x = getRandomNumber(0, this.width);
            const y = getRandomNumber(0, this.height);
            this.includeTiles(x, y, TINI_TREE, mapConfig);
        }

        for (let i = 0; i < countObstruction; i++) {
            const x = getRandomNumber(0, this.width);
            const y = getRandomNumber(0, this.height);
            this.includeTiles(x, y, BIG_TREE, mapConfig);
        }

        for (let i = 2; i < 5; i++) {
            const forestWidth = getRandomNumber(15, 30);
            const forestHeight = getRandomNumber(15, 30);
            const forestColor = getRandomNumber(0, 1) === 0 ? 'green' : 'orange';
            const forest = new ForestTile(forestColor, forestWidth, forestHeight);

            const x = getRandomNumber(0, this.width);
            const y = getRandomNumber(0, this.height);
            this.includeTiles(x, y, forest.getForest(), mapConfig);
        }

        return { land: mapConfig, tileSize: this.tileSize };
    }

    private includeTiles(x0: number, y0: number, obstruction: tilePart[][] | null[][], map: tilePart[][]) {
        const isRightMapEdge = x0 + obstruction.length > map.length;
        const isBottomMapEdge = y0 + obstruction[0].length > map[0].length;

        const xl = isRightMapEdge ? map.length : x0 + obstruction.length;
        const yl = isBottomMapEdge ? map.length : y0 + obstruction[0].length;

        for (let i = x0; i < xl; i++) {
            for (let j = y0; j < yl; j++) {
                if (obstruction[i - x0][j - y0]) {
                    map[i][j] = obstruction[i - x0][j - y0];
                }
            }
        }
    }

    private createSpaceMap(width: number, height: number): null[][] {
        const spaceMap = [];

        for (let i = 0; i < width; i++) {
            spaceMap[i] = [];

            for (let j = 0; j < height; j++) {
                spaceMap[i][j] = ROAD_TILE_5;
            }
        }

        return spaceMap;
    }
}
