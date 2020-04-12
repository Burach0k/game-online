import { Canvas } from './components/canvas/canvas';
import { Scene } from './components/scenes/scene.abstract';
import { scenes } from './components/scenes/scenes';
import { sceneNames } from './consts';

export class Game {
  public canvas: Canvas;
  private scene: Scene;
  public keyEventLoop: Array<number> = []; //Массив ивентов клавиатуры (в массив загонятеся code кнопки, затем массив передается в сцену, там обрабатывается и удаляется последний элемент)

  private render(time: number): void { //рендер сцены (пока без фпс)
    this.scene.render(this.keyEventLoop);
    requestAnimationFrame((time) => this.render(time));
  }

  public changeScene(sceneName: 'Play' | 'Menu'): void { //смена сецены
    this.scene = new scenes[sceneName](this.canvas, this);
    this.scene.init();
  }

  public start(): void {
    this.changeScene(sceneNames.Menu);
    requestAnimationFrame((time) => this.render(time));
  }

  public init(): void {
    this.initEventListener();

    this.canvas = new Canvas();
    this.canvas.init();
  }

  private initEventListener(): void {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      this.keyEventLoop.push(e.keyCode);
    });
  }
}
