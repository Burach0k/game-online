import { Component } from '../utils/component';
import { screenTileSize } from '../game-map/game-map.model';

export class Camera {
  private watchedComponent: Component;
  private barrier: number = 100;
  public x: number = 0;
  public y: number = 0;
  public speed: number = 20;

  constructor(private width: number, private height: number) {}

  public watchComponent(component: Component): void {
    this.watchedComponent = component;
    this.calculateCameraPosition();
  }

  public calculateCameraPosition(): void {
    let xDistance = Math.max(
      0,
      this.watchedComponent.x + screenTileSize - (this.x + this.width - this.barrier)
    );

    xDistance = xDistance || Math.min(0, this.watchedComponent.x - (this.x + this.barrier));

    let yDistance = Math.max(
      0,
      this.watchedComponent.y + screenTileSize - (this.y + this.height - this.barrier)
    );

    yDistance = yDistance || Math.min(0, this.watchedComponent.y - (this.y + this.barrier));

    this.x += this.getTraveledDistance(xDistance);
    this.y += this.getTraveledDistance(yDistance);
  }

  public isCameraShownArea(xCoordinate: number, yCoordinate: number): boolean {
    return (
      ((this.x <= xCoordinate && this.x + this.width > xCoordinate) ||
        (this.x <= xCoordinate + screenTileSize &&
          this.x + this.width > xCoordinate + screenTileSize)) &&
      ((this.y <= yCoordinate && this.y + this.height > yCoordinate) ||
        (this.y <= yCoordinate + screenTileSize &&
          this.y + this.height > yCoordinate + screenTileSize))
    );
  }

  private getTraveledDistance(allDistance: number): number {
    if (Math.abs(allDistance) < this.speed) {
      return allDistance;
    }

    return this.speed * Math.sign(allDistance);
  }
}
