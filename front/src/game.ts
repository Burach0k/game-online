import { Screen } from './components/canvas/canvas';
import { Scene } from './components/scenes/scene.abstract';
import { scenes } from './components/scenes/scenes';
import { sceneNames } from './consts';

export class Game {
  public screen: Screen;
  private scene: Scene;
  public keyEventLoop: Array<number> = []; //Массив ивентов клавиатуры (в массив загонятеся code кнопки, затем массив передается в сцену, там обрабатывается и удаляется последний элемент)

  private render(time: number): void {
    //рендер сцены (пока без фпс)
    this.scene.render();
    requestAnimationFrame((time) => this.render(time));
  }

  public changeScene(sceneName: 'Play' | 'Menu'): void {
    //смена сецены
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
