import { ITile, tilePart, tileNeighbors } from '../models';
import { RoadTile } from '../road-tile/road-tile';
import { TreeTile } from '../tree-tile/tree-tile';

export class MapGenerator {
    private tiles: ITile[] = [new RoadTile(), new TreeTile()];
    private tileSize: number = 17;
    constructor(private width: number, private height: number) {}

    public generateMap() {
        const mapConfig = [];

        for (let yCoordinate = 0; yCoordinate < this.height; yCoordinate++) {
            mapConfig[yCoordinate] = [];
            for (let xCoordinate = 0; xCoordinate < this.width; xCoordinate++) {
                const neighbors = this.getNeighbors(mapConfig, xCoordinate, yCoordinate);
                const drawnTile = this.tiles.find((tile, index) =>
                    this.isTileDrawn(tile.calculateChance(neighbors), index === this.tiles.length - 1)
                );
                mapConfig[yCoordinate].push(drawnTile.findCorrectTile(neighbors));
            }
        }

        return { land: mapConfig, tileSize: this.tileSize };
    }

    private getNeighbors(mapConfig: any[], xCoordinate: number, yCoordinate: number): tileNeighbors {
        const neighbors: tileNeighbors = { upNeighbor: null, leftNeighbor: null };
        if (yCoordinate - 1 >= 0) {
            neighbors.upNeighbor = mapConfig[yCoordinate - 1][xCoordinate];
        }
        if (xCoordinate - 1 >= 0) {
            neighbors.leftNeighbor = mapConfig[yCoordinate][xCoordinate - 1];
        }
        return neighbors;
    }

    private isTileDrawn(chance: number, isLastTIle: boolean) {
        if (isLastTIle) {
            return true;
        }

        return Math.random() <= chance;
    }
}
