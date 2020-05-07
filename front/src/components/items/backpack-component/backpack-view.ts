import { View } from '../../../utils/view';
import { Screen } from '../../../screen/screen';
//@ts-ignore
import imageSrc from './backpack.png';

export class BackpackView extends View {
  private backpackImage: HTMLImageElement = new Image();

  constructor(height: number, width: number) {
    super(height, width);
    this.backpackImage.src = imageSrc;
  }

  public render(canvas: Screen, xCoordinate: number, yCoordinate: number) {
    canvas.renderImg(
      this.backpackImage,
      0,
      0,
      420,
      420,
      xCoordinate,
      yCoordinate,
      this.width,
      this.height
    );
  }
}
