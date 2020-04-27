import io from 'socket.io-client';
import { Screen } from '../../screen/screen';
import { Scene } from '../../utils/scene';
import { sceneNames, SEVER_DOMAIN, keyCodes } from '../../consts';
import { KeyboardEventManager } from '../../event-managers/keyboard-event-manager';
import { CharacterComponent } from '../../components/character-component/character-component';
import { CharacterView } from '../../components/character-component/character-view';
import { Direction } from '../../models/direction';
import { ICoordinates } from '../../models/tile';
import { Subscription } from '../../utils/event-manager';
import { throttle } from '../../helpers/throttle.decorator';

export class Play extends Scene {
  private callback: (scene: sceneNames) => void;
  private keyboardEventManager = new KeyboardEventManager(this.screen);
  private tileMap: HTMLImageElement = new Image();
  private gameSocket;
  private mapData;
  private mainCharacter: CharacterComponent;
  private characters: CharacterComponent[] = [];
  private subscriptions: Subscription[] = [];

  private nextCharacterCellCalculator: {
    [key in Direction]: (character: CharacterComponent) => ICoordinates;
  } = {
    [Direction.Right]: (character) => ({
      x: Math.ceil(character.x + character.speed),
      y: character.y,
    }),
    [Direction.Left]: (character) => ({
      x: Math.floor(character.x - character.speed),
      y: character.y,
    }),
    [Direction.Up]: (character) => ({
      x: character.x,
      y: Math.floor(character.y - character.speed),
    }),
    [Direction.Down]: (character) => ({
      x: character.x,
      y: Math.ceil(character.y + character.speed),
    }),
    [Direction.Stop]: (character) => ({ x: character.x, y: character.y }),
  };

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

    return this.loadResurces().then(() => {
      this.mainCharacter = new CharacterComponent(
        new CharacterView(
          this.mapData.tileSize,
          this.mapData.tileSize,
          { x: 23, y: 0 },
          this.tileMap
        )
      );

      this.characters.push(
        new CharacterComponent(
          new CharacterView(
            this.mapData.tileSize,
            this.mapData.tileSize,
            { x: 23, y: 6 },
            this.tileMap
          )
        )
      );
    });
  }

  public destroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public loadResurces(): Promise<any> {
    this.gameSocket = io.connect(SEVER_DOMAIN);
    const dataPrimse = new Promise((resolve, reject) =>
      this.gameSocket.on('data', (data) => {
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
    }
  }

  public onChangeScene(callback: (scene: sceneNames) => void): void {
    this.callback = callback;
  }

  public render(): void {
    this.renderMap();
    this.moveCharacter(this.mainCharacter);
    this.mainCharacter.render(this.screen);
    this.characters.forEach((character) => {
      this.setCharacterRandomDirection(character);
      this.moveCharacter(character);
      character.render(this.screen);
    });
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

  private moveCharacter(character: CharacterComponent): void {
    if (this.checkNextCell(this.nextCharacterCellCalculator[character.direction](character))) {
      const nextCharacterPosition = character.calculateNextCoordinates();
      character.moveTo(nextCharacterPosition.x, nextCharacterPosition.y);
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

  private checkNextCell({ x, y }: ICoordinates): boolean {
    if (x < 0 || y < 0) {
      return false;
    }
    return !(
      this.mapData.land[Math.floor(Number(y.toFixed(2)))][Math.floor(Number(x.toFixed(2)))]
        .isBarrier ||
      this.mapData.land[Math.ceil(Number(y.toFixed(2)))][Math.ceil(Number(x.toFixed(2)))].isBarrier
    );
  }

  private renderMap(): void {
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
    });
  }
}
