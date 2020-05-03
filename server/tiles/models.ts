export type tilePart = { tileX: number; tileY: number; isBarrier?: boolean; strength?: number };

export class Outline {
    PART_1: tilePart[];
    PART_2: tilePart[];
    PART_3: tilePart[];
    PART_4: tilePart[];
    PART_6: tilePart[];
    PART_7: tilePart[];
    PART_8: tilePart[];
    PART_9: tilePart[];

    constructor() {
        this.PART_1 = [];
        this.PART_2 = [];
        this.PART_3 = [];
        this.PART_4 = [];
        this.PART_6 = [];
        this.PART_7 = [];
        this.PART_8 = [];
        this.PART_9 = [];
    }
}

export type objectMapInformatin = {
    x0: number;
    y0: number;
    xl: number;
    yl: number;
    id: number;
    type: mapObjectInformation;
    obstruction: Array<Array<tilePart | null>>;
};

export enum mapObjectInformation {
    tree = 'tree',
    forest = 'forest',
    river = 'river',
}

export type map = { land: tilePart[][]; tileSize: number };
