import { ITile, tilePart, tileInfo, tileNeighbors } from '../models';
import { TREE_TILE_1, TREE_TILE_2 } from './constants';

export class TreeTile implements ITile {
    private defaultChance: number = 0.7;
    public calculateChance(neighbors: tileNeighbors): number {
        if (neighbors.upNeighbor === TREE_TILE_1) {
            return 1;
        } else {
            return this.defaultChance;
        }
    }

    public findCorrectTile(neighbors: tileNeighbors): tileInfo {
        if (neighbors.upNeighbor === TREE_TILE_1) {
            return TREE_TILE_2;
        }

        return TREE_TILE_1;
    }
}
