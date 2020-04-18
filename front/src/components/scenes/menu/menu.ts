import { Scene } from '../../../utils/scene';
import { Screen } from 'src/components/canvas/canvas';
import { menuConsts, keyCodes, sceneNames } from '../../../consts';
import { ScreenEventManager } from '../../../event-managers/keyboard-event-manager';
import { MouseEventManager } from '../../../event-managers/mouse-event-manager';
import { TextComponent } from '../../component/component';

export class Menu extends Scene {
  private chooseElement = menuConsts.firstElement;
  private keyboardEventManager = new ScreenEventManager(this.screen);
  private mouseEventManager = new MouseEventManager(this.screen);
  private callback: (scene: sceneNames) => void;

  private menuItems: TextComponent[] = [
    new TextComponent('New game', 30, 140),
    new TextComponent('Continue', 30, 120),
    new TextComponent('Exit', 30, 60),
  ];

  constructor(screen: Screen) {
    super(screen);
  }

  async init(): Promise<any> {
    this.calculateelementPosition();

    this.keyboardEventManager.subscribe('keydown', (data) => this.changeMenuStatus(data.keyCode));
    this.mouseEventManager.subscribe('click', (data: MouseEvent) => this.clickEvent(data));
    this.mouseEventManager.subscribe('mousemove', (data) => this.moveEvent(data));
  }

  getItemByCoordinate(x: number, y: number): TextComponent {
    return this.menuItems.find((item) => {
      return (
        item.x - item.width / 2 <= x &&
        item.x + item.width / 2 >= x &&
        item.y - item.height <= y &&
        item.y >= y
      );
    });
  }

  render(): void {
    this.screen.renderBackground(menuConsts.backgraundColor);
    this.menuItems.forEach((item) => item.render(this.screen));
  }

  moveEvent(data: MouseEvent): void {
    const selectItem = this.getItemByCoordinate(data.clientX, data.clientY);

    if (selectItem) {
      this.chooseElement = this.menuItems.findIndex((item) => item.text === selectItem.text);
      this.chooseMenuItem(selectItem);
    }
  }

  clickEvent(data: MouseEvent): void {
    const selectItem = this.getItemByCoordinate(data.clientX, data.clientY);

    if (selectItem) this.changeMenuStatus(data.type as keyCodes.Click);
  }

  changeMenuStatus(key: keyCodes): void {
    switch (key) {
      case keyCodes.ArrowUp:
        this.previousElement();
        break;

      case keyCodes.ArrowDown:
        this.nextElement();
        break;

      case keyCodes.Enter:
      case keyCodes.Click:
        this.callback(sceneNames.Play);
        break;
    }
  }

  nextElement(): void {
    const isLastElement = this.chooseElement === this.menuItems.length - 1;
    this.chooseElement = isLastElement ? menuConsts.firstElement : this.chooseElement + 1;

    this.chooseMenuItem(this.menuItems[this.chooseElement]);
  }

  previousElement(): void {
    const isFirstElement = this.chooseElement === menuConsts.firstElement;
    this.chooseElement = isFirstElement ? this.menuItems.length - 1 : this.chooseElement - 1;

    this.chooseMenuItem(this.menuItems[this.chooseElement]);
  }

  chooseMenuItem(textItem: TextComponent) {
    const oldSelectItem = this.menuItems.find((item) => item.color === menuConsts.chooseColor);

    oldSelectItem.color = menuConsts.defaultColor;
    textItem.color = menuConsts.chooseColor;
  }

  calculateelementPosition(): void {
    this.menuItems.forEach((item, index) => {
      const color = index === 0 ? menuConsts.chooseColor : menuConsts.defaultColor;
      item.setStyle(menuConsts.fontSize, 'center', color);

      item.x = this.screen.width / 2;
      item.y =
        this.screen.height / 2 +
        index * menuConsts.fontSize * 2 -
        this.menuItems.length * menuConsts.fontSize;
    });
  }

  onChangeScene(callback: (scene: sceneNames) => void): void {
    this.callback = callback;
  }
}
