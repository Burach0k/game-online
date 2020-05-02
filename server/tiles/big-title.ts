import { tilePart, forestOutline } from './models';
import { getRandomNumber } from '../helpers/randomizer';
import { figures } from './random-figures';

export class BigTitle {
    constructor(protected width: number, protected height: number, protected tilePack: any) {}

    getElementsPosition(array: Array<Array<tilePart | null>>): forestOutline {
        const outline: forestOutline = {
            top: [],
            left: [],
            right: [],
            bottom: [],
        };

        for (let j = 0; j < array[0].length; j++) {
            for (let i = 0; i < array.length; i++) {
                const position = { tileX: i, tileY: j };

                if (array[i][j]) {
                    if (i > 0) {
                        if (array[i - 1][j] === null) outline.top.push(position);
                    } else {
                        outline.top.push(position);
                    }

                    if (i < array.length - 1) {
                        if (array[i + 1][j] === null) outline.bottom.push(position);
                    } else {
                        outline.bottom.push(position);
                    }
                }
            }
        }

        array.forEach((line, i) => {
            line.forEach((cell, j) => {
                const position = { tileX: i, tileY: j };

                if (cell) {
                    if (j > 0) {
                        if (array[i][j - 1] === null) outline.left.push(position);
                    } else {
                        outline.left.push(position);
                    }

                    if (j < line.length - 1) {
                        if (array[i][j + 1] === null) outline.right.push(position);
                    } else {
                        outline.right.push(position);
                    }
                }
            });
        });

        return outline;
    }

    getRandomFigure(width: number, height: number): Array<Array<tilePart | null>> {
        const key = Object.keys(figures)[getRandomNumber(0, Object.keys(figures).length - 1)];

        let randomFigure = this.resize(figures[key], height, width);

        randomFigure = randomFigure.map((line) => line.map((cell) => (cell === 1 ? this.tilePack.PART_5 : null)));

        return randomFigure;
    }

    resize(template: Array<Array<0 | 1>>, CoefW: number, CoefH: number) {
        const initialLength = template[0].length;
        const newLength = Math.ceil(initialLength * CoefW);
        const step = Math.floor((newLength - 2) / (initialLength - 1));

        const resizeArray = template.map((arrayInside) => {
            let line = new Array(newLength).fill(null);

            line = line.map((elem, index) => {
                if (index === 0) {
                    return arrayInside[0];
                } else if (index === newLength - 1) {
                    return arrayInside[initialLength - 1];
                } else if (!(index % step)) {
                    return arrayInside[index / step];
                } else {
                    return null;
                }
            });

            line.forEach((elem, index) => {
                if (elem == null) {
                    line[index] = line[index - 1];
                }
            });

            return line;
        });

        if (CoefH) {
            return this.reverseArray(this.resize(this.reverseArray(resizeArray), CoefH, 0));
        } else {
            return resizeArray;
        }
    }

    reverseArray(initialArray) {
        let reversedArray = new Array(initialArray[0].length).fill(new Array(initialArray.length).fill(null));

        reversedArray.forEach((elem, index) => {
            reversedArray[index] = elem.map((_, innerIndex) => initialArray[innerIndex][index]);
        });

        return reversedArray;
    }

    createOutline(mapTitles: Array<Array<tilePart>>) {
        const outlineInfo: forestOutline = this.getElementsPosition(mapTitles);

        outlineInfo.top.forEach((cell) => {
            mapTitles[cell.tileX][cell.tileY] = this.tilePack.PART_2;
        });

        outlineInfo.bottom.forEach((cell) => {
            mapTitles[cell.tileX][cell.tileY] = this.tilePack.PART_8;
        });

        outlineInfo.left.forEach((cell) => {
            mapTitles[cell.tileX][cell.tileY] = this.tilePack.PART_4;
        });

        outlineInfo.right.forEach((cell) => {
            mapTitles[cell.tileX][cell.tileY] = this.tilePack.PART_6;
        });
    }
}
