import { Screen } from '../screen/screen';
import { View } from './view';
import { IRegisterComponent } from '../models/register-component';

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

  constructor(protected view: View, protected registerComponentService: IRegisterComponent) {}

  public update(canvas: Screen) {
    this.render(canvas);
  }

  public render(canvas: Screen): void {
    this.view.render(canvas);
  }

  public getView(): View {
    return this.view;
  }

  public setView(newView: View): View {
    return (this.view = newView);
  }

  public trigger(): void {}

  public changeContextMenuStatus(): void {}
}
