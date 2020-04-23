import { Component } from '../../utils/component';
import { Screen } from '../../screen/screen';
import { TextView } from './text-view';

export class TextComponent extends Component {
  public isFocused: boolean = false;

  get width() {
    return this.view.width;
  }

  set width(width: number) {
    this.view.width = width;
  }

  get height() {
    return this.view.height;
  }

  set height(height: number) {
    this.view.height = height;
  }

  constructor(protected view: TextView, text: string) {
    super(view);
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
  public render(screen: Screen): void {
    this.view.render(screen, this.x, this.y);
  }
}
