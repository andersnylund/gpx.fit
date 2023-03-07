import { render, waitFor } from '@testing-library/react';
import { MapContainer } from 'react-leaflet';
import { vi } from 'vitest';
import { setRoute } from '~/features/route';
import { createStore } from '~/store';
import { TestProvider } from '~/test/utils';
import { RouteChangeListener } from './RouteChangeListener';

const mockFitBounds = vi.fn();

vi.mock('react-leaflet', async () => ({
  ...(await vi.importActual<typeof import('react-leaflet')>('react-leaflet')),
  useMap: vi.fn(() => ({ fitBounds: mockFitBounds })),
}));

describe('<RouteChangeListener />', () => {
  it('focuses on imported route', async () => {
    const store = createStore();
    store.dispatch(
      setRoute([
        { latitude: 20, longitude: 20, elevation: 12, timestamp: '2016-11-17T16:37:49Z' },
        { latitude: 21, longitude: 21, elevation: 13, timestamp: '2016-11-17T16:37:50Z' },
      ])
    );

    render(
      <TestProvider store={store}>
        <MapContainer>
          <RouteChangeListener />
        </MapContainer>
      </TestProvider>
    );

    await waitFor(() => {
      expect(mockFitBounds).toHaveBeenCalledWith({
        _northEast: {
          lat: 21,
          lng: 21,
        },
        _southWest: {
          lat: 20,
          lng: 20,
        },
      });
    });
  });
});
