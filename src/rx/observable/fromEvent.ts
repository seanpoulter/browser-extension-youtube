import { Observable } from '../Observable';
import { isDOMEventTarget } from '../util/isDOMEventTarget';

export function fromEvent(target: EventTargetLike, eventName: string) {
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

type EventTargetLike = DOMEventTarget

export interface DOMEventTarget {
  addEventListener: (type: string, listener: EventListener) => void
  removeEventListener: (type: string, listener: EventListener) => void
}
