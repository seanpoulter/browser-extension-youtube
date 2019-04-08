import { Observable } from '../Observable';
import { Subscription } from '../Subscription';

describe('Observable', () => {
  describe('create', () => {
    it('should return an instance of an Observable', () => {
      expect(Observable.create(() => {})).toBeInstanceOf(Observable);
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
