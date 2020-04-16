import { Screen } from './components/canvas/canvas';
import { Scene } from './utils/scene';
import { scenes } from './components/scenes/scenes';
import { sceneNames } from './consts';

export class Game {
  public screen: Screen;
  private scene: Scene;
  public keyEventLoop: Array<number> = [];

  private render(time: number): void {
    this.scene.render(this.screen);
    requestAnimationFrame((time) => this.render(time));
  }

  public changeScene(sceneName: sceneNames): void {
    this.scene = new scenes[sceneName](this.screen);
    this.scene.onChangeScene((scene: sceneNames) => {
      this.changeScene(scene);
    });
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
