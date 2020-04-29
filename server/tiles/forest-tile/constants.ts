import { tilePart } from '../models';

export const FOREST = {
    green: {
        PART_1: { tileX: 18, tileY: 8 },
        PART_2: { tileX: 19, tileY: 8 },
        PART_3: { tileX: 20, tileY: 8 },
        PART_4: { tileX: 18, tileY: 9 },
        PART_5: { tileX: 19, tileY: 9 },
        PART_6: { tileX: 20, tileY: 9 },
        PART_7: { tileX: 18, tileY: 10 },
        PART_8: { tileX: 19, tileY: 10 },
        PART_9: { tileX: 20, tileY: 10 },
    },
    orange: {
        PART_1: { tileX: 18, tileY: 11 },
        PART_2: { tileX: 19, tileY: 11 },
        PART_3: { tileX: 20, tileY: 11 },
        PART_4: { tileX: 18, tileY: 12 },
        PART_5: { tileX: 19, tileY: 12 },
        PART_6: { tileX: 20, tileY: 12 },
        PART_7: { tileX: 18, tileY: 13 },
        PART_8: { tileX: 19, tileY: 13 },
        PART_9: { tileX: 20, tileY: 13 },
    },
};

const FOREST_2_PART_1: tilePart = { tileX: 16, tileY: 8 };
const FOREST_2_PART_2: tilePart = { tileX: 16, tileY: 9 };

const FOREST_3_PART_1: tilePart = { tileX: 17, tileY: 8 };
const FOREST_3_PART_2: tilePart = { tileX: 17, tileY: 9 };

export const TINI_TREE = [[FOREST_2_PART_1], [FOREST_2_PART_2]];

export const BIG_TREE = [[FOREST_3_PART_1], [FOREST_3_PART_2]];
