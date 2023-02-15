import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it } from 'vitest';
import { store } from '~/store';
import { Route } from './Route';

describe('<Route />', () => {
  it('smoke test', () => {
    render(
      <Provider store={store}>
        <Route />
      </Provider>
    );
  });
});
