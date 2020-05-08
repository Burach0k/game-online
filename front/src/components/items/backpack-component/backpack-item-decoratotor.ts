import { ItemComponent } from '../../../utils/component';
import { Screen } from '../../../screen/screen';
import { IRegisterComponent } from '../../../models/register-component';
import { TextComponent } from '../../../components/ui/text-component/text-component';
import { TextView } from '../../../components/ui/text-component/text-view';

export class BackpackItem extends ItemComponent {
  public isItemSholdRemove: boolean = false;

  private descriptionTextComponent: TextComponent = new TextComponent(
    new TextView(250, 20),
    this.registerComponentService,
    ''
  );
  private removeTextComponent: TextComponent = new TextComponent(
    new TextView(250, 20),
    this.registerComponentService,
    'remove item'
  );

  constructor(
    private decoratedComponent: ItemComponent,
    registerComponentService: IRegisterComponent
  ) {
    super(decoratedComponent.getView(), registerComponentService);

    this.registerComponentService.unregisterComponent(decoratedComponent);

    this.removeTextComponent.setOnTriggerAction(() => this.markForRemoveItemFromBackpack());
    this.removeTextComponent.setStyle(16, 'left', 'red');
    this.descriptionTextComponent.setStyle(16, 'left', 'white');
  }
  Command;

  public get x() {
    return this.decoratedComponent.x;
  }

  public set x(value: number) {
    this.decoratedComponent.x = value;
  }

  public get y() {
    return this.decoratedComponent.y;
  }

  public set y(value: number) {
    this.decoratedComponent.y = value;
  }

  public update(canvas: Screen) {
    if (this.issInfoShown) {
      this.registerComponentService.registerComponent(this.removeTextComponent);
      this.descriptionTextComponent.setText(this.getDescription());
    } else {
      this.registerComponentService.unregisterComponent(this.removeTextComponent);
    }

    this.render(canvas);
  }

  public render(canvas: Screen): void {
    this.decoratedComponent.update(canvas);

    if (this.issInfoShown) {
      const beginningCoordinates = canvas.getBeginningOfCoordinates();

      canvas.renderRectangle(
        this.decoratedComponent.x - beginningCoordinates.x + 50,
        this.decoratedComponent.y - beginningCoordinates.y,
        300,
        75,
        'black'
      );

      this.descriptionTextComponent.x = this.decoratedComponent.x - beginningCoordinates.x + 50;
      this.descriptionTextComponent.y = this.decoratedComponent.y - beginningCoordinates.y + 20;

      this.removeTextComponent.x = this.decoratedComponent.x - beginningCoordinates.x + 50;
      this.removeTextComponent.y =
        this.decoratedComponent.y -
        beginningCoordinates.y +
        20 +
        this.descriptionTextComponent.height;

      this.descriptionTextComponent.update(canvas);
      this.removeTextComponent.update(canvas);
    }
  }

  public trigger(): void {
    this.decoratedComponent.trigger();
  }

  public markForRemoveItemFromBackpack(): void {
    this.isItemSholdRemove = true;
    this.hideInfo();
  }

  public getDescription(): string {
    return this.decoratedComponent.getDescription();
  }

  public getDecoratedComponent(): ItemComponent {
    return this.decoratedComponent;
  }
}
