import { CharacterComponent } from '../character-component/character-component';
import { BackpackComponent } from '../../../components/items/backpack-component/backpack-component';
import { Screen } from '../../../screen/screen';
import { FlashlightComponent } from 'src/components/items/flashlight-component/flashlight-componet';

export class HeroComponent extends CharacterComponent {
  private backpack: BackpackComponent;

  private flashlight: FlashlightComponent;

  public takeBackpack(backpack: BackpackComponent): void {
    this.backpack = backpack;
  }

  public takeFLashlight(flashlight: FlashlightComponent) {
    this.flashlight = flashlight;
  }

  public increaseLightCharge(charge: number) {
    this.flashlight.charge += charge;
  }

  public render(canvas: Screen) {
    if (this.flashlight.isActive) {
      this.radius = 3 * this.flashlight.charge;
    } else {
      this.radius = 0;
    }

    super.render(canvas);
    this.backpack.update(canvas);
    this.flashlight.update(canvas);
  }
}
