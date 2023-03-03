import { describe, it } from 'vitest';
import { testRoute } from './components/AddTestRoute';
import { getDistanceBetweenTwoPoints } from './distance';

describe('distance', () => {
  it('calculates the distance between two points', () => {
    const point1 = testRoute[0];
    const point2 = testRoute[1];
    if (!point1 || !point2) {
      throw new Error('Invalid test data');
    }
    expect(getDistanceBetweenTwoPoints(point1, point2)).toEqual(5.131828552736544);
  });

  it('returns 0 if equal points', () => {
    const point1 = testRoute[0];
    if (!point1) {
      throw new Error('Invalid test data');
    }
    expect(getDistanceBetweenTwoPoints(point1, point1)).toEqual(0);
  });
});
