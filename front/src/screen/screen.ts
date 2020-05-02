import { ICoordinates } from '../models/tile';

export class Screen {
  public width: number;
  public height: number;
  private startXCoordinate: number = 0;
  private startYCoordinate: number = 0;
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

  public init(): void {
    this.canvasElement = <HTMLCanvasElement>document.getElementById('canvas');
    this.canvasElement.width = this.width;
    this.canvasElement.height = this.height;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  public initTextStyle(
    font: string,
    textAlign: CanvasTextAlign = 'left',
    color: string = 'white'
  ): void {
    this.canvasContext.font = font;
    this.canvasContext.textAlign = textAlign;
    this.canvasContext.fillStyle = color;
  }

  public renderBackground(backgroundColor: string): void {
    this.canvasContext.clearRect(0, 0, this.width, this.height);
    this.renderRectangle(0, 0, this.width, this.height, backgroundColor);
  }

  public renderRectangle(
    xCoordinate: number,
    yCoordinate: number,
    width: number,
    height: number,
    backgroundColor: string
  ): void {
    this.canvasContext.fillStyle = backgroundColor;
    this.canvasContext.fillRect(xCoordinate, yCoordinate, width, height);
  }

  public renderText(text: string, xCoordinate: number, yCoordinate: number): void {
    this.canvasContext.fillText(text, xCoordinate, yCoordinate);
  }

  public strokeRect(
    xCoordinate: number,
    yCoordinate: number,
    width: number,
    height: number,
    backgroundColor: string
  ): void {
    this.canvasContext.strokeStyle = backgroundColor;
    this.canvasContext.strokeRect(xCoordinate, yCoordinate, width, height);
  }

  public addEventListener(eventName: string, callback: (data: any) => void): void {
    this.canvasElement.addEventListener(eventName, callback);
  }

  public removeEventListener(eventName: string, callback: (data: any) => void): void {
    this.canvasElement.removeEventListener(eventName, callback);
  }

  public setBegginingOfCoordinates(xCoordinate: number, yCoordinate: number) {
    this.startXCoordinate = xCoordinate;
    this.startYCoordinate = yCoordinate;
  }

  public getBeginningOfCoordinates(): ICoordinates {
    return { x: this.startXCoordinate, y: this.startYCoordinate };
  }

  public renderImg(
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
    this.canvasContext.drawImage(
      image,
      sx,
      sy,
      sw,
      sh,
      dx - this.startXCoordinate,
      dy - this.startYCoordinate,
      dw,
      dh
    );
  }
}
