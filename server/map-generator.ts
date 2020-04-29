export class MapGenerator {
    constructor(private width: number, private height: number) {}

    generate(): Array<Array<number>> {
        const startPosition = this.width / 2;
        let map: Array<Array<number>> = [];

        for (let index = 0; index < this.width; index++) {
            map[index] = [];

            for (let jindex = 0; jindex < this.height; jindex++) {
                map[index].push(0);
            }
        }

        map[0][startPosition] = 1;

        for (let index = 0; index < this.width; index++) {
            for (let jindex = 0; jindex < this.height; jindex++) {
                const info = this.getInfoAboutSector(index, jindex, map);
                
            }
        }

        return map;
    }

    getChance(elementIndex: number, elementJindex: number) {
        return {
            road: 100,
            grass: 0,
        };
    }

    getInfoAboutSector(i: number, j: number, map) {
        let info = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];

        if (i !== 0) {
            if (j !== 0) info[0][0] = map[i - 1][j - 1];
            info[0][1] = map[i - 1][j];
            if (j !== this.height - 1) info[0][2] = map[i - 1][j + 1];
        }

        if (j !== 0) info[1][0] = map[i][j - 1];
        info[1][1] = map[i][j];
        if (j !== this.height - 1) info[1][2] = map[i][j + 1];

        if (i !== this.width - 1) {
            if (j !== 0) info[2][0] = map[i + 1][j - 1];
            info[2][1] = map[i + 1][j];
            if (j !== this.height - 1) info[2][2] = map[i + 1][j + 1];
        }

        return info;
    }
}
