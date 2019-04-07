import { isDOMEventTarget } from '../../util/isDOMEventTarget';

describe('isDOMEventTarget', () => {
  it('true', () => {
    const target = {
      addEventListener: () => {},
      removeEventListener: () => {},
    };
    expect(isDOMEventTarget(target)).toBe(true);
  });

  it('should return false otherwise', () => {
    expect(isDOMEventTarget({})).toBe(false);
  });
});
