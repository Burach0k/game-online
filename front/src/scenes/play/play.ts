import io from 'socket.io-client';
import { Screen } from '../../screen/screen';
import { Scene } from '../../utils/scene';
import { sceneNames, SEVER_DOMAIN, keyCodes } from '../../consts';
import { KeyboardEventManager } from '../../event-managers/keyboard-event-manager';
import { CharacterComponent } from '../../components/character-component/character-component';
import { CharacterView } from '../../components/character-component/character-view';
import { Direction } from '../../models/direction';
import { Subscription } from '../../utils/event-manager';
import { throttle } from '../../helpers/throttle.decorator';
import { gameMap } from '../../game-map/game-map';

export class Play extends Scene {
  private callback: (scene: sceneNames) => void;
  private keyboardEventManager = new KeyboardEventManager(this.screen);
  private tileImages: HTMLImageElement = new Image();
  private gameSocket;
  private map: gameMap;
  private mainCharacter: CharacterComponent;
  private characters: CharacterComponent[] = [];
  private subscriptions: Subscription[] = [];

  constructor(screen: Screen) {
    super(screen);
  }

  public init(): Promise<any> {
    this.subscriptions.push(
      this.keyboardEventManager.subscribe('keydown', (data: KeyboardEvent) => {
        if (!data.repeat) {
          this.setCharacterDirection(this.mainCharacter, data.keyCode);
        }
      }),

      this.keyboardEventManager.subscribe('keyup', (data: KeyboardEvent) =>
        this.stopCharacterMove(this.mainCharacter)
      )
    );

    return this.loadResurces().then(([mapData]) => {
      this.mainCharacter = new CharacterComponent(
        new CharacterView(mapData.tileSize, mapData.tileSize, { x: 23, y: 0 }, this.tileImages)
      );

      this.characters.push(
        new CharacterComponent(
          new CharacterView(mapData.tileSize, mapData.tileSize, { x: 23, y: 6 }, this.tileImages)
        )
      );

      this.map = new gameMap(this.screen, this.tileImages);
      this.map.setMapConfig(mapData);

      [this.mainCharacter, ...this.characters].forEach((component) =>
        this.map.registerComponent(component)
      );
    });
  }

  public destroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public loadResurces(): Promise<any> {
    this.gameSocket = io.connect(SEVER_DOMAIN);
    const dataPrimse = new Promise((resolve, reject) =>
      this.gameSocket.on('data', (mapData) => {
        resolve(mapData);
      })
    );

    const mapPomise = fetch(`${SEVER_DOMAIN}/source_map`)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        return new Promise((resolve, reject) => {
          const blob = new Blob([buffer], { type: 'image/png' });
          const imageUrl = window.URL.createObjectURL(blob);
          this.tileImages.src = imageUrl;
          this.tileImages.addEventListener('load', resolve);
        });
      });

    return Promise.all([dataPrimse, mapPomise]);
  }

  public checkEvent(key: number): void {
    switch (key) {
      case keyCodes.Escape:
        this.callback(sceneNames.Menu);
        break;
    }
  }

  public onChangeScene(callback: (scene: sceneNames) => void): void {
    this.callback = callback;
  }

  public render(): void {
    this.characters.forEach((character) => {
      this.setCharacterRandomDirection(character);
    });

    this.map.render();
  }

  private setCharacterDirection(character: CharacterComponent, keyboardCode: number) {
    switch (keyboardCode) {
      case keyCodes.ArrowUp:
        character.startMotion(Direction.Up);
        break;
      case keyCodes.ArrowDown:
        character.startMotion(Direction.Down);
        break;
      case keyCodes.ArrowLeft:
        character.startMotion(Direction.Left);
        break;
      case keyCodes.ArrowRight:
        character.startMotion(Direction.Right);
        break;
    }
  }

  @throttle(1000)
  private setCharacterRandomDirection(character: CharacterComponent): void {
    const possibleDirections = Object.keys(Direction);
    const direction =
      Direction[possibleDirections[Math.round(Math.random() * (possibleDirections.length - 1))]];

    character.startMotion(direction);
  }

  private stopCharacterMove(character: CharacterComponent): void {
    character.stopMotion();
  }
}
