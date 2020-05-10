import { Screen } from '../screen/screen';
import { View, ItemView } from './view';
import { IRegisterComponent } from '../models/register-component';
import { Command } from './command';

export abstract class Component {
  public x: number;
  public y: number;
  protected issInfoShown: boolean = false;

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

  public showInfo(): void {
    this.issInfoShown = true;
  }
  public hideInfo(): void {
    this.issInfoShown = false;
  }

  public getDescription(): string {
    return;
  }
}

export abstract class ItemComponent extends Component {
  protected command: Command;

  public setCommand(command: Command): void {
    this.command = command;
  }

  public getView(): ItemView {
    return this.view as ItemView;
  }
}

export abstract class UIComponent extends Component {
  public isFocused: boolean = false;
  protected triggerCallback: Function;

  public setOnTriggerAction(callback: Function) {
    this.triggerCallback = callback;
  }

  public trigger(): void {
    if (this.triggerCallback) {
      this.triggerCallback();
    }
  }
}
