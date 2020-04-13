import { Screen } from '../canvas/canvas';
import { Game } from 'src/game';

export abstract class Scene {
  public screen: Screen;
  public game: Game;

  constructor(screen: Screen, game: Game) {
    this.screen = screen;
    this.game = game;
  }

  abstract init(): void;

  abstract render(): void;
}
