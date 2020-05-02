import { Command } from '../../../utils/command';
import { Component } from '../../../utils/component';
import { Scene } from '../../../utils/scene';

export class BackpackCommand extends Command {
  public isRegisterItem: boolean;
  public item: Component;

  constructor(private scene: Scene) {
    super();
  }

  execute() {
    if (this.isRegisterItem) {
      this.scene.registerComponent(this.item);
    } else {
      this.scene.unregisterComponent(this.item);
    }
  }
}
