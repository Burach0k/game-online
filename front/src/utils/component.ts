import { Screen } from '../screen/screen';
import { View } from './view';
import { Scene } from './scene';

export abstract class Component {
  public x: number;
  public y: number;

  get width() {
    return this.view.width;
  }

  set width(width: number) {
    this.view.width = width;
  }

  get height() {
    return this.view.height;
  }

  set height(height: number) {
    this.view.height = height;
  }

  constructor(protected view: View) {}

  public render(canvas: Screen): void {
    this.view.render(canvas);
  }

  public onclick(): void {}
}
