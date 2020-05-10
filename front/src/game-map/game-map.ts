import {
  IMapConfig,
  screenTileSize,
  tileBoxCoefficient,
  DayPeriods,
  ColorOfDayPeriods,
} from './game-map.model';
import { Screen } from '../screen/screen';
import { ICoordinates } from '../models/tile';
import { CharacterComponent } from '../components/persons/character-component/character-component';
import { Camera } from '../camera/camera';
import { Component, ItemComponent } from '../utils/component';

export class gameMap {
  private mapConfig: IMapConfig;
  private characterComponents: CharacterComponent[] = [];
  private mapCamera: Camera = new Camera(this.screen.width, this.screen.height);
  private dayPeriod: DayPeriods = DayPeriods.Day;
  private backgroudColor: ColorOfDayPeriods = ColorOfDayPeriods.Day;

  constructor(private screen: Screen, private tilesImage: HTMLImageElement) {}

  public setMapConfig(config: IMapConfig) {
    this.mapConfig = config;
  }

  public addCharacterToMap(component: CharacterComponent) {
    this.characterComponents.push(component);
  }

  public removeCharacterFromMap(component: CharacterComponent) {
    this.characterComponents = this.characterComponents.filter((item) => item !== component);
  }

  public addItemToMap(component: ItemComponent) {
    this.mapConfig.items.push(component);
  }

  public removeItemFromMap(component: ItemComponent) {
    this.mapConfig.items = this.mapConfig.items.filter((item) => item !== component);
  }

  public followCameraForComponent(component: Component) {
    this.mapCamera.watchComponent(component);
  }

  public render(): void {
    this.screen.renderBackground(this.backgroudColor);

    //need to calculate next position for all characters
    this.characterComponents.forEach((component) => {
      this.checkCharacterPositionAndMove(component);
    });

    //we calculate camera position according new coordinates of character components, and render map
    this.mapCamera.calculateCameraPosition();
    this.screen.setBegginingOfCoordinates(this.mapCamera.x, this.mapCamera.y);
    this.renderMap();

    //after we render character components with new coordinates
    this.characterComponents.forEach((component) => {
      component.update(this.screen);
    });
  }

  public setTime(dayPeriod: DayPeriods) {
    this.dayPeriod = dayPeriod;
    this.backgroudColor = ColorOfDayPeriods[dayPeriod];
  }

  private renderMap(): void {
    this.mapConfig.land.forEach((tiles, yTileIndex) => {
      tiles.forEach((tile, xTileIndex) =>
        this.drawTile(
          this.tilesImage,
          xTileIndex * screenTileSize,
          yTileIndex * screenTileSize,
          tile.tileX * this.mapConfig.tileSize,
          tile.tileY * this.mapConfig.tileSize,
          this.mapConfig.tileSize,
          this.mapConfig.tileSize,
          screenTileSize,
          screenTileSize
        )
      );
    });

    this.mapConfig.items.forEach((item) => {
      debugger;
      this.drawTile(
        item.getView().getImage(),
        item.x,
        item.y,
        0,
        0,
        256,
        256,
        screenTileSize / 2,
        screenTileSize / 2
      );
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

  private drawTile(
    image: HTMLImageElement,
    x: number,
    y: number,
    tileX: number,
    tileY: number,
    tileXSize: number,
    tileYSize: number,
    screenXSize: number,
    screenYSize: number
  ): void {
    if (this.mapCamera.isCameraShownArea(x, y)) {
      if (this.dayPeriod === DayPeriods.Night) {
        const components = this.characterComponents.filter((component) =>
          component.isCharecterSeeArea(x, y)
        );

        components.forEach((component) => {
          let xDifference = this.getInvisiblePartOfTile(x, component.x, component.radius);

          let yDifference = this.getInvisiblePartOfTile(y, component.y, component.radius);

          this.screen.renderImg(
            image,

            tileX - (Math.min(0, xDifference) / screenXSize) * tileXSize,

            tileY - (Math.min(0, yDifference) / screenYSize) * tileYSize,

            tileXSize - (Math.abs(xDifference) / screenXSize) * tileXSize,

            tileYSize - (Math.abs(yDifference) / screenYSize) * tileYSize,
            x - Math.min(0, xDifference),

            y - Math.min(0, yDifference),

            screenXSize - Math.abs(xDifference),
            screenYSize - Math.abs(yDifference)
          );
        });
      } else {
        this.screen.renderImg(
          image,
          tileX,
          tileY,
          tileXSize,
          tileYSize,
          x,
          y,
          screenXSize,
          screenYSize
        );
      }
    }
  }

  private getInvisiblePartOfTile(
    tileCoordinate: number,
    componentCoordinate: number,
    componentRadius: number
  ): number {
    let difference = Math.min(
      0,
      tileCoordinate - (componentCoordinate + screenTileSize / 2 - componentRadius)
    );

    difference =
      difference ||
      Math.max(
        0,
        tileCoordinate +
          screenTileSize -
          (componentCoordinate + screenTileSize / 2 + componentRadius)
      );

    return difference;
  }
}
