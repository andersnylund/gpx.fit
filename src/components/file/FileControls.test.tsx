import { render } from '@testing-library/react';
import { describe, it } from 'vitest';
import { TestProvider } from '~/test/utils';
import { FileControls } from './FileControls';

describe('<FileControls />', () => {
  it('renders', async () => {
    render(
      <TestProvider>
        <FileControls />
      </TestProvider>
    );
  });
});
