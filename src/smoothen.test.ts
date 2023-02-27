import { describe, it } from 'vitest';
import { smoothen } from './smoothen';

describe('smoothen', () => {
  it('it picks out all points if treshold small enough', () => {
    const testRoute = [
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
    ];

    const result = smoothen(testRoute, 1);

    expect(result).toEqual(testRoute);
  });

  it('always returns first and last point of route', () => {
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
        ],
        5000
      )
    ).toEqual([
      {
        latitude: 63.106377,
        longitude: 21.59627,
      },
      {
        latitude: 63.106379,
        longitude: 21.596372,
      },
    ]);
  });

  it('works skips route point if treshold is big', () => {
    expect(
      smoothen(
        [
          {
            latitude: 63.10852,
            longitude: 21.60761,
          },
          {
            latitude: 63.108567,
            longitude: 21.60749,
          },
          {
            latitude: 63.10861,
            longitude: 21.607355,
          },
        ],
        5000
      )
    ).toEqual([
      {
        latitude: 63.10852,
        longitude: 21.60761,
      },
      {
        latitude: 63.10861,
        longitude: 21.607355,
      },
    ]);
  });

  it('works with empty route', () => {
    expect(smoothen([], 1)).toEqual([]);
  });
});
