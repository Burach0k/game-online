import { Scene } from '../../../utils/scene';
import { Screen } from 'src/components/canvas/canvas';
import { menuConsts, keyCodes, sceneNames } from '../../../consts';
import { Game } from 'src/game';
import { ScreenEventManager } from '../../../event-managers/keyboard-event-manager';
import { MouseEventManager } from '../../../event-managers/mouse-event-manager';
import { TextComponent } from '../../component/component';

export class Menu extends Scene {
  private chooseElement = menuConsts.firstElement;
  private keyboardEventManager = new ScreenEventManager(this.screen);
  private mouseEventManager = new MouseEventManager(this.screen);
  private callback: (scene: sceneNames) => void;

  private menuItems: TextComponent[] = [
    new TextComponent('New game', 70, this.screen.width),
    new TextComponent('Continue', 70, this.screen.width),
    new TextComponent('Exit', 70, this.screen.width),
  ];

  constructor(screen: Screen) {
    super(screen);
  }

  init(): void {
    this.menuItems.forEach((item, index) => {
      item.setStyle(30, 'center');

      if (index === 0) {
        item.x = this.screen.width / 2;
        item.y = item.fontSize;
      } else {
        item.x = this.screen.width / 2;
        item.y = this.menuItems[index - 1].y + this.menuItems[index - 1].height;
      }
    });

    this.keyboardEventManager.subscribe('keydown', (data) =>
      this.changeMenuStatus(data.keyCode)
    );

    this.mouseEventManager.subscribe('mousemove', (data: MouseEvent) => {
      this.chooseMenuItem(this.getItemByCoordinate(data.clientX, data.clientY));
    });
  }

  getItemByCoordinate(x: number, y: number): TextComponent {
    return this.menuItems.find(item => {
      return (item.x <= x) && (item.x + item.width >= x) && (item.y <= y) && (item.y + item.height >= y);
    });
  }

  render(): void {
    this.screen.renderBackground(menuConsts.backgraundColor);

    this.menuItems.forEach((item) => item.render(this.screen));
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
        this.callback(sceneNames.Play);
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

  chooseMenuItem(textItem: TextComponent) {
    this.menuItems.forEach(
      (menuItem) => (menuItem.color = menuConsts.defaultColor)
    );
    if (textItem) {
      console.log(textItem)
      textItem.color = menuConsts.chooseColor;
    }
  }

  onChangeScene(callback: (scene: sceneNames) => void): void {
    this.callback = callback;
  }
}
