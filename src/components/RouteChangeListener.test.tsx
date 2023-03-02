import { render, waitFor } from '@testing-library/react';
import { MapContainer } from 'react-leaflet';
import { vi } from 'vitest';
import { setRoute, setSelectedRoute } from '~/features/route';
import { createStore } from '~/store';
import { TestProvider } from '~/test/utils';
import { RouteChangeListener } from './RouteChangeListener';

const mockFitBounds = vi.fn();

vi.mock('react-leaflet', async () => ({
  ...(await vi.importActual<typeof import('react-leaflet')>('react-leaflet')),
  useMap: vi.fn(() => ({ fitBounds: mockFitBounds })),
}));

describe('<RouteChangeListener />', () => {
  it('focuses on selected route', async () => {
    const store = createStore();
    store.dispatch(
      setSelectedRoute([
        { latitude: 20, longitude: 20 },
        { latitude: 21, longitude: 21 },
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

  it('focuses on imported route', async () => {
    const store = createStore();
    store.dispatch(
      setRoute([
        { latitude: 20, longitude: 20 },
        { latitude: 21, longitude: 21 },
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
