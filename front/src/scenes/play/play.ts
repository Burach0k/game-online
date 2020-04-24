import io from 'socket.io-client';
import { Screen } from '../../screen/screen';
import { Scene } from '../../utils/scene';
import { sceneNames, SEVER_DOMAIN, keyCodes } from '../../consts';
import { KeyboardEventManager } from '../../event-managers/keyboard-event-manager';
import { CharacterComponent } from '../../components/character-component/character-component';
import { CharacterView } from '../../components/character-component/character-view';

export class Play extends Scene {
  private callback: (scene: sceneNames) => void;
  private keyboardEventManager = new KeyboardEventManager(this.screen);
  private tileMap: HTMLImageElement = new Image();
  private gameSocket;
  private mapData;
  private character: CharacterComponent;

  constructor(screen: Screen) {
    super(screen);
  }

  public init(): Promise<any> {
    this.keyboardEventManager.subscribe('keydown', (data: KeyboardEvent) =>
      this.checkEvent(data.keyCode)
    );

    this.keyboardEventManager.subscribe('keyup', (data: KeyboardEvent) => this.stopCharacterMove());

    return this.loadResurces().then(() => {
      this.character = new CharacterComponent(
        new CharacterView(this.mapData.tileSize, this.mapData.tileSize, this.tileMap)
      );
    });
  }

  public loadResurces(): Promise<any> {
    this.gameSocket = io.connect(SEVER_DOMAIN);
    const dataPrimse = new Promise((resolve, reject) =>
      this.gameSocket.on('data', (data) => {
        console.log(data);
        if (!this.mapData) {
          resolve();
        }
        this.mapData = data;
      })
    );

    const mapPomise = fetch(`${SEVER_DOMAIN}/source_map`)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        return new Promise((resolve, reject) => {
          const blob = new Blob([buffer], { type: 'image/png' });
          const imageUrl = window.URL.createObjectURL(blob);
          this.tileMap.src = imageUrl;
          this.tileMap.addEventListener('load', resolve);
        });
      });

    return Promise.all([dataPrimse, mapPomise]);
  }

  public checkEvent(key: number): void {
    switch (key) {
      case keyCodes.Escape:
        this.callback(sceneNames.Menu);
        break;
      case keyCodes.ArrowUp:
        this.character.startMotion(this.character.x, this.character.y - 0.1);
        if (this.checkNextCell(this.character.x, Math.floor(this.character.y - 0.1))) {
          this.character.moveTo(this.character.x, this.character.y - 0.1);
        }
        break;
      case keyCodes.ArrowDown:
        this.character.startMotion(this.character.x, this.character.y + 0.1);
        if (this.checkNextCell(this.character.x, Math.ceil(this.character.y + 0.1))) {
          this.character.moveTo(this.character.x, this.character.y + 0.1);
        }
        break;
      case keyCodes.ArrowLeft:
        this.character.startMotion(this.character.x - 0.1, this.character.y);
        if (this.checkNextCell(Math.floor(this.character.x - 0.1), this.character.y)) {
          this.character.moveTo(this.character.x - 0.1, this.character.y);
        }
        break;
      case keyCodes.ArrowRight:
        this.character.startMotion(this.character.x + 0.1, this.character.y);
        if (this.checkNextCell(Math.ceil(this.character.x + 0.1), this.character.y)) {
          this.character.moveTo(this.character.x + 0.1, this.character.y);
        }
        break;
    }
  }

  public onChangeScene(callback: (scene: sceneNames) => void): void {
    this.callback = callback;
  }

  private stopCharacterMove(): void {
    this.character.stopMotion();
  }

  public render(): void {
    this.screen.renderBackground('green');
    this.mapData.land.forEach((tiles, yCoordinate) => {
      tiles.forEach((tile, xCoordinate) => {
        this.screen.renderImg(
          this.tileMap,
          tile.tileX * this.mapData.tileSize,
          tile.tileY * this.mapData.tileSize,
          this.mapData.tileSize,
          this.mapData.tileSize,
          xCoordinate * 50,
          yCoordinate * 50,
          50,
          50
        );
      });
      this.character.render(this.screen);
    });
  }

  private checkNextCell(xCoordinate: number, yCoordinate: number): boolean {
    return !(
      this.mapData.land[Math.floor(+yCoordinate.toFixed(2))][Math.floor(+xCoordinate.toFixed(2))]
        .isBarrier ||
      this.mapData.land[Math.ceil(+yCoordinate.toFixed(2))][Math.ceil(+xCoordinate.toFixed(2))]
        .isBarrier
    );
  }
}
