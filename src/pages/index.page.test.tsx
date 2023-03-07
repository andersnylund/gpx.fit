import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Map } from '~/components/Map';
import { TestProvider } from '~/test/utils';
import IndexPage from './index.page';

vi.mock('next/dynamic', () => ({
  default: vi.fn(() => Map),
}));

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
