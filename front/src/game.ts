import { Screen } from './components/canvas/canvas';
import { Scene } from './components/scenes/scene.abstract';
import { scenes } from './components/scenes/scenes';
import { sceneNames } from './consts';
import { SceneName } from './models/scene-name-type';

export class Game {
  public screen: Screen;
  private scene: Scene;
  public keyEventLoop: Array<number> = [];

  private render(time: number): void {
    this.scene.render();
    requestAnimationFrame((time) => this.render(time));
  }

  public changeScene(sceneName: SceneName): void {
    this.scene = new scenes[sceneName](this.screen, this);
    this.scene.init();
  }

  public start(): void {
    this.changeScene(sceneNames.Menu);
    requestAnimationFrame((time) => this.render(time));
  }

  public init(): void {
    this.screen = new Screen();
    this.screen.init();
  }
}
