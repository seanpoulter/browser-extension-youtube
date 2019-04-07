export class Subscriber<T> {
  private readonly _next?: (value: T) => void;
  private readonly _error?: (err: any) => void;
  private readonly _complete?: () => void;
  private _isStopped: boolean;

  constructor(next?: (value: T) => void, error?: (err: any) => void, complete?: () => void) {
    if (typeof next === 'function') {
      this._next = next;
    }
    if (typeof error === 'function') {
      this._error = error;
    }
    if (typeof complete === 'function') {
      this._complete = complete;
    }
    this._isStopped = false;
  }

  next(value: T) {
    if (!this._isStopped && this._next) {
      this._next(value);
    }
  }

  error(err?: any) {
    if (!this._isStopped && this._error) {
      this._error(err);
    }
    this._isStopped = true;
  }

  complete() {
    if (!this._isStopped && this._complete) {
      this._complete();
    }
    this._isStopped = true;
  }
}
