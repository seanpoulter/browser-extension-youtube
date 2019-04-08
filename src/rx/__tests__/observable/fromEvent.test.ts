import { fromEvent } from "../../observable/fromEvent";
import { Observable } from "../../Observable";
import { MockDOMEventTarget } from "../../__mocks__/MockDOMEventTarget";

describe('fromEvent', () => {
  describe('DOMEventTarget', () => {
    it('should return an instance of an Observable', () => {
      const target = {
        addEventListener: () => {},
        removeEventListener: () => {},
      }
      const observable = fromEvent(target, 'click');

      expect(observable).toBeInstanceOf(Observable);
    });

    it('should add an event listener to notify "next" events', () => {
      const target = {
        addEventListener: jest.fn(),
        removeEventListener: () => {},
      };
      const observable = fromEvent(target, 'click');
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
      const observable = fromEvent(target, 'click');
      const subscription = observable.subscribe();
      subscription.unsubscribe();

      const [type, listener] = target.addEventListener.mock.calls[0];
      expect(target.removeEventListener).toHaveBeenCalledTimes(1);
      expect(target.removeEventListener).toHaveBeenCalledWith(type, listener);
    });

    it('should deliver notifications for the "next" event', () => {
      const next = jest.fn();
      const target = new MockDOMEventTarget();
      const observable = fromEvent(target, 'click');
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
      fromEvent('invalid');
    }
    expect(fromInvalidEventTarget).toThrow(TypeError);
    expect(fromInvalidEventTarget).toThrow('Invalid event target');
  });
});
