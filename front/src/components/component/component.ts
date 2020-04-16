import { Component } from '../../utils/component';
import { Screen } from '../canvas/canvas';

export class TextComponent extends Component {
  public fontSize: number;
  public textAlign: CanvasTextAlign;
  public color: string;

  constructor(public text: string, height: number, width: number) {
    super(height, width);
  }

  setStyle(fontSize: number, textAlign: CanvasTextAlign = 'left', color: string = 'white'): void {
    this.fontSize = fontSize;
    this.textAlign = textAlign;
    this.color = color;
  }

  render(canvas: Screen) {
    canvas.initTextStyle(`${this.fontSize}px serife`, this.textAlign, this.color);
    canvas.renderText(this);
  }
}
