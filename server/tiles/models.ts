export interface ITile {
    // calculate chance for drawing from 0 to 1
    calculateChance(neighbors: tileNeighbors): number;
    findCorrectTile(neighbors: tileNeighbors): tileInfo;
}

export type tileVector = {
    down: tilePart[];
    right: tilePart[];
};

export type tileNeighbors = { upNeighbor: tileInfo; leftNeighbor: tileInfo };

export type tilePart = { tileX: number; tileY: number };
export type tileInfo = tilePart & { isBarrier: boolean; possibleWays: tileVector };
