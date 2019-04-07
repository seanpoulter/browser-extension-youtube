import { Subscriber } from '../Subscriber';

describe('Subscriber', () => {
  describe('next', () => {
    it('should notify the "next" handler if is provided', () => {
      const next = jest.fn();
      const value = {};
      const subscriber = new Subscriber(next);
      subscriber.next(value);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(value);
    });

    it('should stop notifications after an error notification', () => {
      const next = jest.fn();
      const value = {};
      const subscriber = new Subscriber(next);
      subscriber.next(value);
      subscriber.error();
      subscriber.next(value);

      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should stop notifications after a complete notification', () => {
      const next = jest.fn();
      const value = {};
      const subscriber = new Subscriber(next);
      subscriber.next(value);
      subscriber.complete();
      subscriber.next(value);

      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('error', () => {
    it('should notify the "error" handler if it is provided', () => {
      const error = jest.fn();
      const err = {};
      const subscriber = new Subscriber(undefined, error);
      subscriber.error(err);
  
      expect(error).toHaveBeenCalledTimes(1);
      expect(error).toHaveBeenCalledWith(err);
    });

    it('should stop notifications after an error notification', () => {
      const error = jest.fn();
      const err = {};
      const subscriber = new Subscriber(undefined, error);
      subscriber.error(err);
      subscriber.error(err);

      expect(error).toHaveBeenCalledTimes(1);
    });

    it('should stop notifications after a complete notification', () => {
      const error = jest.fn();
      const err = {};
      const subscriber = new Subscriber(undefined, error);
      subscriber.error(err);
      subscriber.complete();
      subscriber.error(err);

      expect(error).toHaveBeenCalledTimes(1);
    });
  });

  describe('complete', () => {
    it('should notify the "complete" handler if it is provided', () => {
      const complete = jest.fn();
      const subscriber = new Subscriber(undefined, undefined, complete);
      subscriber.complete();

      expect(complete).toHaveBeenCalledTimes(1);
      expect(complete).toHaveBeenCalledWith();
    });

    it('should stop notifications after an error notification', () => {
      const complete = jest.fn();
      const subscriber = new Subscriber(undefined, undefined, complete);
      subscriber.complete();
      subscriber.complete();

      expect(complete).toHaveBeenCalledTimes(1);
    });

    it('should stop notifications after a complete notification', () => {
      const complete = jest.fn();
      const subscriber = new Subscriber(undefined, undefined, complete);
      subscriber.complete();
      subscriber.complete();
      subscriber.complete();

      expect(complete).toHaveBeenCalledTimes(1);
    });
  });
});
