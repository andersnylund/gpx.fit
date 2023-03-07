import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import produce from 'immer';
import { vi } from 'vitest';
import { setRoute, setSelectedRoute, setSmoothenedRoute } from '~/features/route';
import { smoothen } from '~/smoothen';
import { createStore } from '~/store';
import { TestProvider } from '~/test/utils';
import { testRoute } from '../AddTestRoute';
import { ExportButton } from './ExportButton';

describe('<ExportButton />', () => {
  beforeAll(() => {
    Object.defineProperty(console, 'error', {
      writable: true,
      value: vi.fn((args) => {
        if (!(typeof args === 'string' && args.includes('Not implemented'))) {
          // eslint-disable-next-line no-console
          console.warn(args);
        }
      }),
    });

    Object.defineProperty(URL, 'createObjectURL', {
      writable: true,
      value: vi.fn(() => 'objectURL'),
    });

    Object.defineProperty(URL, 'revokeObjectURL', {
      writable: true,
      value: vi.fn(),
    });
  });

  it('renders', async () => {
    const store = createStore();
    store.dispatch(setRoute(testRoute));
    store.dispatch(
      setSelectedRoute(
        produce(testRoute, (draftRoute) => {
          draftRoute.slice(3);
        })
      )
    );
    store.dispatch(
      setSmoothenedRoute(
        produce(testRoute, (draftRoute) => {
          smoothen(draftRoute.slice(3), 100);
        })
      )
    );

    render(
      <TestProvider store={store}>
        <ExportButton />
      </TestProvider>
    );

    await userEvent.click(screen.getByText('Export'));

    expect(URL.createObjectURL).toHaveBeenCalledWith(new File([], 'smoothened.gpx'));
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('http://localhost:3000/objectURL');
  });
});
