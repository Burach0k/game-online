import { Screen } from '../screen/screen';

export abstract class View {
  constructor(public height: number, public width: number) {
    this.width = width;
    this.height = height;
  }

  abstract render(canvas: Screen, ...args: any[]): void;
}
