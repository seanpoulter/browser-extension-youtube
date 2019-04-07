import { Subscription } from '../Subscription';

describe('Subscription', () => {
  describe('closed', () => {
    it('should be false when the Subscription is created', () => {
      const subscription = new Subscription();
      expect(subscription.closed).toBe(false);
    });

    it('should be true after calling unsubscribe', () => {
      const subscription = new Subscription();
      subscription.unsubscribe();
      expect(subscription.closed).toBe(true);
    });
  });

  describe('unsubscribe', () => {
    it('should dispose of resources when a function "unsubscribe" was provided', () => {
      const mockUnsubscribe = jest.fn();
      const subscription = new Subscription(mockUnsubscribe);
      subscription.unsubscribe();

      expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
    });

    it('should not dispose of resources more than once', () => {
      const mockUnsubscribe = jest.fn();
      const subscription = new Subscription(mockUnsubscribe);
      subscription.unsubscribe();
      subscription.unsubscribe();
      
      expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
    });
  });
});