import { Observable } from "../Observable";
import { Subscriber } from "../Subscriber";

export function fromMutationObserver(target: Node, options: MutationObserverInit) {
  return new Observable((observer: Subscriber<MutationRecord[]>) => {
    var mutationObserver = new MutationObserver((mutations: MutationRecord[]) => {
      observer.next(mutations);
    });
    mutationObserver.observe(target, options);

    return function unsubscribe() {
      mutationObserver.disconnect();
    }
  });
}
