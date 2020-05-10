import { Screen } from '../screen/screen';
import { sceneNames } from '../consts';
import { MouseEventManager } from '../event-managers/mouse-event-manager';
import { KeyboardEventManager } from '../event-managers/keyboard-event-manager';
import { gameMap } from 'src/game-map/game-map';
import { ItemComponent } from './component';
import { CharacterComponent } from 'src/components/persons/character-component/character-component';

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

export abstract class PlayScene extends Scene {
  protected map: gameMap;

  public addItemToMap(item: ItemComponent): void {
    this.map.addItemToMap(item);
  }

  public removItemFromMap(item: ItemComponent): void {
    this.map.removeItemFromMap(item);
  }

  public addCharacterToMap(character: CharacterComponent): void {
    this.map.addCharacterToMap(character);
  }

  public removeCharacterToMap(character: CharacterComponent): void {
    this.map.removeCharacterFromMap(character);
  }
}
