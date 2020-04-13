import { EventManager, Subscription } from './event-manager';
import { Screen } from '../components/canvas/canvas';

export class ScreenEventManager extends EventManager {
  protected subscribers: Array<{
    callback: (data: any) => void;
    eventName: string;
  }> = [];

  constructor(screen: Screen) {
    super(screen);
  }

  public subscribe(
    eventName: string,
    callback: (data: any) => void
  ): Subscription {
    debugger;
    if (
      this.subscribers.find((subscriber) => subscriber.eventName === eventName)
    ) {
      this.subscribers.push({ callback, eventName });
    } else {
      document.addEventListener(eventName, (data: any) =>
        this.notify(eventName, data)
      );
      this.subscribers.push({ callback, eventName });
    }

    return {
      unsubscribe: () => {
        this.subscribers = this.subscribers.filter(
          (subscriber) =>
            subscriber.eventName !== eventName ||
            subscriber.callback !== callback
        );
      },
    };
  }
}
