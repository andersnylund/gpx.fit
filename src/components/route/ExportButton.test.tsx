import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StravaBuilder } from 'gpx-builder';
import produce from 'immer';
import { vi } from 'vitest';
import { setRoute, setSelectedRoute, setSmoothenedRoute } from '~/features/route';
import { smoothen } from '~/smoothen';
import { createStore } from '~/store';
import { TestProvider } from '~/test/utils';
import { testRoute } from '../AddTestRoute';
import { ExportButton } from './ExportButton';

const { Point } = StravaBuilder.MODELS;

const mockSetSegmentPoints = vi.fn();

vi.mock('gpx-builder', async () => ({
  StravaBuilder: class {
    public static MODELS = {
      Point: class {
        private lat: number;
        private lon: number;
        private ele?: number;
        private time?: Date;
        private heartRate?: number;
        public constructor(
          lat: number,
          lon: number,
          { ele, time, hr }: { ele?: number; time?: Date; hr?: number } = {}
        ) {
          this.lat = lat;
          this.lon = lon;
          this.ele = ele;
          this.time = time;
          this.heartRate = hr;
        }
      },
    };

    setSegmentPoints = mockSetSegmentPoints;
    toObject = vi.fn();
  },
  buildGPX: vi.fn(),
}));

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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('create a valid link for downloading the export', async () => {
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

    expect(mockSetSegmentPoints.mock.calls[0]?.[0]?.[0]).toEqual(
      new Point(60.2146386, 24.9142349, { ele: 29.6, time: new Date('2023-03-03T08:45:20.000Z'), hr: 111 })
    );
  });

  it('handles an undefined timestamp', async () => {
    const store = createStore();
    store.dispatch(
      setRoute(
        produce(testRoute, (draft) => {
          if (draft[0]) {
            draft[0].timestamp = undefined;
          }
        })
      )
    );
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

    expect(mockSetSegmentPoints.mock.calls[0]?.[0]?.[0]).toEqual(
      new Point(60.2146386, 24.9142349, { ele: 29.6, time: undefined, hr: 111 })
    );
  });
});
