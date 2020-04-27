import { Component } from '../../utils/component';
import { CharacterView } from './character-view';
import { Screen } from '../../screen/screen';
import { Direction } from '../../models/direction';
import { ICoordinates } from '../../models/tile';

export class CharacterComponent extends Component {
  public speed: number = 0.1;
  public direction: Direction = Direction.Stop;
  private nextPositionCalculator: { [key in Direction]: (x: number, y: number) => ICoordinates } = {
    [Direction.Right]: (x, y) => ({ x: x + this.speed, y }),
    [Direction.Left]: (x, y) => ({ x: x - this.speed, y }),
    [Direction.Up]: (x, y) => ({ x: x, y: y - this.speed }),
    [Direction.Down]: (x, y) => ({ x, y: y + this.speed }),
    [Direction.Stop]: (x, y) => ({ x, y }),
  };

  constructor(protected view: CharacterView) {
    super(view);
    this.x = 10;
    this.y = 10;
    this.view.setDirection(this.direction);
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
    this.direction = Direction.Stop;
    this.view.setDirection(Direction.Stop);
  }

  public startMotion(newDirection: Direction) {
    this.direction = newDirection;
    this.view.setDirection(this.direction);
  }

  public calculateNextCoordinates(): ICoordinates {
    return this.nextPositionCalculator[this.direction](this.x, this.y);
  }
}
