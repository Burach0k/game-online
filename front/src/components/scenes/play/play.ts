import { Scene } from '../scene.abstract';
import { Screen } from 'src/components/canvas/canvas';
import { Game } from 'src/game';
import { keyCodes, sceneNames, menuConsts } from '../../../consts';

export class Play extends Scene {
  constructor(screen: Screen, game: Game) {
    super(screen, game);
  }

  init(): void {}

  render(): void {
    this.screen.renderBackground('blue');
  }

  checkEvent(keys: number[]): void {
    switch (keys[menuConsts.firstElement]) {
      case keyCodes.Escape:
        this.game.changeScene(sceneNames.Menu);
        break;
    }
  }
}
