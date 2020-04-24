import { View } from '../../utils/view';
import { tileCoordinates } from '../../models/tile';
import { Direction } from '../../models/direction';
import { Screen } from '../../screen/screen';

export class CharacterView extends View {
  private goRightTiles: tileCoordinates[] = [
    { x: 26, y: 0 },
    { x: 26, y: 1 },
    { x: 26, y: 2 },
  ];
  private goLeftTiles: tileCoordinates[] = [
    { x: 23, y: 0 },
    { x: 23, y: 1 },
    { x: 23, y: 2 },
  ];
  private goDownTiles: tileCoordinates[] = [
    { x: 24, y: 0 },
    { x: 24, y: 1 },
    { x: 24, y: 2 },
  ];
  private goUpTiles: tileCoordinates[] = [
    { x: 25, y: 0 },
    { x: 25, y: 1 },
    { x: 25, y: 2 },
  ];

  private selectedTiles: tileCoordinates[] = [this.goDownTiles[0]];
  private selectedIndexTile: number = 0;

  constructor(height: number, width: number, private tilesImage: HTMLImageElement) {
    super(height, width);
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
      xCoordinate * 50,
      yCoordinate * 50,
      50,
      50
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
