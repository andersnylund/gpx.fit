import { render, screen } from '@testing-library/react';
import { setRoute } from '~/features/route';
import { createStore } from '~/store';
import { TestProvider } from '~/test/utils';
import { TrackControls } from './TrackControls';

describe('<TrackControls />', () => {
  it('empty renders if no route', () => {
    const { container } = render(
      <TestProvider>
        <TrackControls />
      </TestProvider>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('empty renders if no route', () => {
    const store = createStore();
    store.dispatch(setRoute([{ latitude: 20, longitude: 20 }]));
    render(
      <TestProvider store={store}>
        <TrackControls />
      </TestProvider>
    );
    screen.getByLabelText('Track startpoint');
  });
});
