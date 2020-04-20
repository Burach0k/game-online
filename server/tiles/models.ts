export interface ITile {
    isDrawn(): boolean;
    findCorrectTyle(neighbors: tileInfo[]): tileInfo;
}

export type tileVector = {
    down: tileInfo[];
    right: tileInfo[];
};

export type tileInfo = { x: number; y: number; isBarrier: boolean; possibleWays: tileVector };
