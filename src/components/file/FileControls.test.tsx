import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { browserEnv } from '~/config/browser-env';
import { TestProvider } from '~/test/utils';
import { FileControls } from './FileControls';

describe('<FileControls />', () => {
  beforeEach(() => {
    Object.defineProperty(browserEnv, 'NEXT_PUBLIC_SITE_ENV', { value: 'test' });
  });

  it('renders adding test route if site env is test', async () => {
    render(
      <TestProvider>
        <FileControls />
      </TestProvider>
    );
    screen.getByText('Test');
  });

  it('does not render test route if site env is production', async () => {
    Object.defineProperty(browserEnv, 'NEXT_PUBLIC_SITE_ENV', { value: 'production' });

    render(
      <TestProvider>
        <FileControls />
      </TestProvider>
    );
    expect(screen.queryByText('Test')).not.toBeInTheDocument();
  });
});
