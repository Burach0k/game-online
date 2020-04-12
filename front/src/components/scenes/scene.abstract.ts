import { Canvas } from '../canvas/canvas';
import { Game } from 'src/game';

export abstract class Scene {
  public canvas: Canvas;
  public game: Game;

  constructor(canvas: Canvas, game: Game) {
    this.canvas = canvas;
    this.game = game;
  }

  abstract init(): void;

  abstract render(keyEventLoop: number[]): void;
}
