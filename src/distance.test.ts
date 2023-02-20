import { describe, it } from 'vitest';
import { getDistanceBetweenTwoPoints } from './distance';
import { Coordinate } from './features/route';

export const routeToSmooth: Coordinate[] = [
  {
    latitude: 63.106377,
    longitude: 21.59627,
  },
  {
    latitude: 63.106379,
    longitude: 21.596372,
  },
  {
    latitude: 63.10638,
    longitude: 21.596475,
  },
  {
    latitude: 63.106415,
    longitude: 21.596235,
  },
  {
    latitude: 63.106485,
    longitude: 21.5961,
  },
  {
    latitude: 63.106145,
    longitude: 21.59675,
  },
  {
    latitude: 63.106385,
    longitude: 21.59648,
  },
  {
    latitude: 63.106208,
    longitude: 21.59641,
  },
  {
    latitude: 63.106075,
    longitude: 21.596537,
  },
  {
    latitude: 63.106235,
    longitude: 21.596372,
  },
  {
    latitude: 63.106015,
    longitude: 21.596542,
  },
  {
    latitude: 63.105872,
    longitude: 21.596447,
  },
  {
    latitude: 63.10578,
    longitude: 21.59652,
  },
  {
    latitude: 63.105875,
    longitude: 21.596432,
  },
  {
    latitude: 63.10581,
    longitude: 21.596625,
  },
  {
    latitude: 63.10567,
    longitude: 21.59667,
  },
  {
    latitude: 63.10575,
    longitude: 21.596625,
  },
  {
    latitude: 63.10531,
    longitude: 21.59676,
  },
];

describe('distance', () => {
  it('calculates the distance between two points', () => {
    const point1 = routeToSmooth[0];
    const point2 = routeToSmooth[1];
    if (!point1 || !point2) {
      throw new Error('Invalid test data');
    }
    expect(getDistanceBetweenTwoPoints(point1, point2)).toEqual(5.131828552736544);
  });
});
