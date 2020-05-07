import { Component } from '../../../utils/component';
import { Screen } from '../../../screen/screen';
import { flashlightView } from './flashlight-view';
import { IRegisterComponent } from '../../../models/register-component';

export class FlashlightComponent extends Component {
  public charge: number = 100;
  public isActive: boolean = false;

  constructor(view: flashlightView, registerComponentService: IRegisterComponent) {
    super(view, registerComponentService);
    this.registerComponentService.registerComponent(this);
  }

  public trigger(): void {
    this.isActive = !this.isActive;
  }

  public increaseLightCharge(charge: number): void {
    this.charge += charge;
  }

  public update(canvas: Screen): void {
    if (this.isActive) {
      this.charge -= 0.1;
    }
    this.render(canvas);
  }

  public render(canvas: Screen): void {
    const beginningCoordinates = canvas.getBeginningOfCoordinates();
    this.x = beginningCoordinates.x + canvas.width - 150;
    this.y = beginningCoordinates.y + 20;

    this.view.render(canvas, this.x, this.y);
  }
}
