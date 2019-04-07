export class MockDOMEventTarget {
  private _listenersByType: { [type: string]: EventListener[] };

  constructor() {
    this._listenersByType = {};
  }

  addEventListener (type: string, listener: EventListener) {
    if (!(type in this._listenersByType)) {
      this._listenersByType[type] = [];
    }
    this._listenersByType[type].push(listener);
  }

  removeEventListener(type: string, listener: EventListener) {
    if (type in this._listenersByType) {
      this._listenersByType[type] = this._listenersByType[type].filter(fn => fn === listener);
    }
  }

  emit(event: Event) {
    if (event.type in this._listenersByType) {
      this._listenersByType[event.type].forEach(listener => listener(event));
    }
  }
}
