import { tilePart, objectMapInformatin, mapObjectInformation, map, Outline } from '../models';
import { getRandomNumber } from '../../helpers/randomizer';
import { ROAD_TILE_5 } from '../road-tile/constants';
import { ForestTile } from '../forest-tile/forest-tile';
import { TINI_TREE, BIG_TREE, FOREST } from '../forest-tile/constants';
import { RiverTile } from '../river-tile/river-tile';
import { RIVER } from '../river-tile/constants';

export class MapGenerator {
    private tileSize: number = 17;
    private mapConfig: tilePart[][] = [];
    private objectMapInformaition: Array<objectMapInformatin> = [];

    constructor(private width: number, private height: number) {
        this.mapConfig = this.createSpaceMap(this.width, this.height, ROAD_TILE_5);
    }

    getMap(): map {
        return { land: this.mapConfig, tileSize: this.tileSize };
    }

    includeInMap(): void {
        this.objectMapInformaition.forEach((info) => {
            this.includeTiles(info.x0, info.y0, info.obstruction, this.mapConfig);
        });
    }

    concatGeneratedObject() {
        this.objectMapInformaition.forEach((inner) => {
            this.concatOverlayObject(inner);
        });
    }

    amputateGeneratedObject() {
        this.objectMapInformaition.forEach((inner) => {
            this.amputateObject(inner);
        });
    }

    amputateObject(inner: objectMapInformatin) {
        const overlayelements = this.objectMapInformaition
            .filter((o) => o.type !== 'tree')
            .filter((o) => o.type !== inner.type)
            .filter((outsider) => this.isOverlay(inner, outsider));

        overlayelements.forEach((el) => {
            for (let i = 0; i < inner.obstruction.length; i++) {
                for (let j = 0; j < inner.obstruction[0].length; j++) {
                    if (inner.obstruction[i][j]) {
                        const absoluteX = j + inner.x0;
                        const absoluteY = i + inner.y0;

                        const obj2j = absoluteX - el.x0;
                        const obj2i = absoluteY - el.y0;

                        if (obj2i >= 0 && obj2j >= 0 && el.obstruction[obj2i] && el.obstruction[obj2i][obj2j])
                            inner.obstruction[i][j] = null;
                    }
                }
            }
        });

        if (overlayelements.length > 0) {
            this.concatOverlayObject(inner);
        }
    }

    addMapObject(name: mapObjectInformation, count: number): any {
        let tile = null;

        switch (name) {
            case mapObjectInformation.forest:
                const forestWidth = getRandomNumber(2, 4);
                const forestHeight = getRandomNumber(2, 4);
                const forest = new ForestTile('green', forestWidth, forestHeight);
                tile = forest.getForest();
                break;
            case mapObjectInformation.tree:
                tile = TINI_TREE;
                break;
            case mapObjectInformation.river:
                const riverWidth = getRandomNumber(2, 4);
                const rivertHeight = getRandomNumber(2, 4);
                const river = new RiverTile(riverWidth, rivertHeight);
                tile = river.getRiver();
                break;
        }

        this.addTexture(count, tile, name);

        return this;
    }

    createObjectOutline() {
        this.objectMapInformaition.forEach((info) => {
            this.createOutline(info.obstruction, info.type);
        });
    }

    isOverlay(obj1: objectMapInformatin, obj2: objectMapInformatin): boolean {
        for (let i = 0; i < obj1.obstruction.length; i++) {
            for (let j = 0; j < obj1.obstruction[0].length; j++) {
                if (obj1.obstruction[i][j]) {
                    const absoluteX = j + obj1.x0;
                    const absoluteY = i + obj1.y0;

                    const obj2j = absoluteX - obj2.x0;
                    const obj2i = absoluteY - obj2.y0;

                    if (obj2i >= 0 && obj2j >= 0 && obj2.obstruction[obj2i] && obj2.obstruction[obj2i][obj2j]) return true;
                }
            }
        }

        return false;
    }

    private concatOverlayObject(inner) {
        const overlayelements = this.objectMapInformaition
            .filter((o) => o.type !== 'tree')
            .filter((o) => o.type === inner.type)
            .filter((o) => o.id !== inner.id)
            .filter((outsider) => this.isOverlay(inner, outsider));

        overlayelements.forEach((el) => {
            const obj1 = this.objectMapInformaition.findIndex((obj) => obj.id === el.id);
            const lll = this.objectMapInformaition.findIndex((inf) => inf.id === inner.id);

            const size = {
                x0: el.x0 < inner.x0 ? el.x0 : inner.x0,
                xl: el.xl > inner.xl ? el.xl : inner.xl,
                y0: el.y0 < inner.y0 ? el.y0 : inner.y0,
                yl: el.yl > inner.yl ? el.yl : inner.yl,
            };

            let aaa = this.createSpaceMap(size.xl - size.x0 + 1, size.yl - size.y0 + 1, null);

            this.includeTiles(el.x0 - size.x0, el.y0 - size.y0, el.obstruction, aaa);
            this.includeTiles(inner.x0 - size.x0, inner.y0 - size.y0, inner.obstruction, aaa);

            this.objectMapInformaition[lll] = {
                ...size,
                type: el.type,
                obstruction: aaa,
                id: this.objectMapInformaition[lll].id,
            };
            this.objectMapInformaition.splice(obj1, 1);
        });

        if (overlayelements.length > 0) {
            const lll = this.objectMapInformaition.findIndex((inf) => inf.id === inner.id);

            this.concatOverlayObject(this.objectMapInformaition[lll]);
        }
    }

    addTexture(count: number, obstruction: tilePart[][] | null[][], type: mapObjectInformation): void {
        for (let i = 0; i < count; i++) {
            const x0 = getRandomNumber(0, this.width - 1);
            const y0 = getRandomNumber(0, this.height - 1);
            const xl = x0 + obstruction[0].length - 1 > this.width - 1 ? this.width - 1 : x0 + obstruction[0].length - 1;
            const yl = y0 + obstruction.length - 1 > this.height - 1 ? this.height - 1 : y0 + obstruction.length - 1;
            const id = this.objectMapInformaition.length + x0 + y0;

            this.objectMapInformaition.push({ x0, y0, xl, yl, id, obstruction, type });
        }
    }

    private includeTiles(x0: number, y0: number, obstruction: tilePart[][] | null[][], map: tilePart[][]) {
        const isRightMapEdge = x0 + obstruction[0].length > map[0].length;
        const isBottomMapEdge = y0 + obstruction.length > map.length;

        const xl = isRightMapEdge ? map[0].length : x0 + obstruction[0].length;
        const yl = isBottomMapEdge ? map.length : y0 + obstruction.length;

        for (let i = y0; i < yl; i++) {
            for (let j = x0; j < xl; j++) {
                if (obstruction[i - y0][j - x0]) {
                    map[i][j] = obstruction[i - y0][j - x0];
                }
            }
        }
    }

    private createSpaceMap(width: number, height: number, innerElement: tilePart | null): tilePart[][] {
        let newArray = [];

        for (let i = 0; i < width - 1; i++) {
            newArray[i] = [];
            for (let j = 0; j < height - 1; j++) {
                newArray[i][j] = innerElement;
            }
        }
        return newArray; //JSON.parse(JSON.stringify(new Array(width).fill(new Array(height).fill(innerElement))));
    }

    getElementsPosition(array: Array<Array<tilePart | null>>, tilePact): Outline {
        const outline: Outline = new Outline();

        array.forEach((line, i) => {
            line.forEach((cell, j) => {
                const position = { tileX: i, tileY: j };
                const isLeftLineElements = j === 0 || array[i][j - 1] === null;
                const isRightLineElements = j === line.length - 1 || array[i][j + 1] === null;
                const isTopLineElements = i === 0 || array[i - 1][j] === null;
                const isBottomLineElement = i === array.length - 1 || array[i + 1][j] === null;

                if (cell) {
                    if (isLeftLineElements && !isTopLineElements && !isBottomLineElement) outline.PART_4.push(position);
                    if (isRightLineElements && !isTopLineElements && !isBottomLineElement) outline.PART_6.push(position);
                    if (isLeftLineElements && isBottomLineElement) outline.PART_7.push(position);
                    if (isLeftLineElements && isTopLineElements) outline.PART_1.push(position);
                    if (isRightLineElements && isTopLineElements) outline.PART_3.push(position);
                    if (isRightLineElements && isBottomLineElement) outline.PART_9.push(position);
                    if (isTopLineElements && !isLeftLineElements && !isRightLineElements) outline.PART_2.push(position);
                    if (isBottomLineElement && !isRightLineElements && !isLeftLineElements) outline.PART_8.push(position);
                }
            });
        });

        return outline;
    }

    createOutline(mapTitles: Array<Array<tilePart>>, type: 'tree' | 'forest' | 'river') {
        let tilePact: any = {};

        switch (type) {
            case 'tree':
                return;
                break;
            case 'forest':
                tilePact = FOREST.green;
                break;
            case 'river':
                tilePact = RIVER;
                break;
            default:
                return;
        }

        const outlineInfo: Outline = this.getElementsPosition(mapTitles, tilePact); //todo

        Object.keys(outlineInfo).forEach((key) => {
            outlineInfo[key].forEach((cell) => {
                mapTitles[cell.tileX][cell.tileY] = tilePact[key];
            });
        });
    }
}
