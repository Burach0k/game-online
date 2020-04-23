import { Screen } from '../screen/screen';
import { View } from './view';

export abstract class Component {
  public x: number;
  public y: number;

  constructor(protected view: View) {}

  render(canvas: Screen): void {
    this.view.render(canvas);
  }
}
