import { render, screen } from '@testing-library/react';
import { TestProvider } from '~/test/utils';
import { Dropzone } from './Dropzone';
import userEvent from '@testing-library/user-event';
import { createStore } from '~/store';
import { vi } from 'vitest';
import { testXmlString } from '~/test/test-strings';
import { setRoute } from '~/features/route';

describe('<Dropzone />', () => {
  beforeAll(() => {
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
          latitude: 63.10822,
          longitude: 21.608385,
          elevation: 17.3,
          timestamp: '2016-11-17T16:47:51.000Z',
        },
        {
          latitude: 63.10827,
          longitude: 21.608235,
          elevation: 17.3,
          timestamp: '2016-11-17T16:47:53.000Z',
        },
        {
          latitude: 63.108333,
          longitude: 21.608047,
          elevation: 17.3,
          timestamp: '2016-11-17T16:47:56.000Z',
        },
      ])
    );
  });
});
