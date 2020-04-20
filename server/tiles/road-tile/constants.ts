import { tileInfo } from '../models';

const road_part_1: tileInfo = { x: 0, y: 0, isBarrier: false, possibleWays: { down: [], right: [] } };
const road_part_2: tileInfo = { x: 1, y: 0, isBarrier: false, possibleWays: { down: [], right: [] } };
const road_part_3: tileInfo = { x: 2, y: 0, isBarrier: false, possibleWays: { down: [], right: [] } };
const road_part_4: tileInfo = { x: 0, y: 1, isBarrier: false, possibleWays: { down: [], right: [] } };
const road_part_5: tileInfo = { x: 1, y: 1, isBarrier: false, possibleWays: { down: [], right: [] } };
const road_part_6: tileInfo = { x: 2, y: 1, isBarrier: false, possibleWays: { down: [], right: [] } };
const road_part_7: tileInfo = { x: 0, y: 2, isBarrier: false, possibleWays: { down: [], right: [] } };
const road_part_8: tileInfo = { x: 1, y: 2, isBarrier: false, possibleWays: { down: [], right: [] } };
const road_part_9: tileInfo = { x: 2, y: 2, isBarrier: false, possibleWays: { down: [], right: [] } };

export const export_road_part_1 = JSON.parse(JSON.stringify(road_part_1));
export const export_road_part_2 = JSON.parse(JSON.stringify(road_part_2));
export const export_road_part_3 = JSON.parse(JSON.stringify(road_part_3));
export const export_road_part_4 = JSON.parse(JSON.stringify(road_part_4));
export const export_road_part_5 = JSON.parse(JSON.stringify(road_part_5));
export const export_road_part_6 = JSON.parse(JSON.stringify(road_part_6));
export const export_road_part_7 = JSON.parse(JSON.stringify(road_part_7));
export const export_road_part_8 = JSON.parse(JSON.stringify(road_part_8));
export const export_road_part_9 = JSON.parse(JSON.stringify(road_part_9));

export_road_part_1.possibleWays.down.push(road_part_4, road_part_7);
export_road_part_1.possibleWays.right.push(road_part_2, road_part_3);

export_road_part_2.possibleWays.down.push(road_part_5, road_part_8);
export_road_part_2.possibleWays.right.push(road_part_2, road_part_3);

export_road_part_3.possibleWays.down.push(road_part_6, road_part_9);

export_road_part_4.possibleWays.down.push(road_part_4, road_part_7);
export_road_part_4.possibleWays.right.push(road_part_5, road_part_6);

export_road_part_5.possibleWays.down.push(road_part_5, road_part_8);
export_road_part_5.possibleWays.right.push(road_part_5, road_part_6);

export_road_part_6.possibleWays.down.push(road_part_6, road_part_9);

export_road_part_7.possibleWays.right.push(road_part_8, road_part_9);

export_road_part_8.possibleWays.right.push(road_part_8, road_part_9);

//TODO REMOVE THIS CONST

const defaultTile: tileInfo = {
    x: 9,
    y: 1,
    isBarrier: false,
    possibleWays: { down: [], right: [] },
};

export const export_defaultTile = JSON.parse(JSON.stringify(defaultTile));
