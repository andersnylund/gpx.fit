import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { setSelectedRoute, setSmoothenedRoute } from '~/features/route';
import { setTreshold } from '~/features/treshold';
import { createStore } from '~/store';
import { TestProvider } from '~/test/utils';
import { Treshold } from './Treshold';

describe('<Treshold />', () => {
  it('render', async () => {
    const store = createStore();
    const dispatch = vi.spyOn(store, 'dispatch');
    store.dispatch(setSelectedRoute([{ latitude: 20, longitude: 20 }]));
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
      expect(dispatch).toHaveBeenNthCalledWith(2, setSmoothenedRoute([{ latitude: 20, longitude: 20 }]));
    });
  });
});