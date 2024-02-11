import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { setRoute } from '~/features/route';
import { createStore } from '~/store';
import { TestProvider } from '~/test/utils';
import { AddTestRoute, testRoute } from './AddTestRoute';

describe('<AddTestRoute />', () => {
  it('dispatches a test route', async () => {
    const store = createStore();
    const dispatch = vi.spyOn(store, 'dispatch');
    render(
      <TestProvider store={store}>
        <AddTestRoute />
      </TestProvider>,
    );
    await userEvent.click(screen.getByText('Test'));
    expect(dispatch).toHaveBeenCalledWith(setRoute(testRoute));
  });
});
