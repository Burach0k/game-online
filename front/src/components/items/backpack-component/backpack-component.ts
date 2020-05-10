import { Component, ItemComponent } from '../../../utils/component';
import { BackpackView } from './backpack-view';
import { Screen } from '../../../screen/screen';
import {
  DEFAULT_BACKPACK_ITEM_COUNT_X,
  WIDTH_PER_BACKPACK_ITEM,
  DEFAULT_BACKPACK_ITEM_COUNT_Y,
  HEIGHT_PER_BACKPACK_ITEM,
} from './constants';
import { BackpackCommand } from './backpack-command';
import { BackpackItem } from './backpack-item-decoratotor';
import { IRegisterComponent } from '../../../models/register-component';

export class BackpackComponent extends ItemComponent {
  protected command: BackpackCommand;

  private isActive: boolean = false;
  private items: BackpackItem[] = [];
  private itemsXCount: number = DEFAULT_BACKPACK_ITEM_COUNT_X;
  private itemsYCount: number = DEFAULT_BACKPACK_ITEM_COUNT_Y;

  constructor(protected view: BackpackView, registerComponentService: IRegisterComponent) {
    super(view, registerComponentService);
    this.x = 0;
    this.y = 0;
    this.registerComponentService.registerComponent(this);
  }

  public trigger(): void {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.items.forEach((item) => this.registerComponentService.registerComponent(item));
    } else {
      this.items.forEach((item) => this.registerComponentService.unregisterComponent(item));
    }
  }

  public addItemToBackpack(item: ItemComponent) {
    this.items.push(new BackpackItem(item, this.registerComponentService));
  }

  public removeItemFromBackpack(item: Component): void {
    this.items = this.items.filter((itemFromBackpack) => itemFromBackpack !== item);
    this.registerComponentService.unregisterComponent(item);
  }

  public update(canvas: Screen): void {
    this.items.forEach((item) => {
      if (item.isItemSholdRemove) {
        this.removeItemFromBackpack(item);
        this.command.item = item.getDecoratedComponent();
        this.command.execute();
      }
    });

    this.render(canvas);
  }

  public render(canvas: Screen): void {
    const beginningCoordinates = canvas.getBeginningOfCoordinates();
    this.x = beginningCoordinates.x;
    this.y = beginningCoordinates.y;

    this.view.render(canvas, this.x, this.y);
    if (this.isActive) {
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
            item.update(canvas);
          }
        }
      }
    }
  }
}
