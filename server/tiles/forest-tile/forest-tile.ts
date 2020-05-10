import { tilePart } from '../models';
import { FOREST } from './constants';
import { BigTitle } from '../big-title';

export class ForestTile extends BigTitle {
    public forest;

    constructor(width: number, height: number, private color: 'green' | 'orange' = 'green') {
        super(width, height, FOREST[color]);
    }

    getFigure(): Array<Array<tilePart>> {
        this.forest = this.getRandomFigure(this.width, this.height);
        return this.forest;
    }
}
