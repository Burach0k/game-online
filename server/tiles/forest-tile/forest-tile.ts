import { tilePart } from '../models';
import { FOREST } from './constants';
import { BigTitle } from '../big-title';
import { forestOutline } from '../models';

export class ForestTile extends BigTitle {
    public forest;
    constructor(private color: 'green' | 'orange', width: number, height: number) {
        super(width, height);
    }

    getForest(): Array<Array<tilePart>> {
        this.forest = this.getRandomFigure(this.width, this.height, 25, FOREST[this.color].PART_5);

        this.createOutline(this.forest);

        return this.forest;
    }

    createOutline(mapTitles: Array<Array<tilePart>>) {
        const outlineInfo: forestOutline = this.getElementsPosition(mapTitles);

        outlineInfo.top.forEach((cell) => {
            mapTitles[cell.tileX][cell.tileY] = FOREST[this.color].PART_2;
        });

        outlineInfo.bottom.forEach((cell) => {
            mapTitles[cell.tileX][cell.tileY] = FOREST[this.color].PART_8;
        });

        outlineInfo.right.forEach((cell) => {
            mapTitles[cell.tileX][cell.tileY] = FOREST[this.color].PART_6;
        });

        outlineInfo.left.forEach((cell) => {
            mapTitles[cell.tileX][cell.tileY] = FOREST[this.color].PART_4;
        });
    }
}
