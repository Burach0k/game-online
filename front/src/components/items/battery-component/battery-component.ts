import { Component } from '../../../utils/component';
import { Screen } from '../../../screen/screen';
import { Scene } from 'src/utils/scene';

export class BatteryComponent extends Component {
  onclick() {}

  public render(canvas: Screen): void {
    this.view.render(canvas, this.x, this.y);
  }
}
