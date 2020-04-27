import { TextComponent } from '../components/text-component/text-component';

export class Screen {
  public width: number;
  public height: number;
  private canvasElement: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;

  constructor(
    width: number = document.documentElement.clientWidth,
    height: number = document.documentElement.clientHeight
  ) {
    this.width = width;
    this.height = height;

    this.init();
  }

  init(): void {
    this.canvasElement = <HTMLCanvasElement>document.getElementById('canvas');
    this.canvasElement.width = this.width;
    this.canvasElement.height = this.height;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  initTextStyle(font: string, textAlign: CanvasTextAlign = 'left', color: string = 'white'): void {
    this.canvasContext.font = font;
    this.canvasContext.textAlign = textAlign;
    this.canvasContext.fillStyle = color;
  }

  renderBackground(backgraundColor: string): void {
    this.canvasContext.clearRect(0, 0, this.width, this.height);
    this.canvasContext.fillStyle = backgraundColor;
    this.canvasContext.fillRect(0, 0, this.width, this.height);
  }

  renderText(text: string, xCoordinate: number, yCoordinate: number): void {
    this.canvasContext.fillText(text, xCoordinate, yCoordinate);
  }

  addEventListener(eventName: string, callback: (data: any) => void) {
    this.canvasElement.addEventListener(eventName, callback);
  }

  removeEventListener(eventName: string, callback: (data: any) => void) {
    this.canvasElement.removeEventListener(eventName, callback);
  }

  renderImg(
    image: CanvasImageSource,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ): void {
    this.canvasContext.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  }
}