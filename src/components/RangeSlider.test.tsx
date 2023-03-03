import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import produce from 'immer';
import { it, vi } from 'vitest';
import { setSelectedRoute, setSmoothenedRoute } from '~/features/route';
import { setTreshold } from '~/features/treshold';
import { createStore } from '~/store';
import { TestProvider } from '~/test/utils';
import { testRoute } from './AddTestRoute';
import { RangeSlider } from './RangeSlider';

describe('<RangeSlider />', () => {
  it('dispatches correct action when changing range', async () => {
    const store = createStore();
    store.dispatch(setTreshold(50));
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const expected = [testRoute[1]!, testRoute[testRoute.length - 1]!];
      expect(dispatch).toHaveBeenCalledWith(setSmoothenedRoute(expected));
    });
  });
});
