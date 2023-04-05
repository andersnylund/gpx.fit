import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { readFile } from 'fs/promises';
import { vi } from 'vitest';
import { setRoute } from '~/features/route';
import { createStore } from '~/store';
import { TestProvider } from '~/test/utils';
import { Dropzone } from './Dropzone';

let testXmlString = '';

describe('<Dropzone />', () => {
  beforeAll(async () => {
    const xmlFile = await readFile('./src/test/test.xml', 'utf-8');
    testXmlString = xmlFile.toString();
    File.prototype.text = vi.fn(() => new Promise((resolve) => resolve(testXmlString)));
  });

  it('allows to upload a file', async () => {
    const store = createStore();
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
          elevation: 201.004253,
          latitude: 63.11371,
          longitude: 18.38392,
          timestamp: '2023-03-01T19:31:38.857Z',
        },
        {
          elevation: 201.004253,
          latitude: 63.113746,
          longitude: 18.384052,
          timestamp: '2023-03-01T19:31:42.304Z',
        },
        {
          elevation: 201.758825,
          latitude: 63.1145,
          longitude: 18.386311,
          timestamp: '2023-03-01T19:32:46.508Z',
        },
        {
          elevation: 201.941812,
          latitude: 63.114544,
          longitude: 18.386526,
          timestamp: '2023-03-01T19:32:51.995Z',
        },
        {
          elevation: 202.22021,
          latitude: 63.114576,
          longitude: 18.386878,
          timestamp: '2023-03-01T19:33:00.255Z',
        },
        {
          elevation: 202.687228,
          latitude: 63.114635,
          longitude: 18.387466,
          timestamp: '2023-03-01T19:33:14.390Z',
        },
        {
          elevation: 203.166495,
          latitude: 63.114771,
          longitude: 18.388006,
          timestamp: '2023-03-01T19:33:28.789Z',
        },
        {
          elevation: 201.004253,
          latitude: 63.11372,
          longitude: 18.38393,
          timestamp: '2023-03-01T19:34:38.857Z',
        },
        {
          elevation: 201.004253,
          latitude: 63.11372,
          longitude: 18.38393,
          timestamp: '2023-03-01T19:34:38.857Z',
        },
      ])
    );
  });
});
