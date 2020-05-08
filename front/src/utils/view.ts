import { Screen } from '../screen/screen';

export abstract class View {
  constructor(public height: number, public width: number) {
    this.width = width;
    this.height = height;
  }

  abstract render(canvas: Screen, ...args: any[]): void;
}

export abstract class ItemView extends View {
  protected image: HTMLImageElement = new Image();

  public getImage(): HTMLImageElement {
    return this.image;
  }
}
