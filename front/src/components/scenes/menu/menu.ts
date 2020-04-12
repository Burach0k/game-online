import { Scene } from '../scene.abstract';
import { Canvas } from 'src/components/canvas/canvas';
import { TextItem } from 'src/models/text-item';
import { menuConsts, sceneNames, keyCodes } from '../../../consts';
import { Game } from 'src/game';

export class Menu extends Scene {
  private chooseElement = menuConsts.firstElement;

  private menuItems: TextItem[] = [
    {
      text: 'New game',
      x: this.canvas.width / 2,
      y: this.canvas.height / 4,
      color: menuConsts.chooseColor,
    },
    {
      text: 'Continue',
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      color: menuConsts.defaultColor,
    },
    {
      text: 'Exit',
      x: this.canvas.width / 2,
      y: this.canvas.height / 1.3,
      color: menuConsts.defaultColor,
    },
  ];

  constructor(canvas: Canvas, game: Game) {
    super(canvas, game);
  }

  init(): void {
    this.canvas.initTextStyle('30px serif', 'center');
  }

  render(keyEventLoop: number[]): void {
    if (keyEventLoop.length > 0) {
      this.changeMenuStatus(keyEventLoop);
    }

    this.canvas.renderBackground(menuConsts.backgraundColor);
    this.menuItems.forEach((item) => this.canvas.renderText(item));
  }

  changeMenuStatus(keys: number[]): void {
    switch (keys[menuConsts.firstElement]) {
      case keyCodes.ArrowUp:
        this.previousElement();
        break;

      case keyCodes.ArrowDown:
        this.nextElement();
        break;

      case keyCodes.Enter:
        this.choose(this.chooseElement);
        break;
    }

    keys.pop();
  }

  nextElement(): void {
    this.menuItems[this.chooseElement].color = menuConsts.defaultColor;

    const isLastElement = this.chooseElement === this.menuItems.length - 1;
    this.chooseElement = isLastElement
      ? menuConsts.firstElement
      : this.chooseElement + 1;

    this.menuItems[this.chooseElement].color = menuConsts.chooseColor;
  }

  previousElement(): void {
    this.menuItems[this.chooseElement].color = menuConsts.defaultColor;

    const isFirstElement = this.chooseElement === menuConsts.firstElement;
    this.chooseElement = isFirstElement
      ? this.menuItems.length - 1
      : this.chooseElement - 1;

    this.menuItems[this.chooseElement].color = menuConsts.chooseColor;
  }

  choose(element: number): void {
    this.game.changeScene(sceneNames.Play);
  }
}
