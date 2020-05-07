import { Component } from '../../../utils/component';
import { Screen } from '../../../screen/screen';
import { IRegisterComponent } from '../../../models/register-component';
import { TextComponent } from '../../../components/ui/text-component/text-component';
import { TextView } from '../../../components/ui/text-component/text-view';

export class BackpackItem extends Component {
  private isContextMenuShown: boolean = false;
  public isItemSholdRemove: boolean = false;
  public contextMenuText: TextComponent;

  constructor(private decoratedComponent: Component, registerComponentService: IRegisterComponent) {
    super(decoratedComponent.getView(), registerComponentService);
    this.contextMenuText = new TextComponent(
      new TextView(50, 50),
      this.registerComponentService,
      'remove Item'
    );
    this.contextMenuText.setFontSize(20);
    this.contextMenuText.setOnTriggerAction(() => {
      this.isItemSholdRemove = true;
      this.isContextMenuShown = false;
      this.registerComponentService.unregisterComponent(this.contextMenuText);
    });
  }

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

  public render(canvas: Screen): void {
    this.decoratedComponent.update(canvas);

    if (this.isContextMenuShown) {
      const beginningCoordinates = canvas.getBeginningOfCoordinates();
      this.contextMenuText.x = this.decoratedComponent.x - beginningCoordinates.x + 50;

      this.contextMenuText.y = this.decoratedComponent.y - beginningCoordinates.y + 20;

      canvas.renderRectangle(
        this.decoratedComponent.x - beginningCoordinates.x + 50,
        this.decoratedComponent.y - beginningCoordinates.y,
        100,
        50,
        'black'
      );

      this.contextMenuText.update(canvas);
    }
  }

  public trigger(): void {
    this.decoratedComponent.trigger();
  }

  public changeContextMenuStatus(): void {
    this.isContextMenuShown = !this.isContextMenuShown;
    //we override this method of decoratedComponent
  }
}
