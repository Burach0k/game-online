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
import { Component } from '../utils/component';

export class gameMap {
  private mapConfig: IMapConfig;
  private components: CharacterComponent[] = [];
  private mapCamera: Camera = new Camera(this.screen.width, this.screen.height);
  private dayPeriod: DayPeriods = DayPeriods.Day;
  private backgroudColor: ColorOfDayPeriods = ColorOfDayPeriods.Day;

  constructor(private screen: Screen, private tilesImage: HTMLImageElement) {}

  public setMapConfig(config: IMapConfig) {
    this.mapConfig = config;
  }

  public addComponentToMap(component: CharacterComponent) {
    this.components.push(component);
  }

  public followCameraForComponent(component: Component) {
    this.mapCamera.watchComponent(component);
  }

  public render(): void {
    this.screen.renderBackground(this.backgroudColor);

    //need to calculate next position for all characters
    this.components.forEach((component) => {
      this.checkCharacterPositionAndMove(component);
    });

    //we calculate camera position according new coordinates of character components, and render map
    this.mapCamera.calculateCameraPosition();
    this.screen.setBegginingOfCoordinates(this.mapCamera.x, this.mapCamera.y);
    this.renderMap();

    //after we render character components with new coordinates
    this.components.forEach((component) => {
      component.update(this.screen);
    });
  }

  public setTime(dayPeriod: DayPeriods) {
    this.dayPeriod = dayPeriod;
    this.backgroudColor = ColorOfDayPeriods[dayPeriod];
  }

  private renderMap(): void {
    this.mapConfig.land.forEach((tiles, yTileIndex) => {
      tiles.forEach((tile, xTileIndex) => {
        if (
          this.mapCamera.isCameraShownArea(xTileIndex * screenTileSize, yTileIndex * screenTileSize)
        ) {
          if (this.dayPeriod === DayPeriods.Night) {
            const components = this.components.filter((component) =>
              component.isCharecterSeeArea(xTileIndex * screenTileSize, yTileIndex * screenTileSize)
            );

            components.forEach((component) => {
              let xDifference = this.getInvisiblePartOfTile(
                xTileIndex * screenTileSize,
                component.x,
                component.radius
              );

              let yDifference = this.getInvisiblePartOfTile(
                yTileIndex * screenTileSize,
                component.y,
                component.radius
              );

              this.screen.renderImg(
                this.tilesImage,
                //TODO: make this calculation in backend
                tile.tileX * this.mapConfig.tileSize -
                  (Math.min(0, xDifference) / screenTileSize) * this.mapConfig.tileSize,

                tile.tileY * this.mapConfig.tileSize -
                  (Math.min(0, yDifference) / screenTileSize) * this.mapConfig.tileSize,

                this.mapConfig.tileSize -
                  (Math.abs(xDifference) / screenTileSize) * this.mapConfig.tileSize,

                this.mapConfig.tileSize -
                  (Math.abs(yDifference) / screenTileSize) * this.mapConfig.tileSize,

                xTileIndex * screenTileSize - Math.min(0, xDifference),

                yTileIndex * screenTileSize - Math.min(0, yDifference),

                screenTileSize - Math.abs(xDifference),
                screenTileSize - Math.abs(yDifference)
              );
            });
          } else {
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
          }
        }
      });
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
