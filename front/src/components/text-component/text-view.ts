import { View } from '../../utils/view';
import { Screen } from '../../screen/screen';

export class TextView extends View {
  public fontSize: number;
  public textAlign: CanvasTextAlign;
  public color: string;
  public text: string;

  constructor(height: number, width: number) {
    super(height, width);
  }

  public render(canvas: Screen, xCoordinate: number, yCoordinate: number): void {
    canvas.initTextStyle(`${this.fontSize}px serife`, this.textAlign, this.color);
    canvas.renderText(this.text, xCoordinate, yCoordinate);
  }
}
