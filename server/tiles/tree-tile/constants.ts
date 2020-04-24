import { tilePart, tileInfo } from '../models';

const TREE_PART_1: tilePart = { tileX: 17, tileY: 10 };
const TREE_PART_2: tilePart = { tileX: 17, tileY: 10 };

export const TREE_TILE_1: tileInfo = { ...TREE_PART_1, isBarrier: true, possibleWays: { down: [TREE_PART_1], right: [] } };
export const TREE_TILE_2: tileInfo = { ...TREE_PART_2, isBarrier: true, possibleWays: { down: [], right: [] } };
