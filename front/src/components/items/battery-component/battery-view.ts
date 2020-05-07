import { View } from '../../../utils/view';
import { Screen } from '../../../screen/screen';

//@ts-ignore
import imageSrc from './battery.png';

export class BatteryView extends View {
  private batteryImage: HTMLImageElement = new Image();

  constructor(height: number, width: number) {
    super(height, width);
    this.batteryImage.src = imageSrc;
  }

  public render(canvas: Screen, xCoordinate: number, yCoordinate: number) {
    canvas.renderImg(
      this.batteryImage,
      0,
      0,
      256,
      256,
      xCoordinate,
      yCoordinate,
      this.width,
      this.height
    );
  }
}
