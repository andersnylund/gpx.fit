import { describe, it } from 'vitest';
import { testRoute } from './components/AddTestRoute';
import { smoothen } from './smoothen';

describe('smoothen', () => {
  it('it picks out all points if threshold small enough', () => {
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
            elevation: 27.2,
            timestamp: '2016-11-17T16:37:35Z',
          },
          {
            latitude: 63.106379,
            longitude: 21.596372,
            elevation: 27,
            timestamp: '2016-11-17T16:37:48Z',
          },
        ],
        5000
      )
    ).toEqual([
      {
        latitude: 63.106377,
        longitude: 21.59627,
        elevation: 27.2,
        timestamp: '2016-11-17T16:37:35Z',
      },
      {
        latitude: 63.106379,
        longitude: 21.596372,
        elevation: 27,
        timestamp: '2016-11-17T16:37:48Z',
      },
    ]);
  });

  it('skips route point if threshold is big', () => {
    expect(
      smoothen(
        [
          {
            latitude: 63.10852,
            longitude: 21.60761,
            elevation: 27.2,
            timestamp: '2016-11-17T16:37:35Z',
          },
          {
            latitude: 63.108567,
            longitude: 21.60749,
            elevation: 27.0,
            timestamp: '2016-11-17T16:37:48Z',
          },
          {
            latitude: 63.10861,
            longitude: 21.607355,
            elevation: 26.8,
            timestamp: '2016-11-17T16:37:49Z',
          },
        ],
        5000
      )
    ).toEqual([
      {
        latitude: 63.10852,
        longitude: 21.60761,
        elevation: 27.2,
        timestamp: '2016-11-17T16:37:35Z',
      },
      {
        latitude: 63.10861,
        longitude: 21.607355,
        elevation: 26.8,
        timestamp: '2016-11-17T16:37:49Z',
      },
    ]);
  });

  it('works with empty route', () => {
    expect(smoothen([], 1)).toEqual([]);
  });
});
