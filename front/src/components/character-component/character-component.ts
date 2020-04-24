import { Component } from '../../utils/component';
import { CharacterView } from './character-view';
import { Screen } from '../../screen/screen';
import { Direction } from '../../models/direction';

export class CharacterComponent extends Component {
  constructor(protected view: CharacterView) {
    super(view);
    this.x = 10;
    this.y = 10;
  }

  public render(canvas: Screen): void {
    this.view.render(canvas, this.x, this.y);
  }

  public moveTo(xCoordinate: number, yCoordinate: number): void {
    const newXCoordinate = Math.round(xCoordinate * 10) / 10;
    const newYCoordinate = Math.round(yCoordinate * 10) / 10;

    this.x = newXCoordinate;
    this.y = newYCoordinate;
  }

  public stopMotion(): void {
    this.view.setDirection(Direction.Stop);
  }

  public startMotion(xCoordinate: number, yCoordinate: number) {
    if (this.x < xCoordinate) {
      this.view.setDirection(Direction.Right);
    } else if (this.x > xCoordinate) {
      this.view.setDirection(Direction.Left);
    } else if (this.y > yCoordinate) {
      this.view.setDirection(Direction.Up);
    } else if (this.y < yCoordinate) {
      this.view.setDirection(Direction.Down);
    }
  }
}
