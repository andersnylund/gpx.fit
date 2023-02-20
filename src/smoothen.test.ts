import { describe, it } from 'vitest';
import { smoothen } from './smoothen';

describe('smoothen', () => {
  it('calculates the distance between two points', () => {
    expect(
      smoothen(
        [
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
        ],
        50
      )
    ).toEqual([
      {
        latitude: 63.106377,
        longitude: 21.59627,
      },
      {
        latitude: 63.106385,
        longitude: 21.59648,
      },
    ]);
  });
});
