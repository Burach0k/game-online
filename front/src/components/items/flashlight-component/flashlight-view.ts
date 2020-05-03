import { View } from '../../../utils/view';
import { Screen } from '../../../screen/screen';
//@ts-ignore
import imageSrc from './flashlight.png';

export class flashlightView extends View {
  private flashlightImage: HTMLImageElement = new Image();

  constructor(height: number, width: number) {
    super(height, width);
    this.flashlightImage.src = imageSrc;
  }

  public render(canvas: Screen, xCoordinate: number, yCoordinate: number) {
    canvas.renderImg(
      this.flashlightImage,
      0,
      0,
      200,
      200,
      xCoordinate,
      yCoordinate,
      this.width,
      this.height
    );
  }
}
