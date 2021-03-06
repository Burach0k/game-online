import { Screen } from '../screen/screen';
import { EventManager, Subscription } from '../utils/event-manager';

export class MouseEventManager extends EventManager {
  protected subscribers: Array<{
    callback: (data: any) => void;
    eventName: string;
  }> = [];

  constructor(screen: Screen) {
    super(screen);
  }

  public subscribe(eventName: string, callback: (data: any) => void): Subscription {
    if (this.subscribers.find((subscriber) => subscriber.eventName === eventName)) {
      this.subscribers.push({ callback, eventName });
    } else {
      this.screen.addEventListener(eventName, (data: any) => this.notify(eventName, data));
      this.subscribers.push({ callback, eventName });
    }

    return {
      unsubscribe: () =>
        (this.subscribers = this.subscribers.filter(
          (subscriber) => subscriber.eventName !== eventName || subscriber.callback !== callback
        )),
    };
  }
}
