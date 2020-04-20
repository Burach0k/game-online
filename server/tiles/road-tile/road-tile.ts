import { ITile, tileInfo, tileVector } from '../models';
import {
    export_road_part_1,
    export_road_part_2,
    export_road_part_3,
    export_road_part_4,
    export_road_part_5,
    export_road_part_6,
    export_road_part_7,
    export_road_part_8,
    export_road_part_9,
    export_defaultTile,
} from './constants';
import { getRandomNumber } from '../../helpers/randomizer';

export class GreenTile implements ITile {
    private tilesCoordinates: tileInfo[] = [
        export_road_part_1,
        export_road_part_2,
        export_road_part_3,
        export_road_part_4,
        export_road_part_5,
        export_road_part_6,
        export_road_part_7,
        export_road_part_8,
        export_road_part_9,
    ];

    isDrawn() {
        return true;
    }

    getRandomTile(): tileInfo {
        const possibleTyles = this.tilesCoordinates.filter((tile) => tile.possibleWays.down.length || tile.possibleWays.right.length);
        return possibleTyles[getRandomNumber(0, possibleTyles.length - 1)];
    }

    findCorrectTyle(neighbors?: tileInfo[]): tileInfo {
        const upNeighbor = neighbors[0];
        const rightNeighbor = neighbors[1];

        if (!upNeighbor && !rightNeighbor) {
            return null;
        }

        if (upNeighbor && upNeighbor.possibleWays.down.length && rightNeighbor && rightNeighbor.possibleWays.right.length) {
            const commonTiles = upNeighbor.possibleWays.down.filter((tile) => rightNeighbor.possibleWays.right.includes(tile));
            const drawnTile = commonTiles.length ? commonTiles[getRandomNumber(0, commonTiles.length - 1)] : null;

            if (drawnTile) {
                return this.tilesCoordinates.find((tile) => tile.x === drawnTile.x && tile.y === drawnTile.y);
            }
            return export_defaultTile;
        }

        if (upNeighbor && upNeighbor.possibleWays.down.length) {
            const drawnTile = upNeighbor.possibleWays.down[getRandomNumber(0, upNeighbor.possibleWays.down.length - 1)];
            return this.tilesCoordinates.find((tile) => tile.x === drawnTile.x && tile.y === drawnTile.y);
        }
        if (rightNeighbor && rightNeighbor.possibleWays.right.length) {
            const drawnTile = rightNeighbor.possibleWays.right[getRandomNumber(0, rightNeighbor.possibleWays.right.length - 1)];
            return this.tilesCoordinates.find((tile) => tile.x === drawnTile.x && tile.y === drawnTile.y);
        }
        return null;
    }
}
