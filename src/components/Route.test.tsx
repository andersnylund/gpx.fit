import { render, screen } from '@testing-library/react';
import type { PolylineProps } from 'react-leaflet';
import { describe, it, vi } from 'vitest';
import { setRoute } from '~/features/route';
import { createStore } from '~/store';
import { TestProvider } from '~/test/utils';
import { Route } from './Route';

vi.mock('react-leaflet', () => ({
  Polyline: (positions: PolylineProps) => <div>{JSON.stringify(positions)}</div>,
}));

describe('<Route />', () => {
  it('renders a polyline', async () => {
    const store = createStore();
    store.dispatch(setRoute([{ latitude: 20, longitude: 20, elevation: 12, timestamp: '2016-11-17T16:37:49Z' }]));
    render(
      <TestProvider store={store}>
        <Route />
      </TestProvider>
    );
    expect(screen.getByText('{"positions":[{"lat":20,"lng":20}]}'));
  });

  it('renders nothing if no route found', () => {
    const { container } = render(
      <TestProvider>
        <Route />
      </TestProvider>
    );
    expect(container).toBeEmptyDOMElement();
  });
});
