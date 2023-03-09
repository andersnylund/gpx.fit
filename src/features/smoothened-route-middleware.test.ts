import { testRoute } from '~/components/AddTestRoute';
import { createStore } from '~/store';
import { setSelectedRoute } from './route';
import { setThreshold } from './threshold';

describe('smoothened route middleware', () => {
  it('works', () => {
    const store = createStore();
    store.dispatch(setSelectedRoute(testRoute));
    store.dispatch(setThreshold(10000));
    expect(store.getState().routes.smoothenedRoute).toEqual([
      {
        elevation: 29.6,
        latitude: 60.2146386,
        longitude: 24.9142349,
        timestamp: '2023-03-03T08:45:20.000Z',
      },
      {
        elevation: 29.6,
        latitude: 60.2159603,
        longitude: 24.9148571,
        timestamp: '2023-03-03T08:45:44.000Z',
      },
    ]);
  });
});
