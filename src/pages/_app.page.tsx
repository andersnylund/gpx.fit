import { ThemeProvider } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import type { AppProps } from 'next/app';
import 'normalize.css';
import { Provider } from 'react-redux';
import { GlobalStyles, theme } from '~/components/GlobalStyles';
import { store } from '~/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
