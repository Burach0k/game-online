import { ItemView } from '../../../utils/view';
import { Screen } from '../../../screen/screen';
//@ts-ignore
import imageSrc from './flashlight.png';

export class flashlightView extends ItemView {
  constructor(height: number, width: number) {
    super(height, width);
    this.image.src = imageSrc;
  }

  public render(canvas: Screen, xCoordinate: number, yCoordinate: number) {
    canvas.renderImg(this.image, 0, 0, 200, 200, xCoordinate, yCoordinate, this.width, this.height);
  }
}
