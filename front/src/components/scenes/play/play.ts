import { Scene } from '../../../utils/scene';
import { Screen } from '../../canvas/canvas';
import { keyCodes, menuConsts, sceneNames } from '../../../consts';
import { ScreenEventManager } from '../../../event-managers/keyboard-event-manager';

export class Play extends Scene {
  private callback: (scene: sceneNames) => void;
  private keyboardEventManager = new ScreenEventManager(this.screen);

  constructor(screen: Screen) {
    super(screen);
  }

  init(): void {
    this.keyboardEventManager.subscribe('keydown', (data) =>
      this.checkEvent(data.keyCode)
    );
  }

  render(): void {
    this.screen.renderBackground('blue');
  }

  checkEvent(key: number): void {
    switch (key) {
      case keyCodes.Escape:
        this.callback(sceneNames.Menu);
        break;
    }
  }

  onChangeScene(callback: (scene: sceneNames) => void): void {
    this.callback = callback;
  }
}
