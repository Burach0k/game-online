import { Component } from '../../../utils/component';
import { BackpackView } from './backpack-view';
import { Screen } from '../../../screen/screen';
import {
  DEFAULT_BACKPACK_ITEM_COUNT_X,
  WIDTH_PER_BACKPACK_ITEM,
  DEFAULT_BACKPACK_ITEM_COUNT_Y,
  HEIGHT_PER_BACKPACK_ITEM,
} from './constants';
import { BatteryComponent } from '../battery-component/battery-component';
import { BatteryView } from '../battery-component/battery-view';
import { BackpackCommand } from './backpack-command';

export class BackpackComponent extends Component {
  private command: BackpackCommand;
  private isShown: boolean = false;
  private items: Component[] = [new BatteryComponent(new BatteryView(100, 100))];
  private itemsXCount: number = DEFAULT_BACKPACK_ITEM_COUNT_X;
  private itemsYCount: number = DEFAULT_BACKPACK_ITEM_COUNT_Y;

  constructor(protected view: BackpackView) {
    super(view);
    this.x = 0;
    this.y = 0;
  }

  public onclick(): void {
    this.isShown = !this.isShown;

    this.items.forEach((item) => {
      this.command.item = item;
      this.command.isRegisterItem = this.isShown;
      this.command.execute();
    });
  }

  public addItemToBackpack(item: Component) {
    this.items.push(item);
  }

  public removeItemFromBackpack(item: Component) {
    this.items = this.items.filter((itemFromBackpack) => itemFromBackpack !== item);
  }

  public setCommand(command: BackpackCommand) {
    this.command = command;
  }

  public render(canvas: Screen): void {
    const beginningCoordinates = canvas.getBeginningOfCoordinates();
    this.x = beginningCoordinates.x;
    this.y = beginningCoordinates.y;

    this.view.render(canvas, this.x, this.y);
    if (this.isShown) {
      const beginningCoordinates = canvas.getBeginningOfCoordinates();
      const initialX: number = (canvas.width - this.itemsXCount * WIDTH_PER_BACKPACK_ITEM) / 2;
      const initialY: number = (canvas.height - this.itemsYCount * HEIGHT_PER_BACKPACK_ITEM) / 2;
      canvas.renderRectangle(
        initialX,
        initialY,
        this.itemsXCount * WIDTH_PER_BACKPACK_ITEM,
        this.itemsYCount * HEIGHT_PER_BACKPACK_ITEM,
        '#836D62'
      );

      for (let yIndex = 0; yIndex < this.itemsYCount; yIndex++) {
        for (let xIndex = 0; xIndex < this.itemsXCount; xIndex++) {
          canvas.strokeRect(
            initialX + xIndex * WIDTH_PER_BACKPACK_ITEM,
            initialY + yIndex * HEIGHT_PER_BACKPACK_ITEM,
            WIDTH_PER_BACKPACK_ITEM,
            HEIGHT_PER_BACKPACK_ITEM,
            'black'
          );
          if (this.items[yIndex + xIndex]) {
            const item = this.items[yIndex + xIndex];

            item.x = beginningCoordinates.x + initialX + xIndex * WIDTH_PER_BACKPACK_ITEM;
            item.y = beginningCoordinates.y + initialY + yIndex * HEIGHT_PER_BACKPACK_ITEM;
            item.width = WIDTH_PER_BACKPACK_ITEM;
            item.height = HEIGHT_PER_BACKPACK_ITEM;
            item.render(canvas);
          }
        }
      }
    }
  }
}
