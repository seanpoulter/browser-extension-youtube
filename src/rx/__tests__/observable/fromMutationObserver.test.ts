import { fromMutationObserver } from "../../observable/fromMutationObserver";
import { Observable } from "../../Observable";
import { MockMutationObserver } from '../../__mocks__/MockMutationObserver';

interface MutationObserverConstructor {
  new (callback: MutationCallback): MutationObserver
}

declare global {
  interface Window {
    MutationObserver: MutationObserverConstructor
  }
}

describe('fromMutationObserver', () => {
  let original: MutationObserverConstructor;

  beforeAll(() => {
    if (window && window.MutationObserver) {
      original = MutationObserver;
    }
    window.MutationObserver = MockMutationObserver;
  });

  beforeEach(() => {
    MockMutationObserver.getInstance().reset();
  });

  afterAll(() => {
    if (window && typeof original !== 'undefined') {
      window.MutationObserver = original;
    }
  });

  it('should return instance of an Observable', () => {
    const target = {} as Node;
    const options = {};
    const observable = fromMutationObserver(target, options);

    expect(observable).toBeInstanceOf(Observable);
  });

  it('should create and observe a MutationObserver when subscribed', () => {
    const target = {} as Node;
    const options = {};
    const observable = fromMutationObserver(target, options);
    observable.subscribe();

    const mockMutationObserver = MockMutationObserver.getInstance();
    expect(mockMutationObserver.observe).toHaveBeenCalledTimes(1);
    expect(mockMutationObserver.observe).toHaveBeenCalledWith(target, options);
  });

  it('should disconnect the MutationObserver when unsubscribed', () => {
    const target = {} as Node;
    const options = {};
    const observable = fromMutationObserver(target, options);
    const subscription = observable.subscribe();
    subscription.unsubscribe();

    const mockMutationObserver = MockMutationObserver.getInstance();
    expect(mockMutationObserver.disconnect).toHaveBeenCalledTimes(1);
  });

  it('should deliver notifications for the "next" mutation records', () => {
    const next = jest.fn();
    const target = {} as Node;
    const options = {};
    const observable = fromMutationObserver(target, options);
    const subscription = observable.subscribe(next);

    const mockMutationObserver = MockMutationObserver.getInstance();
    const mutations = [{} as MutationRecord];
    mockMutationObserver.trigger(mutations);
    subscription.unsubscribe();

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(mutations);
  });
});
