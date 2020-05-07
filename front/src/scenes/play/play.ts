import io from 'socket.io-client';
import { Screen } from '../../screen/screen';
import { Scene } from '../../utils/scene';
import { sceneNames, SEVER_DOMAIN, keyCodes } from '../../consts';
import { CharacterComponent } from '../../components/persons/character-component/character-component';
import { CharacterView } from '../../components/persons/character-component/character-view';
import { Direction } from '../../models/direction';
import { Subscription } from '../../utils/event-manager';
import { throttle } from '../../helpers/throttle.decorator';
import { gameMap } from '../../game-map/game-map';
import { DayPeriods } from '../../game-map/game-map.model';
import { HeroComponent } from '../../components/persons/hero-component/hero-coponent';
import { BackpackComponent } from '../../components/items/backpack-component/backpack-component';
import { BackpackView } from '../../components/items/backpack-component/backpack-view';
import { BackpackCommand } from '../../components/items/backpack-component/backpack-command';
import { FlashlightComponent } from '../../components/items/flashlight-component/flashlight-componet';
import { flashlightView } from '../../components/items/flashlight-component/flashlight-view';
import { BatteryComponent } from '../../components/items/battery-component/battery-component';
import { BatteryView } from '../../components/items/battery-component/battery-view';
import { BatteryCommand } from '../../components/items/battery-component/battery-command';
import { RegisterComponentService } from '../../services/action-component-service';

export class Play extends Scene {
  private callback: (scene: sceneNames) => void;
  private tileImages: HTMLImageElement = new Image();
  private gameSocket;
  private map: gameMap;
  private mainCharacter: CharacterComponent;
  private characters: CharacterComponent[] = [];
  private subscriptions: Subscription[] = [];
  private registerComponentService = new RegisterComponentService(this.screen);

  constructor(screen: Screen) {
    super(screen);
  }

  public init(): Promise<any> {
    this.subscriptions.push(
      this.keyboardEventManager.subscribe('keydown', (event: KeyboardEvent) => {
        if (!event.repeat) {
          this.setCharacterDirection(this.mainCharacter, event.keyCode);
        }
      }),

      this.keyboardEventManager.subscribe('click', (event: MouseEvent) => {
        this.registerComponentService
          .getRegisterComponentsByCoordinate(event.clientX, event.clientY)
          .forEach((component) => component.trigger());
      }),

      this.keyboardEventManager.subscribe('contextmenu', (event: MouseEvent) => {
        event.preventDefault();
        this.registerComponentService
          .getRegisterComponentsByCoordinate(event.clientX, event.clientY)
          .forEach((component) => component.changeContextMenuStatus());
      }),

      this.keyboardEventManager.subscribe('keyup', (event: KeyboardEvent) =>
        this.stopCharacterMove(this.mainCharacter)
      )
    );

    return this.loadResurces().then(([mapData]) => {
      this.mainCharacter = this.initMainCharacter(mapData.tileSize, mapData.tileSize);
      this.characters.push(this.initNPC(mapData.tileSize, mapData.tileSize));

      this.map = new gameMap(this.screen, this.tileImages);
      this.map.setMapConfig(mapData);
      this.map.followCameraForComponent(this.mainCharacter);

      [...this.characters, this.mainCharacter].forEach((component) => {
        this.map.addComponentToMap(component);
      });

      this.debuggingMethod();
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

  public update(): void {
    this.characters.forEach((character) => {
      this.setCharacterRandomDirection(character);
    });

    this.render();
  }

  public render(): void {
    this.map.render();
  }

  private initMainCharacter(width: number, height: number): HeroComponent {
    const mainCharacter = new HeroComponent(
      new CharacterView(width, height, { x: 23, y: 0 }, this.tileImages),
      this.registerComponentService
    );
    const backPack = new BackpackComponent(
      new BackpackView(100, 100),
      this.registerComponentService
    );
    const flashlight = new FlashlightComponent(
      new flashlightView(50, 50),
      this.registerComponentService
    );
    const battery = new BatteryComponent(new BatteryView(100, 100), this.registerComponentService);

    battery.setCommand(new BatteryCommand(mainCharacter));
    backPack.setCommand(new BackpackCommand(this));
    backPack.addItemToBackpack(battery);
    mainCharacter.takeBackpack(backPack);
    mainCharacter.takeFLashlight(flashlight);

    return mainCharacter;
  }

  public initNPC(width: number, height: number): CharacterComponent {
    const npc = new CharacterComponent(
      new CharacterView(width, height, { x: 23, y: 6 }, this.tileImages),
      this.registerComponentService
    );

    return npc;
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

  private debuggingMethod() {
    //this code below will be removed, only for demonstarate new functionality
    let select = document.createElement('select');
    select.style.position = 'absolute';
    select.style.left = '0px';

    let option = document.createElement('option');
    option.setAttribute('value', DayPeriods.Day);
    option.text = 'set day period';
    select.appendChild(option);

    option = document.createElement('option');
    option.setAttribute('value', DayPeriods.Night);
    option.text = 'set night period';
    select.appendChild(option);

    select.addEventListener(
      'change',
      ((select) => {
        this.map.setTime(select.value as DayPeriods);
      }).bind(null, select)
    );

    document.body.appendChild(select);

    select = document.createElement('select');
    select.style.position = 'absolute';
    select.style.right = '0px';

    option = document.createElement('option');
    option.setAttribute('value', 'mainCharacter');
    option.text = 'view main character';
    select.appendChild(option);

    option = document.createElement('option');
    option.setAttribute('value', 'npc');
    option.text = 'view npc';
    select.appendChild(option);

    select.addEventListener('change', () => {
      if (select.value === 'mainCharacter') {
        this.map.followCameraForComponent(this.mainCharacter);
      } else {
        this.map.followCameraForComponent(this.characters[0]);
      }
    });

    document.body.appendChild(select);
  }
}
