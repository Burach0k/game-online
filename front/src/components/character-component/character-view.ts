import { View } from '../../utils/view';
import { ICoordinates } from '../../models/tile';
import { Direction } from '../../models/direction';
import { Screen } from '../../screen/screen';
import { tileSize } from '../../consts';

export class CharacterView extends View {
  private goRightTiles: ICoordinates[] = [];
  private goLeftTiles: ICoordinates[] = [];
  private goDownTiles: ICoordinates[] = [];
  private goUpTiles: ICoordinates[] = [];

  private selectedTiles: ICoordinates[];
  private selectedIndexTile: number = 0;

  constructor(
    height: number,
    width: number,
    firstTile: ICoordinates,
    private tilesImage: HTMLImageElement
  ) {
    super(height, width);
    //TODO rewrite logic for generation ui of component
    for (let index = 0; index < 3; index++) {
      this.goLeftTiles.push({ x: firstTile.x, y: firstTile.y + index });
      this.goDownTiles.push({ x: firstTile.x + 1, y: firstTile.y + index });
      this.goUpTiles.push({ x: firstTile.x + 2, y: firstTile.y + index });
      this.goRightTiles.push({ x: firstTile.x + 3, y: firstTile.y + index });
    }

    this.selectedTiles = [this.goDownTiles[0]];
  }

  public setDirection(direction: Direction) {
    switch (direction) {
      case Direction.Up:
        this.selectedTiles = this.goUpTiles;
        break;
      case Direction.Down:
        this.selectedTiles = this.goDownTiles;
        break;
      case Direction.Left:
        this.selectedTiles = this.goLeftTiles;
        break;
      case Direction.Right:
        this.selectedTiles = this.goRightTiles;
        break;
      case Direction.Stop:
        this.selectedTiles = [this.selectedTiles[0]];
      default:
        this.selectedTiles = [this.selectedTiles[0]];
    }

    this.selectedIndexTile = 0;
  }

  public render(canvas: Screen, xCoordinate: number, yCoordinate: number): void {
    canvas.renderImg(
      this.tilesImage,
      this.selectedTiles[this.selectedIndexTile].x * this.height,
      this.selectedTiles[this.selectedIndexTile].y * this.width,
      this.height,
      this.width,
      xCoordinate,
      yCoordinate,
      tileSize,
      tileSize
    );

    this.updateTileIndex();
  }

  private updateTileIndex(): void {
    if (this.selectedIndexTile === this.selectedTiles.length - 1) {
      this.selectedIndexTile = 0;
    } else {
      this.selectedIndexTile++;
    }
  }
}
