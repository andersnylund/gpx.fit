import { render, screen } from '@testing-library/react';
import { Router } from 'next/router';
import App from './_app.page';

const TestComponent = () => <>Hello</>;

describe('<App />', () => {
  it('applies global styles', () => {
    render(<App Component={TestComponent} pageProps={{}} router={{} as Router} />);
    screen.getByText('Hello');
  });
});
