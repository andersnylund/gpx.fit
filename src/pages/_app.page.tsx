import '@fontsource/public-sans';
import { CssVarsProvider } from '@mui/joy';
import 'leaflet/dist/leaflet.css';
import type { AppProps } from 'next/app';
import 'normalize.css';
import { Provider } from 'react-redux';
import { GlobalStyles } from '~/components/GlobalStyles';
import { store } from '~/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider>
      <GlobalStyles />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </CssVarsProvider>
  );
}

export default MyApp;
