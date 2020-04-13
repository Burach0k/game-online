import { TextItem } from 'src/models/text-item';

export class Screen {
  public width: number;
  public height: number;
  private canvasElement: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;

  constructor(width: number = 360, height: number = 360) {
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

  renderImg(img: HTMLImageElement): void {
    //пока тестовый вариант
    this.canvasContext.clearRect(0, 0, 100, 100);
    this.canvasContext.drawImage(img, 0, 0, 32, 32, 0, 0, 32, 32);
  }

  getContext(): CanvasRenderingContext2D {
    //как думаешь, стоит ли передавать это за пределы класаа? Если нет, то переделай класс menu
    return this.canvasContext;
  }

  initTextStyle(font: string, textAlign: CanvasTextAlign = 'left'): void {
    this.canvasContext.font = font;
    this.canvasContext.textAlign = textAlign;
  }

  renderBackground(backgraundColor: string): void {
    this.canvasContext.clearRect(0, 0, this.width, this.height);
    this.canvasContext.fillStyle = backgraundColor;
    this.canvasContext.fillRect(0, 0, this.width, this.height);
  }

  renderText(item: TextItem): void {
    this.canvasContext.fillStyle = item.color;
    this.canvasContext.fillText(item.text, item.x, item.y);
  }

  addEventListener(eventName: string, callback: (data: any) => void) {
    this.canvasElement.addEventListener(eventName, callback);
  }

  removeEventListener(eventName: string, callback: (data: any) => void) {
    this.canvasElement.removeEventListener(eventName, callback);
  }
}
