export type Subscription = { unsubscribe: () => void };

export abstract class EventManager {
  protected subscribers: Array<{
    callback: (data: any) => void;
    eventName: string;
  }>;
  protected screen: {
    addEventListener: Function;
    removeEventListener: Function;
  };

  constructor(screen: {
    addEventListener: Function;
    removeEventListener: Function;
  }) {
    this.screen = screen;
  }

  public abstract subscribe(
    eventName: string,
    callback: (edata: any) => void
  ): Subscription;

  protected notify(eventName: string, data: any): void {
    this.subscribers.forEach((subscriber) => {
      if (subscriber.eventName === eventName) {
        subscriber.callback(data);
      }
    });
  }
}
