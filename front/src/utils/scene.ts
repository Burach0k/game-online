import { Screen } from '../screen/screen';
import { sceneNames } from '../consts';
import { MouseEventManager } from '../event-managers/mouse-event-manager';
import { KeyboardEventManager } from '../event-managers/keyboard-event-manager';

export abstract class Scene {
  protected keyboardEventManager = new KeyboardEventManager(this.screen);
  protected mouseEventManager = new MouseEventManager(this.screen);

  constructor(public screen: Screen) {
    this.screen = screen;
  }

  abstract init(): Promise<any>;

  abstract update(canvas: Screen): void;

  abstract render(canvas: Screen): void;

  abstract onChangeScene(callback: (scene: sceneNames) => void): void;

  abstract destroy(): void;
}
