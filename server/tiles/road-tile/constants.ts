import { tileInfo, tilePart } from '../models';

const ROAD_PART_1: tilePart = { tileX: 0, tileY: 0 };
const ROAD_PART_2: tilePart = { tileX: 1, tileY: 0 };
const ROAD_PART_3: tilePart = { tileX: 2, tileY: 0 };
const ROAD_PART_4: tilePart = { tileX: 0, tileY: 1 };
const ROAD_PART_5: tilePart = { tileX: 1, tileY: 1 };
const ROAD_PART_6: tilePart = { tileX: 2, tileY: 1 };
const ROAD_PART_7: tilePart = { tileX: 0, tileY: 2 };
const ROAD_PART_8: tilePart = { tileX: 1, tileY: 2 };
const ROAD_PART_9: tilePart = { tileX: 2, tileY: 2 };

export const ROAD_TILE_1: tileInfo = {
    ...ROAD_PART_1,
    isBarrier: false,
    possibleWays: { down: [ROAD_PART_4, ROAD_PART_7], right: [ROAD_PART_2, ROAD_PART_3] },
};
export const ROAD_TILE_2: tileInfo = {
    ...ROAD_PART_2,
    isBarrier: false,
    possibleWays: { down: [ROAD_PART_5, ROAD_PART_8], right: [ROAD_PART_2, ROAD_PART_3] },
};
export const ROAD_TILE_3: tileInfo = { ...ROAD_PART_3, isBarrier: false, possibleWays: { down: [ROAD_PART_6, ROAD_PART_9], right: [] } };
export const ROAD_TILE_4: tileInfo = {
    ...ROAD_PART_4,
    isBarrier: false,
    possibleWays: { down: [ROAD_PART_4, ROAD_PART_7], right: [ROAD_PART_5, ROAD_PART_6] },
};
export const ROAD_TILE_5: tileInfo = {
    ...ROAD_PART_5,
    isBarrier: false,
    possibleWays: { down: [ROAD_PART_5, ROAD_PART_8], right: [ROAD_PART_5, ROAD_PART_6] },
};
export const ROAD_TILE_6: tileInfo = {
    ...ROAD_PART_6,
    isBarrier: false,
    possibleWays: { down: [ROAD_PART_6, ROAD_PART_9], right: [] },
};
export const ROAD_TILE_7: tileInfo = { ...ROAD_PART_7, isBarrier: false, possibleWays: { down: [], right: [ROAD_PART_8, ROAD_PART_9] } };
export const ROAD_TILE_8: tileInfo = { ...ROAD_PART_8, isBarrier: false, possibleWays: { down: [], right: [] } };
export const ROAD_TILE_9: tileInfo = { ...ROAD_PART_9, isBarrier: false, possibleWays: { down: [], right: [ROAD_PART_8, ROAD_PART_9] } };
