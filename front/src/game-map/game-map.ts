import { IMapConfig, screenTileSize, tileBoxCoefficient } from './game-map.model';
import { Screen } from '../screen/screen';
import { ICoordinates } from '../models/tile';
import { CharacterComponent } from '../components/character-component/character-component';

export class gameMap {
  private mapConfig: IMapConfig;
  private components: CharacterComponent[] = [];

  constructor(private screen: Screen, private tilesImage: HTMLImageElement) {}

  public setMapConfig(config: IMapConfig) {
    this.mapConfig = config;
  }

  public registerComponent(component: CharacterComponent) {
    this.components.push(component);
  }

  public render(): void {
    this.screen.renderBackground('green');

    this.mapConfig.land.forEach((tiles, yTileIndex) => {
      tiles.forEach((tile, xTileIndex) => {
        this.screen.renderImg(
          this.tilesImage,
          //TODO: make this calculation in backend
          tile.tileX * this.mapConfig.tileSize,
          tile.tileY * this.mapConfig.tileSize,
          this.mapConfig.tileSize,
          this.mapConfig.tileSize,
          xTileIndex * screenTileSize,
          yTileIndex * screenTileSize,
          screenTileSize,
          screenTileSize
        );
      });
    });

    this.components.forEach((component) => {
      this.checkCharacterPositionAndMove(component);
      component.render(this.screen);
    });
  }

  private checkCharacterPositionAndMove(character: CharacterComponent): void {
    if (this.isValidPosition(character.calculateNextCoordinates())) {
      const nextCharacterPosition = character.calculateNextCoordinates();
      character.moveTo(nextCharacterPosition.x, nextCharacterPosition.y);
    }
  }

  private isValidPosition({ x, y }: ICoordinates): boolean {
    if (x < 0 || y < 0) {
      return false;
    }

    const overflowTiles = [];

    this.mapConfig.land.forEach((tiles, yIndex) => {
      tiles.forEach((tile, xIndex) => {
        if (
          Math.abs(yIndex * screenTileSize - y) < tileBoxCoefficient * screenTileSize &&
          Math.abs(xIndex * screenTileSize - x) < tileBoxCoefficient * screenTileSize
        ) {
          overflowTiles.push(tile);
        }
      });
    });
    return !overflowTiles.some((tile) => tile.isBarrier);
  }
}
