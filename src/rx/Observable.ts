import { Subscriber } from './Subscriber'
import { Subscription } from './Subscription'
import { isDOMEventTarget } from './util/isDOMEventTarget';

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

  static fromEvent(target: EventTargetLike, eventName: string) {
    if (isDOMEventTarget(target)) {
      return new Observable<Event>(observer => {
        function listener(event: Event) {
          observer.next(event);
        }
        target.addEventListener(eventName, listener);
        return function unsubscribe() {
          target.removeEventListener(eventName, listener);
        }
      });  
    }
    else {
      throw new TypeError('Invalid event target');
    }
  }
}

type EventTargetLike = DOMEventTarget

export interface DOMEventTarget {
  addEventListener: (type: string, listener: EventListener) => void
  removeEventListener: (type: string, listener: EventListener) => void
}
