import { Scene } from '../scene.abstract';
import { Screen } from 'src/components/canvas/canvas';
import { TextItem } from 'src/models/text-item';
import { menuConsts, sceneNames, keyCodes } from '../../../consts';
import { Game } from 'src/game';
import { ScreenEventManager } from '../../../event-managers/keyboard-event-manager';
import { MouseEventManager } from '../../../event-managers/mouse-event-manager';

export class Menu extends Scene {
  private chooseElement = menuConsts.firstElement;
  private keyboardEventManager = new ScreenEventManager(this.game.screen);
  private mouseEventManager = new MouseEventManager(this.game.screen);

  private menuItems: TextItem[] = [
    {
      text: 'New game',
      x: this.screen.width / 2,
      y: this.screen.height / 4,
      color: menuConsts.chooseColor,
    },
    {
      text: 'Continue',
      x: this.screen.width / 2,
      y: this.screen.height / 2,
      color: menuConsts.defaultColor,
    },
    {
      text: 'Exit',
      x: this.screen.width / 2,
      y: this.screen.height / 1.3,
      color: menuConsts.defaultColor,
    },
  ];

  constructor(screen: Screen, game: Game) {
    super(screen, game);
  }

  init(): void {
    this.screen.initTextStyle('30px serif', 'center');
    this.keyboardEventManager.subscribe('keydown', (data) =>
      this.changeMenuStatus(data.keyCode)
    );

    this.mouseEventManager.subscribe('mousemove', (data) => {
      this.chooseMenuItem(
        this.menuItems.find((menuItem, index) => {
          if (
            menuItem.y <= data.clientY &&
            index !== this.menuItems.length - 1 &&
            this.menuItems[index + 1].y > data.clientY
          ) {
            return true;
          } else if (menuItem.y > data.clientY && index === 0) {
            return true;
          } else if (
            menuItem.y < data.clientY &&
            index === this.menuItems.length - 1
          ) {
            return true;
          }
        })
      );
    });
  }

  render(): void {
    this.screen.renderBackground(menuConsts.backgraundColor);
    this.menuItems.forEach((item) => this.screen.renderText(item));
  }

  changeMenuStatus(key: number): void {
    switch (key) {
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
  }

  nextElement(): void {
    const isLastElement = this.chooseElement === this.menuItems.length - 1;
    this.chooseElement = isLastElement
      ? menuConsts.firstElement
      : this.chooseElement + 1;

    this.chooseMenuItem(this.menuItems[this.chooseElement]);
  }

  previousElement(): void {
    const isFirstElement = this.chooseElement === menuConsts.firstElement;
    this.chooseElement = isFirstElement
      ? this.menuItems.length - 1
      : this.chooseElement - 1;

    this.chooseMenuItem(this.menuItems[this.chooseElement]);
  }

  chooseMenuItem(textItem: TextItem) {
    this.menuItems.forEach(
      (menuItem) => (menuItem.color = menuConsts.defaultColor)
    );
    textItem.color = menuConsts.chooseColor;
  }

  choose(element: number): void {
    this.game.changeScene(sceneNames.Play);
  }
}
