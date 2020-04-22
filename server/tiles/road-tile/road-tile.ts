import { ITile, tileInfo, tileVector, tileNeighbors, tilePart } from '../models';
import {
    ROAD_TILE_1,
    ROAD_TILE_2,
    ROAD_TILE_3,
    ROAD_TILE_4,
    ROAD_TILE_5,
    ROAD_TILE_6,
    ROAD_TILE_7,
    ROAD_TILE_8,
    ROAD_TILE_9,
} from './constants';
import { getRandomNumber } from '../../helpers/randomizer';

export class RoadTile implements ITile {
    private defaultChance: number = 0.1;
    private tiles: tileInfo[] = [
        ROAD_TILE_1,
        ROAD_TILE_2,
        ROAD_TILE_3,
        ROAD_TILE_4,
        ROAD_TILE_5,
        ROAD_TILE_6,
        ROAD_TILE_7,
        ROAD_TILE_8,
        ROAD_TILE_9,
    ];

    public calculateChance({ upNeighbor, leftNeighbor }: tileNeighbors): number {
        if (
            upNeighbor &&
            leftNeighbor &&
            upNeighbor.possibleWays.down.some((tile) => this.isNeighborRoad(tile)) &&
            leftNeighbor.possibleWays.right.some((tile) => this.isNeighborRoad(tile))
        ) {
            const possibleTiles = upNeighbor.possibleWays.down
                .filter((tile) => leftNeighbor.possibleWays.right.includes(tile))
                .map((possibleTile) => this.tiles.find((tile) => possibleTile.tileY === tile.tileY && possibleTile.tileX === tile.tileX));
            if (!possibleTiles.length) {
                return 0;
            }
            return 1;
        } else if (upNeighbor && upNeighbor.possibleWays.down.some((tile) => this.isNeighborRoad(tile))) {
            return 1;
        } else if (leftNeighbor && leftNeighbor.possibleWays.right.some((tile) => this.isNeighborRoad(tile))) {
            return 1;
        } else {
            return this.defaultChance;
        }
    }

    public findCorrectTile({ upNeighbor, leftNeighbor }: tileNeighbors): tileInfo {
        let possibleTiles: tileInfo[] = [];
        if (
            upNeighbor &&
            leftNeighbor &&
            upNeighbor.possibleWays.down.some((tile) => this.isNeighborRoad(tile)) &&
            leftNeighbor.possibleWays.right.some((tile) => this.isNeighborRoad(tile))
        ) {
            possibleTiles = upNeighbor.possibleWays.down
                .filter((tile) => leftNeighbor.possibleWays.right.includes(tile))
                .map((possibleTile) => this.tiles.find((tile) => possibleTile.tileY === tile.tileY && possibleTile.tileX === tile.tileX));
        } else if (upNeighbor && upNeighbor.possibleWays.down.some((tile) => this.isNeighborRoad(tile))) {
            possibleTiles = upNeighbor.possibleWays.down.map((possibleTile) =>
                this.tiles.find((tile) => possibleTile.tileY === tile.tileY && possibleTile.tileX === tile.tileX)
            );
        } else if (leftNeighbor && leftNeighbor.possibleWays.right.some((tile) => this.isNeighborRoad(tile))) {
            possibleTiles = leftNeighbor.possibleWays.right.map((possibleTile) =>
                this.tiles.find((tile) => possibleTile.tileY === tile.tileY && possibleTile.tileX === tile.tileX)
            );
        } else {
            possibleTiles = [ROAD_TILE_1, ROAD_TILE_2, ROAD_TILE_3];
        }

        return this.getRandomTitle(possibleTiles);
    }

    private isNeighborRoad(tile: tilePart): boolean {
        return Boolean(this.tiles.find((roadTIle) => roadTIle.tileX === tile.tileX && roadTIle.tileY === tile.tileY));
    }

    private getRandomTitle(tiles: tileInfo[]) {
        if (tiles.includes(ROAD_TILE_5)) {
            return ROAD_TILE_5;
        }
        return tiles[getRandomNumber(0, tiles.length - 1)];
    }
}
