import { Component } from '../../../utils/component';
import { Screen } from '../../../screen/screen';
import { BatteryCommand } from './battery-command';
import { CHARGE_PER_USAGE } from './constant';

export class BatteryComponent extends Component {
  private charge: number = 100;
  private command: BatteryCommand;

  public onclick(): void {
    if (this.command && this.charge) {
      this.command.charge = CHARGE_PER_USAGE;
      this.charge -= CHARGE_PER_USAGE;
      this.command.execute();
    }
  }

  public setCommand(command: BatteryCommand) {
    this.command = command;
  }

  public render(canvas: Screen): void {
    this.view.render(canvas, this.x, this.y);
  }
}
