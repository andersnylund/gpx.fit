import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { TestProvider } from '~/test/utils';
import Index from './index.page';

vi.mock('gpxparser');

describe('index page', () => {
  it('renders', async () => {
    render(
      <TestProvider>
        <Index />
      </TestProvider>
    );

    await waitFor(() => {
      screen.getByText('Test');
    });
  });
});
