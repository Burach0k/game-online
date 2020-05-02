import { tilePart } from '../models';

export const FOREST = {
    green: {
        PART_1: { tileX: 18, tileY: 8, isBarrier: true, strength: 50 },
        PART_2: { tileX: 19, tileY: 8, isBarrier: true, strength: 50 },
        PART_3: { tileX: 20, tileY: 8, isBarrier: true, strength: 50 },
        PART_4: { tileX: 18, tileY: 9, isBarrier: true, strength: 50 },
        PART_5: { tileX: 19, tileY: 9, isBarrier: true, strength: 50 },
        PART_6: { tileX: 20, tileY: 9, isBarrier: true, strength: 50 },
        PART_7: { tileX: 18, tileY: 10, isBarrier: true, strength: 50 },
        PART_8: { tileX: 19, tileY: 10, isBarrier: true, strength: 50 },
        PART_9: { tileX: 20, tileY: 10, isBarrier: true, strength: 50 },
    },
    orange: {
        PART_1: { tileX: 18, tileY: 11, isBarrier: true, strength: 50 },
        PART_2: { tileX: 19, tileY: 11, isBarrier: true, strength: 50 },
        PART_3: { tileX: 20, tileY: 11, isBarrier: true, strength: 50 },
        PART_4: { tileX: 18, tileY: 12, isBarrier: true, strength: 50 },
        PART_5: { tileX: 19, tileY: 12, isBarrier: true, strength: 50 },
        PART_6: { tileX: 20, tileY: 12, isBarrier: true, strength: 50 },
        PART_7: { tileX: 18, tileY: 13, isBarrier: true, strength: 50 },
        PART_8: { tileX: 19, tileY: 13, isBarrier: true, strength: 50 },
        PART_9: { tileX: 20, tileY: 13, isBarrier: true, strength: 50 },
    },
};

const FOREST_2_PART_1: tilePart = { tileX: 16, tileY: 8, isBarrier: true, strength: 50 };
const FOREST_2_PART_2: tilePart = { tileX: 16, tileY: 9, isBarrier: true, strength: 50 };

const FOREST_3_PART_1: tilePart = { tileX: 17, tileY: 8, isBarrier: true, strength: 50 };
const FOREST_3_PART_2: tilePart = { tileX: 17, tileY: 9, isBarrier: true, strength: 50 };

export const TINI_TREE = [[FOREST_2_PART_1], [FOREST_2_PART_2]];

export const BIG_TREE = [[FOREST_3_PART_1], [FOREST_3_PART_2]];
