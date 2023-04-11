import { render } from '@testing-library/react';
import { MapContainer } from 'react-leaflet';
import { vi } from 'vitest';
import { setRoute } from '~/features/route';
import { createStore } from '~/store';
import { TestProvider } from '~/test/utils';
import { UserLocation } from './UserLocation';

const mockedFlyTo = vi.fn();

vi.mock('react-leaflet', async () => ({
  ...(await vi.importActual<typeof import('react-leaflet')>('react-leaflet')),
  useMap: () => ({
    flyTo: mockedFlyTo,
  }),
}));

describe('UserLocation', () => {
  beforeEach(() => {
    vi.resetAllMocks();

    Object.defineProperty(window.navigator, 'geolocation', {
      value: {
        getCurrentPosition: (callback: (position: GeolocationPosition) => void) => {
          callback({
            coords: {
              accuracy: 0,
              altitude: 0,
              altitudeAccuracy: 0,
              heading: 0,
              latitude: 12,
              longitude: 11,
              speed: 0,
            },
            timestamp: 0,
          });
        },
      },
      writable: true,
    });
  });

  it('calls flyTo with right parameters', () => {
    render(
      <TestProvider>
        <MapContainer center={[64, 21]} zoom={13} scrollWheelZoom={false} style={{ height: '100vh' }}>
          <UserLocation />
        </MapContainer>
      </TestProvider>
    );
    expect(mockedFlyTo).toHaveBeenCalledWith([12, 11], 13);
  });

  it('does not call flyTo if route is selected', () => {
    const store = createStore();
    store.dispatch(
      setRoute([
        {
          latitude: 12,
          longitude: 11,
          timestamp: '2021-01-01T00:00:00.000Z',
          elevation: 0,
          heartRate: 0,
        },
      ])
    );
    render(
      <TestProvider store={store}>
        <MapContainer center={[64, 21]} zoom={13} scrollWheelZoom={false} style={{ height: '100vh' }}>
          <UserLocation />
        </MapContainer>
      </TestProvider>
    );
    expect(mockedFlyTo).not.toHaveBeenCalled();
  });

  it('does not call flyTo if navigator not found', () => {
    Object.defineProperty(window.navigator, 'geolocation', {
      value: undefined,
      writable: true,
    });
    render(
      <TestProvider>
        <MapContainer center={[64, 21]} zoom={13} scrollWheelZoom={false} style={{ height: '100vh' }}>
          <UserLocation />
        </MapContainer>
      </TestProvider>
    );
    expect(mockedFlyTo).not.toHaveBeenCalled();
  });
});
