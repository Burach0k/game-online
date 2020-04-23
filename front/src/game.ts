import { Screen } from './screen/screen';
import { Scene } from './utils/scene';
import { scenes } from './scenes/scenes';
import { sceneNames } from './consts';

export class Game {
  public screen: Screen;
  private scene: Scene;
  private isLoading: boolean = false;
  public keyEventLoop: Array<number> = [];

  private render(time: number): void {
    if (this.isLoading) {
      this.screen.renderBackground('red');
    } else {
      this.scene.render(this.screen);
    }
    requestAnimationFrame((time) => this.render(time));
  }

  public changeScene(sceneName: sceneNames): void {
    const loadedScene = new scenes[sceneName](this.screen);
    this.isLoading = true;

    loadedScene.onChangeScene((scene: sceneNames) => {
      this.changeScene(scene);
    });

    loadedScene.init().then(() => {
      this.scene = loadedScene;
      this.isLoading = false;
    });
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
