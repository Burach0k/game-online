import { Scene } from '../../../utils/scene';
import { Screen } from '../../canvas/canvas';
import { keyCodes, sceneNames } from '../../../consts';
import { ScreenEventManager } from '../../../event-managers/keyboard-event-manager';

export class Play extends Scene {
  private callback: (scene: sceneNames) => void;
  private keyboardEventManager = new ScreenEventManager(this.screen);
  private tileMap: HTMLImageElement = new Image();

  constructor(screen: Screen) {
    super(screen);
  }

  init(): Promise<any> {
    this.keyboardEventManager.subscribe('keydown', (data) => this.checkEvent(data.keyCode));

    return this.loadResurces();
  }

  getMapConfiguration() {
    return { tileSize: 16, land: [{ x: 1, y: 1 }] };
  }

  loadResurces(): Promise<any> {
    let resolver: Function;
    const loadingStatus = new Promise((resolve, reject) => (resolver = resolve));
    this.tileMap.src = './sprites/lands/tilemap.png';
    this.tileMap.addEventListener('load', () => resolver());
    return loadingStatus;
  }

  render(): void {
    const data = {
      tileSize: 16,
      land: [{ tile_x: 0, tile_y: 0, map_x: 0, map_y: 0 }],
    };
    data.land.forEach((tile) => {
      this.screen.renderImg(
        this.tileMap,
        tile.tile_x * data.tileSize,
        tile.tile_y * data.tileSize,
        data.tileSize,
        data.tileSize,
        tile.map_x,
        tile.map_y,
        50,
        50
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
