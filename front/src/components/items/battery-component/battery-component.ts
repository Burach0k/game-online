import { Component, ItemComponent } from '../../../utils/component';
import { Screen } from '../../../screen/screen';
import { BatteryCommand } from './battery-command';
import { CHARGE_PER_USAGE } from './constant';
import { IRegisterComponent } from 'src/models/register-component';
import { BatteryView } from './battery-view';

export class BatteryComponent extends ItemComponent {
  private charge: number = 100;
  protected command: BatteryCommand;

  constructor(view: BatteryView, registerComponentService: IRegisterComponent) {
    super(view, registerComponentService);
    this.registerComponentService.registerComponent(this);
  }

  public trigger(): void {
    if (this.command && this.charge) {
      this.command.charge = CHARGE_PER_USAGE;
      this.charge -= CHARGE_PER_USAGE;
      this.command.execute();
    }
  }

  public getDescription() {
    return `this is the battery for flashlight, charge is ${this.charge}`;
  }

  public render(canvas: Screen): void {
    this.view.render(canvas, this.x, this.y);
  }
}
