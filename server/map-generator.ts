import { GreenTile } from './tiles/road-tile/road-tile';
import { tileInfo } from './tiles/models';
import { export_defaultTile } from './tiles/road-tile/constants';

export class MapGenerator {
    private tiles = [new GreenTile()];

    constructor(public width: number, public height: number) {}

    public generateMap() {
        const mapConfig = [];

        for (let yCoordinate = 0; yCoordinate < this.height; yCoordinate++) {
            for (let xCoordinate = 0; xCoordinate < this.width; xCoordinate++) {
                const currentTile = this.tiles.find((tile) => tile.isDrawn());
                if (currentTile) {
                    const upNeighbor =
                        yCoordinate - 1 >= 0
                            ? mapConfig.find((tile) => tile.map_y === yCoordinate - 1 && tile.map_x === xCoordinate)
                            : null;
                    const rightNeighbor =
                        xCoordinate - 1 >= 0
                            ? mapConfig.find((tile) => tile.map_x === xCoordinate - 1 && tile.map_y === yCoordinate)
                            : null;

                    let drawnTile = currentTile.findCorrectTyle([upNeighbor, rightNeighbor]);

                    if (!drawnTile) {
                        drawnTile = currentTile.getRandomTile();
                    }

                    mapConfig.push({
                        tile_x: drawnTile.x,
                        tile_y: drawnTile.y,
                        map_x: xCoordinate,
                        map_y: yCoordinate,
                        possibleWays: drawnTile.possibleWays,
                    });
                } else {
                    mapConfig.push({
                        tile_x: export_defaultTile.x,
                        tile_y: export_defaultTile.y,
                        map_x: xCoordinate,
                        map_y: yCoordinate,
                        possibleWays: export_defaultTile.possibleWays,
                    });
                }
            }
        }

        return mapConfig;
    }
}
