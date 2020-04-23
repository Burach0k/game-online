import { Scene } from '../../utils/scene';
import { Screen } from '../../screen/screen';
import { menuConsts, sceneNames, keyCodes } from '../../consts';
import { ScreenEventManager } from '../../event-managers/keyboard-event-manager';
import { MouseEventManager } from '../../event-managers/mouse-event-manager';
import { TextComponent } from '../../components/text-component/text-component';
import { TextView } from '../../components/text-component/text-view';

export class Menu extends Scene {
  private keyboardEventManager = new ScreenEventManager(this.screen);
  private mouseEventManager = new MouseEventManager(this.screen);
  private callback: (scene: sceneNames) => void;

  private menuItems: TextComponent[] = [
    new TextComponent(new TextView(30, 140), 'New game'),
    new TextComponent(new TextView(30, 120), 'Continue'),
    new TextComponent(new TextView(30, 60), 'Exit'),
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
    const selectedItemIndex = this.menuItems.findIndex((item) => item.isFocused);
    const isLastElement = selectedItemIndex === this.menuItems.length - 1;
    const newSelectedItemIndex = isLastElement ? menuConsts.firstElement : selectedItemIndex + 1;

    this.chooseMenuItem(this.menuItems[newSelectedItemIndex]);
  }

  previousElement(): void {
    const selectedItemIndex = this.menuItems.findIndex((item) => item.isFocused);
    const isFirstElement = selectedItemIndex === menuConsts.firstElement;
    const newSelectedItemIndex = isFirstElement ? this.menuItems.length - 1 : selectedItemIndex - 1;

    this.chooseMenuItem(this.menuItems[newSelectedItemIndex]);
  }

  chooseMenuItem(textItem: TextComponent) {
    this.menuItems.forEach((menuItem) => {
      menuItem.isFocused = false;
      menuItem.setColor(menuConsts.defaultColor);
    });

    textItem.isFocused = true;
    textItem.setColor(menuConsts.chooseColor);
  }

  calculateelementPosition(): void {
    this.menuItems.forEach((item, index) => {
      let color;

      if (index === 0) {
        color = menuConsts.chooseColor;
        item.isFocused = true;
      } else {
        color = menuConsts.defaultColor;
        item.isFocused = false;
      }
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
