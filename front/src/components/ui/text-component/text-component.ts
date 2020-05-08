import { UIComponent } from '../../../utils/component';
import { Screen } from '../../../screen/screen';
import { TextView } from './text-view';
import { IRegisterComponent } from '../../../models/register-component';

export class TextComponent extends UIComponent {
  constructor(
    protected view: TextView,
    registerComponentService: IRegisterComponent,
    text: string
  ) {
    super(view, registerComponentService);
    this.registerComponentService.registerComponent(this);
    this.view.text = text;
  }

  public setText(text: string): void {
    this.view.text = text;
  }

  public setStyle(
    fontSize: number,
    textAlign: CanvasTextAlign = 'left',
    color: string = 'white'
  ): void {
    this.setFontSize(fontSize);
    this.setTextAlign(textAlign);
    this.setColor(color);
  }

  public setColor(color: string) {
    this.view.color = color;
  }

  public setFontSize(fontSize: number) {
    this.view.fontSize = fontSize;
  }
  public setTextAlign(textAlign: CanvasTextAlign) {
    this.view.textAlign = textAlign;
  }

  public render(canvas: Screen): void {
    this.view.render(canvas, this.x, this.y);
  }
}
