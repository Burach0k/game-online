import { tilePart } from './models';
import { getRandomNumber } from '../helpers/randomizer';
import { figures } from './random-figures';

export class BigTitle {
    constructor(protected width: number, protected height: number, protected tilePack: any) {}

    protected getRandomFigure(width: number, height: number): Array<Array<tilePart | null>> {
        const arrayFigures = Object.keys(figures);
        const randomTemplate = getRandomNumber(0, arrayFigures.length - 1);
        const key = arrayFigures[randomTemplate];

        let randomFigure = this.resize(figures[key], height, width);

        randomFigure = randomFigure.map((line) => line.map((cell) => (cell === 1 ? this.tilePack.PART_5 : null)));

        return randomFigure;
    }

    private resize(template: Array<Array<0 | 1>>, CoefW: number, CoefH: number) {
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

    private reverseArray(initialArray) {
        let reversedArray = new Array(initialArray[0].length).fill(new Array(initialArray.length).fill(null));

        reversedArray.forEach((elem, index) => {
            reversedArray[index] = elem.map((_, innerIndex) => initialArray[innerIndex][index]);
        });

        return reversedArray;
    }
}
