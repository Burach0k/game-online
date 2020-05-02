import { Screen } from '../screen/screen';
import { sceneNames } from '../consts';
import { Component } from './component';
import { MouseEventManager } from '../event-managers/mouse-event-manager';
import { KeyboardEventManager } from '../event-managers/keyboard-event-manager';

export abstract class Scene {
  protected keyboardEventManager = new KeyboardEventManager(this.screen);
  protected mouseEventManager = new MouseEventManager(this.screen);
  protected registeredComponents: Component[] = [];

  constructor(public screen: Screen) {
    this.screen = screen;
  }

  abstract init(): Promise<any>;

  abstract render(canvas: Screen): void;

  abstract onChangeScene(callback: (scene: sceneNames) => void): void;

  abstract destroy(): void;

  public registerComponent(component: Component): void {
    this.registeredComponents.push(component);
  }

  public unregisterComponent(component: Component): void {
    this.registeredComponents = this.registeredComponents.filter(
      (sceneComponent) => sceneComponent !== component
    );
  }

  public getRegisterComponentsByCoordinate<T extends Component>(
    xCoordinate: number,
    yCoordinate: number
  ): T[] {
    return this.registeredComponents.filter((component) => {
      const beginningCoordinates = this.screen.getBeginningOfCoordinates();

      return (
        component.x - beginningCoordinates.x <= xCoordinate &&
        component.x - beginningCoordinates.x + component.width > xCoordinate &&
        component.y - beginningCoordinates.y <= yCoordinate &&
        component.y - beginningCoordinates.y + component.height > yCoordinate
      );
    }) as T[];
  }
}
