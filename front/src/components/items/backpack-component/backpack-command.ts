import { Command } from '../../../utils/command';
import { ItemComponent } from '../../../utils/component';
import { PlayScene } from '../../../utils/scene';

export class BackpackCommand extends Command {
  public item: ItemComponent;

  constructor(private scene: PlayScene) {
    super();
  }

  execute() {
    this.scene
    this.scene.addItemToMap(this.item);
  }
}
