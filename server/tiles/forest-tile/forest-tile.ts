import { tilePart } from '../models';
import { FOREST } from './constants';
import { BigTitle } from '../big-title';

export class ForestTile extends BigTitle {
    public forest;
    constructor(private color: 'green' | 'orange', width: number, height: number) {
        super(width, height, FOREST[color]);
    }

    getForest(): Array<Array<tilePart>> {
        this.forest = this.getRandomFigure(this.width, this.height);

        this.createOutline(this.forest);

        return this.forest;
    }
}
