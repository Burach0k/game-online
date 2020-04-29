import { tilePart, forestOutline } from './models';
import { getRandomNumber } from '../helpers/randomizer';

export class BigTitle {
    constructor(protected width: number, protected height: number) {}

    getElementsPosition(array: Array<Array<tilePart | null>>): forestOutline {
        const outline: forestOutline = {
            top: [],
            left: [],
            right: [],
            bottom: [],
        };

        for (let j = 0; j < array[0].length; j++) {
            for (let i = 0; i < array.length; i++) {
                if (array[i][j]) {
                    if (i > 0) {
                        if (array[i - 1][j] === null) outline.top.push({ tileX: i, tileY: j });
                    } else {
                        outline.top.push({ tileX: i, tileY: j });
                    }

                    if (i < array.length - 1) {
                        if (array[i + 1][j] === null) outline.bottom.push({ tileX: i, tileY: j });
                    } else {
                        outline.bottom.push({ tileX: i, tileY: j });
                    }
                }
            }
        }

        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[0].length; j++) {
                if (array[i][j]) {
                    if (j > 0) {
                        if (array[i][j - 1] === null) outline.left.push({ tileX: i, tileY: j });
                    } else {
                        outline.left.push({ tileX: i, tileY: j });
                    }

                    if (j < array[0].length - 1) {
                        if (array[i][j + 1] === null) outline.right.push({ tileX: i, tileY: j });
                    } else {
                        outline.right.push({ tileX: i, tileY: j });
                    }
                }
            }
        }

        return outline;
    }

    getRandomFigure(width: number, height: number, holeCount: number, defaultTile: tilePart): Array<Array<tilePart | null>> {
        let randomFigure = [];

        for (let i = 0; i < width; i++) {
            randomFigure[i] = [];
            for (let j = 0; j < height; j++) {
                randomFigure[i][j] = defaultTile;
            }
        }

        for (let i = 0; i < holeCount; i++) {
            const x0 = getRandomNumber(0, width - 1);
            const y0 = getRandomNumber(0, height - 1);
            const obs = [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ];
            this.includeTiles(x0, y0, obs, randomFigure);
        }

        return randomFigure;
    }

    includeTiles(x0: number, y0: number, obstruction: Array<Array<tilePart | null>>, map: Array<Array<tilePart>>) {
        const isRightMapEdge = x0 + obstruction.length > map.length;
        const isBottomMapEdge = y0 + obstruction[0].length > map[0].length;

        const xl = isRightMapEdge ? map.length : x0 + obstruction.length;
        const yl = isBottomMapEdge ? map.length : y0 + obstruction[0].length;

        for (let i = x0; i < xl; i++) {
            for (let j = y0; j < yl; j++) {
                map[i][j] = obstruction[i - x0][j - y0];
            }
        }
    }
}
