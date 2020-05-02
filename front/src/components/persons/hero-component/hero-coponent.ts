import { CharacterComponent } from '../character-component/character-component';
import { BackpackComponent } from '../../../components/items/backpack-component/backpack-component';
import { Screen } from '../../../screen/screen';

export class HeroComponent extends CharacterComponent {
  private backpack: BackpackComponent;
  private lightCharge: number = 100;

  public takeBackpack(backpack: BackpackComponent): void {
    this.backpack = backpack;
  }

  public increaseLightCharge(charge: number) {
    this.lightCharge += charge;
  }

  public render(canvas: Screen) {
    super.render(canvas);
    this.backpack.render(canvas);
  }
}
