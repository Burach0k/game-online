import { tilePart } from '../models';
import { RIVER } from './constants';
import { BigTitle } from '../big-title';

export class RiverTile extends BigTitle {
    public river;

    constructor(width: number, height: number) {
        super(width, height, RIVER);
    }

    getFigure(): Array<Array<tilePart>> {
        this.river = this.getRandomFigure(this.width, this.height);
        return this.river;
    }
}
