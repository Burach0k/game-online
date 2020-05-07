import { Command } from '../../../utils/command';
import { HeroComponent } from '../../../components/persons/hero-component/hero-coponent';

export class BatteryCommand extends Command {
  public charge: number;

  constructor(private component: HeroComponent) {
    super();
  }

  public execute(): void {
    this.component.increaseLightCharge(this.charge);
  }
}
