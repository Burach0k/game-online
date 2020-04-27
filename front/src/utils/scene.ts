import { Screen } from '../screen/screen';
import { sceneNames } from '../consts';

export abstract class Scene {
  public screen: Screen;
  private components: { render(canvas: Screen): void }[] = [];

  constructor(screen: Screen) {
    this.screen = screen;
  }

  abstract init(): Promise<any>;

  abstract render(canvas: Screen): void;

  abstract onChangeScene(callback: (scene: sceneNames) => void): void;

  abstract destroy(): void;
}
