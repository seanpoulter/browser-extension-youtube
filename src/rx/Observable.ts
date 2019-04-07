import { Subscriber } from './Subscriber'
import { Subscription } from './Subscription'

export class Observable<T> {
  private readonly _subscribe: (observer: Subscriber<T>) => void | (() => void);

  constructor(subscribe: (observer: Subscriber<T>) => void | (() => void)) {
    this._subscribe = subscribe;
  }

  subscribe(next?: (value: T) => void, error?: (err: any) => void, complete?: () => void): Subscription {
    const observer = new Subscriber(next, error, complete);
    const unsubscribe = this._subscribe(observer);
    return new Subscription(unsubscribe);
  }

  static create<T>(onSubscription: (observer: Subscriber<T>) => void) {
    return new Observable(onSubscription)
  }
}
