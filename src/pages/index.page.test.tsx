import { render, screen } from '@testing-library/react';
import { TestProvider } from '~/test/utils';
import IndexPage from './index.page';

describe('<Index />', () => {
  it('renders all the components', () => {
    render(
      <TestProvider>
        <IndexPage />
      </TestProvider>
    );

    screen.getByRole('link', { name: 'Leaflet' });
    screen.getByRole('button', { name: 'Add gpx file' });
    screen.getByRole('button', { name: 'Test' });
  });
});
