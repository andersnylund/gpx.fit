import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { readFile } from 'fs/promises';
import { vi } from 'vitest';
import { setRoute } from '~/features/route';
import { createStore } from '~/store';
import { TestProvider } from '~/test/utils';
import { Dropzone } from './Dropzone';
import { setThreshold } from '~/features/threshold';

let testXmlString = '';

describe('<Dropzone />', () => {
  beforeAll(async () => {
    const xmlFile = await readFile('./src/test/test.xml', 'utf-8');
    testXmlString = xmlFile.toString();
    File.prototype.text = vi.fn(() => new Promise((resolve) => resolve(testXmlString)));
  });

  it('allows to upload a file', async () => {
    const store = createStore();
    store.dispatch(setThreshold(1));

    const dispatch = vi.spyOn(store, 'dispatch');

    render(
      <TestProvider store={store}>
        <Dropzone />
      </TestProvider>
    );

    const blob = new Blob([testXmlString], { type: 'text/xml' });
    const file = new File([blob], 'test.gpx');

    await userEvent.upload(screen.getByTestId('file-input'), file);

    expect(dispatch).toHaveBeenCalledWith(
      setRoute([
        {
          latitude: 60.2146386,
          longitude: 24.9142349,
          elevation: 29.6,
          timestamp: '2023-03-03T08:45:20.000Z',
          heartRate: 120,
        },
        {
          latitude: 60.2148491,
          longitude: 24.9143636,
          elevation: 29.6,
          timestamp: '2023-03-03T08:45:22.000Z',
          heartRate: 121,
        },
        {
          latitude: 60.2150543,
          longitude: 24.9144441,
          elevation: 29.6,
          timestamp: '2023-03-03T08:45:24.000Z',
          heartRate: 122,
        },
        {
          latitude: 60.2152302,
          longitude: 24.9145192,
          elevation: 29.6,
          timestamp: '2023-03-03T08:45:26.000Z',
          heartRate: 123,
        },
        {
          latitude: 60.2154194,
          longitude: 24.9145943,
          elevation: 29.6,
          timestamp: '2023-03-03T08:45:28.000Z',
          heartRate: 124,
        },
        {
          latitude: 60.2154354,
          longitude: 24.9144763,
          elevation: 29.6,
          timestamp: '2023-03-03T08:45:30.000Z',
          heartRate: 125,
        },
        {
          latitude: 60.2153901,
          longitude: 24.9145031,
          elevation: 29.6,
          timestamp: '2023-03-03T08:45:32.000Z',
          heartRate: 126,
        },
        {
          latitude: 60.2153687,
          longitude: 24.9146694,
          elevation: 29.6,
          timestamp: '2023-03-03T08:45:34.000Z',
          heartRate: 127,
        },
        {
          latitude: 60.21547,
          longitude: 24.9145353,
          elevation: 29.6,
          timestamp: '2023-03-03T08:45:36.000Z',
          heartRate: 128,
        },
        {
          latitude: 60.215454,
          longitude: 24.9146158,
          elevation: 29.6,
          timestamp: '2023-03-03T08:45:38.000Z',
          heartRate: 129,
        },
        {
          latitude: 60.2155979,
          longitude: 24.9146748,
          elevation: 29.6,
          timestamp: '2023-03-03T08:45:40.000Z',
          heartRate: 130,
        },
        {
          latitude: 60.2157871,
          longitude: 24.9147606,
          elevation: 29.6,
          timestamp: '2023-03-03T08:45:42.000Z',
          heartRate: 131,
        },
        {
          latitude: 60.2159603,
          longitude: 24.9148571,
          elevation: 29.6,
          timestamp: '2023-03-03T08:45:44.000Z',
          heartRate: 132,
        },
      ])
    );
  });
});
