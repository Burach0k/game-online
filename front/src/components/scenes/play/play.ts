import { Scene } from '../../../utils/scene';
import { Screen } from '../../canvas/canvas';
import { keyCodes, sceneNames, SEVER_DOMAIN } from '../../../consts';
import { ScreenEventManager } from '../../../event-managers/keyboard-event-manager';
import io from 'socket.io-client';
export class Play extends Scene {
  private callback: (scene: sceneNames) => void;
  private keyboardEventManager = new ScreenEventManager(this.screen);
  private tileMap: HTMLImageElement = new Image();
  private gameSocket;
  private mapData;

  constructor(screen: Screen) {
    super(screen);
  }

  init(): Promise<any> {
    this.keyboardEventManager.subscribe('keydown', (data) => this.checkEvent(data.keyCode));

    return this.loadResurces();
  }

  loadResurces(): Promise<any> {
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

  render(): void {
    this.mapData.land.forEach((tile) => {
      this.screen.renderImg(
        this.tileMap,
        tile.tile_x * this.mapData.tileSize,
        tile.tile_y * this.mapData.tileSize,
        this.mapData.tileSize,
        this.mapData.tileSize,
        tile.map_x,
        tile.map_y,
        32,
        32
      );
    });
  }

  checkEvent(key: number): void {
    switch (key) {
      case keyCodes.Escape:
        this.callback(sceneNames.Menu);
        break;
    }
  }

  onChangeScene(callback: (scene: sceneNames) => void): void {
    this.callback = callback;
  }
}
