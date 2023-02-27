import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import produce from 'immer';
import { it, vi } from 'vitest';
import { setSelectedRoute } from '~/features/route';
import { createStore } from '~/store';
import { TestProvider } from '~/test/utils';
import { RangeSlider } from './RangeSlider';

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

describe('<RangeSlider />', () => {
  it('dispatches correct action when changing range', async () => {
    const store = createStore();
    const dispatch = vi.spyOn(store, 'dispatch');
    render(
      <TestProvider store={store}>
        <RangeSlider route={testRoute} />
      </TestProvider>
    );

    const startPointSlider = screen.getByRole('slider', { name: 'Track startpoint' });
    act(() => {
      fireEvent.change(startPointSlider, { target: { value: '1' } });
    });
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(
        setSelectedRoute(
          produce(testRoute, (draftRoute) => {
            draftRoute.shift();
          })
        )
      );
    });
  });
});
