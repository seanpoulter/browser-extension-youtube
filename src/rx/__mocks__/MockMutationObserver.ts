export class MockMutationObserver implements MutationObserver {
  private static _instance: MockMutationObserver;
  private _callback: MutationCallback;

  constructor(callback: MutationCallback) {
    this._callback = callback;
    MockMutationObserver._instance = this;
  }

  disconnect = jest.fn()
  observe = jest.fn()
  takeRecords = jest.fn()

  reset() {
    this._callback = () => {};
    this.disconnect.mockReset();
    this.observe.mockReset();
    this.takeRecords.mockReset();
  }

  trigger(mutations: MutationRecord[]) {
    this._callback(mutations, this);
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new MockMutationObserver(defaultCallback);
    }
    return this._instance;
  }
}

function defaultCallback() {
}
