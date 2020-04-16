import { Screen } from '../components/canvas/canvas';
import { sceneNames } from 'src/consts';

export abstract class Scene {
  public screen: Screen;
  private components: { render(canvas: Screen): void }[] = [];

  constructor(screen: Screen) {
    this.screen = screen;
  }

  abstract init(): void;

  abstract render(canvas: Screen): void;

  abstract onChangeScene(callback: (scene: sceneNames) => void): void;
}
