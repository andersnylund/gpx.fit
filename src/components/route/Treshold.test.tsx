import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { setSelectedRoute } from '~/features/route';
import { setTreshold } from '~/features/treshold';
import { createStore } from '~/store';
import { TestProvider } from '~/test/utils';
import { Treshold } from './Treshold';

describe('<Treshold />', () => {
  it('render', async () => {
    const store = createStore();
    const dispatch = vi.spyOn(store, 'dispatch');
    store.dispatch(
      setSelectedRoute([{ latitude: 20, longitude: 20, elevation: 12, timestamp: '2016-11-17T16:37:49Z' }])
    );
    dispatch.mockClear();

    render(
      <TestProvider store={store}>
        <Treshold />
      </TestProvider>
    );

    const spinbutton = screen.getByRole('spinbutton');
    expect(spinbutton).toHaveValue(10);

    await userEvent.type(spinbutton, '{backspace}');
    await userEvent.type(spinbutton, '2');

    expect(spinbutton).toHaveValue(12);

    await waitFor(() => {
      expect(dispatch).toHaveBeenNthCalledWith(1, setTreshold(12));
    });

    expect(store.getState().routes.smoothenedRoute).toEqual([
      { latitude: 20, longitude: 20, elevation: 12, timestamp: '2016-11-17T16:37:49Z' },
    ]);
  });
});
