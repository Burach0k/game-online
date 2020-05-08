import { MouseEventManager } from '../event-managers/mouse-event-manager';
import { KeyboardEventManager } from '../event-managers/keyboard-event-manager';
import { Screen } from '../screen/screen';
import { IRegisterComponent } from '../models/register-component';
import { Component } from '../utils/component';

export class RegisterComponentService implements IRegisterComponent {
  private registeredComponents: Component[] = [];

  constructor(protected screen: Screen) {}

  public registerComponent(component: Component): void {
    this.registeredComponents.push(component);
  }

  public unregisterComponent(component: Component): void {
    this.registeredComponents = this.registeredComponents.filter(
      (sceneComponent) => sceneComponent !== component
    );
  }

  public getRegisteredComponents<T extends Component>() {
    return this.registeredComponents as T[];
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
