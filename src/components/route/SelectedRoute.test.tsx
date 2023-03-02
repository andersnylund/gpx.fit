import { render } from '@testing-library/react';
import { PolylineProps } from 'react-leaflet';
import { vi } from 'vitest';
import { setSelectedRoute, setSmoothenedRoute } from '~/features/route';
import { createStore } from '~/store';
import { TestProvider } from '~/test/utils';
import { SelectedRoute } from './SelectedRoute';

const mockPositionsCheck = vi.fn();
const mockColorCheck = vi.fn();

vi.mock('react-leaflet', () => ({
  Polyline: (props: PolylineProps) => {
    mockPositionsCheck(props.positions);
    mockColorCheck(props.color);

    return <></>;
  },
}));

describe('<SelectedRoute />', () => {
  it('renders', () => {
    const store = createStore();
    store.dispatch(setSelectedRoute([{ latitude: 20, longitude: 20 }]));
    store.dispatch(setSmoothenedRoute([{ latitude: 40, longitude: 40 }]));

    render(
      <TestProvider store={store}>
        <SelectedRoute />
      </TestProvider>
    );
    expect(mockPositionsCheck).toHaveBeenNthCalledWith(1, [{ lat: 20, lng: 20 }]);
    expect(mockPositionsCheck).toHaveBeenNthCalledWith(2, [{ lat: 40, lng: 40 }]);

    expect(mockColorCheck).toHaveBeenNthCalledWith(1, '#FA5255');
    expect(mockColorCheck).toHaveBeenNthCalledWith(2, '#2CA24D');
  });
});
