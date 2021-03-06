import { Scene } from '../../utils/scene';
import { Screen } from '../../screen/screen';
import { menuConsts, sceneNames, keyCodes } from '../../consts';
import { TextComponent } from '../../components/ui/text-component/text-component';
import { TextView } from '../../components/ui/text-component/text-view';
import { Subscription } from '../../utils/event-manager';
import { RegisterComponentService } from '../../services/action-component-service';

export class Menu extends Scene {
  private callback: (scene: sceneNames) => void;
  private subscriptions: Subscription[] = [];
  private registerComponentService = new RegisterComponentService(this.screen);

  private menuItems: TextComponent[] = [
    new TextComponent(new TextView(140, 30), this.registerComponentService, 'New game'),
    new TextComponent(new TextView(140, 30), this.registerComponentService, 'Continue'),
    new TextComponent(new TextView(140, 30), this.registerComponentService, 'Exit'),
  ];

  constructor(screen: Screen) {
    super(screen);
  }

  init(): Promise<any> {
    this.calculateelementPosition();

    this.subscriptions.push(
      this.keyboardEventManager.subscribe('keydown', (data) => this.changeMenuStatus(data.keyCode)),
      this.mouseEventManager.subscribe('click', (data: MouseEvent) => this.clickEvent(data)),
      this.mouseEventManager.subscribe('mousemove', (data) => this.moveEvent(data))
    );

    return Promise.resolve();
  }

  update(): void {
    this.render();
  }

  render(): void {
    this.screen.renderBackground(menuConsts.backgraundColor);
    this.menuItems.forEach((item) => item.update(this.screen));
  }

  destroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  moveEvent(data: MouseEvent): void {
    const selectItem = this.registerComponentService.getRegisterComponentsByCoordinate<
      TextComponent
    >(data.clientX, data.clientY)[0];

    if (selectItem) {
      this.chooseMenuItem(selectItem);
    }
  }

  clickEvent(data: MouseEvent): void {
    const selectItem = this.registerComponentService.getRegisterComponentsByCoordinate<
      TextComponent
    >(data.clientX, data.clientY)[0];

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
    const selectedItemIndex = this.menuItems.findIndex((item) => item);
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
