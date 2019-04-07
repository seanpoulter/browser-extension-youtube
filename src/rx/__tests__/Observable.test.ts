import { Observable } from '../Observable';
import { Subscription } from '../Subscription';
import { MockDOMEventTarget } from '../__mocks__/MockDOMEventTarget';

describe('Observable', () => {
  describe('create', () => {
    it('should return an instance of an Observable', () => {
      expect(Observable.create(() => {})).toBeInstanceOf(Observable);
    });
  });

  describe('fromEvent', () => {
    describe('DOMEventTarget', () => {
      it('should return an instance of an Observable', () => {
        const target = {
          addEventListener: () => {},
          removeEventListener: () => {},
        }
        const observable = Observable.fromEvent(target, 'click');
  
        expect(observable).toBeInstanceOf(Observable);
      });

      it('should add an event listener to notify "next" events', () => {
        const target = {
          addEventListener: jest.fn(),
          removeEventListener: () => {},
        };
        const observable = Observable.fromEvent(target, 'click');
        observable.subscribe();
  
        expect(target.addEventListener).toHaveBeenCalledTimes(1);
        const [type] = target.addEventListener.mock.calls[0];
        expect(type).toBe('click');
      });

      it('should remove the event listener when unsubscribed', () => {
        const target = {
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
        };
        const observable = Observable.fromEvent(target, 'click');
        const subscription = observable.subscribe();
        subscription.unsubscribe();

        const [type, listener] = target.addEventListener.mock.calls[0];
        expect(target.removeEventListener).toHaveBeenCalledTimes(1);
        expect(target.removeEventListener).toHaveBeenCalledWith(type, listener);
      });

      it('should ', () => {
        const next = jest.fn();
        const target = new MockDOMEventTarget();
        const observable = Observable.fromEvent(target, 'click');
        const subscription = observable.subscribe(next);

        expect(next).toHaveBeenCalledTimes(0);
        target.emit({ type: 'click' } as Event);
        target.emit({ type: 'click' } as Event);
        expect(next).toHaveBeenCalledTimes(2);

        subscription.unsubscribe();
      });
    });

    it('should throw an error for an invalid event target', () => {
      function fromInvalidEventTarget() {
        // @ts-ignore: Argument does not have the right type
        Observable.fromEvent('invalid');
      }
      expect(fromInvalidEventTarget).toThrow(TypeError);
      expect(fromInvalidEventTarget).toThrow('Invalid event target');
    });
  });

  describe('subscribe', () => {
    it('should execute the Observable function', () => {
      const mockSubscribe = jest.fn();
      const observable = new Observable(mockSubscribe);

      expect(mockSubscribe).not.toHaveBeenCalled();
      observable.subscribe();
      expect(mockSubscribe).toHaveBeenCalledTimes(1);
      observable.subscribe();
      expect(mockSubscribe).toHaveBeenCalledTimes(2);
    });

    it('should deliver notifications for the "next" value', () => {
      const next = jest.fn();

      const observable = new Observable<number>(observer => {
        observer.next(1);
        observer.next(2);
        observer.next(3);
        observer.complete();
      });
      observable.subscribe(next);

      expect(next).toHaveBeenCalledTimes(3);
      expect(next).toHaveBeenNthCalledWith(1, 1);
      expect(next).toHaveBeenNthCalledWith(2, 2);
      expect(next).toHaveBeenNthCalledWith(3, 3);
    });

    it('should deliver notifications for an "error"', () => {
      const err = {};
      const error = jest.fn();

      const observable = new Observable(observer => { observer.error(err); });
      observable.subscribe(undefined, error);

      expect(error).toHaveBeenCalledTimes(1);
      expect(error).toHaveBeenCalledWith(err);
    });

    it('should deliver notifications for "complete"', () => {
      const complete = jest.fn();

      const observable = new Observable(observer => { observer.complete(); });
      observable.subscribe(undefined, undefined, complete);

      expect(complete).toHaveBeenCalledTimes(1);
      expect(complete).toHaveBeenCalledWith();
    });

    it('should return a Subscription to release resources', () => {
      const observable = new Observable(observer => {
        observer.next(1);
        observer.next(2);
        observer.complete();
      });
      const subscription = observable.subscribe();

      expect(subscription).toBeInstanceOf(Subscription);
    });
  });
});
