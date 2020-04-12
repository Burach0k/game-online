import { Scene } from '../scene.abstract';
import { Canvas } from 'src/components/canvas/canvas';
import { Game } from 'src/game';
import { keyCodes, sceneNames, menuConsts } from '../../../consts';

export class Play extends Scene {
  constructor(canvas: Canvas, game: Game) {
    super(canvas, game);
  }

  init(): void {}

  render(keyEventLoop: number[]): void {
    if (keyEventLoop.length > 0) {
      this.checkEvent(keyEventLoop);
    }

    this.canvas.renderBackground('blue');
  }

  checkEvent(keys: number[]): void {
    switch (keys[menuConsts.firstElement]) {
      case keyCodes.Escape:
        this.game.changeScene(sceneNames.Menu);
        break;
    }
  }
}
