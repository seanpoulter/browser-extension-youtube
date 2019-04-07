export class Subscription {
  private _closed: boolean;
  private readonly _unsubscribe?: () => void

  constructor(unsubscribe: void | (() => void)) {
    this._closed = false;
    if (unsubscribe) {
      this._unsubscribe = unsubscribe;
    }
  }

  get closed() {
    return this._closed;
  }

  unsubscribe() {
    if (this._closed) {
      return;
    }

    this._closed = true;
    if (this._unsubscribe) {
      this._unsubscribe();
    }
  }
}
