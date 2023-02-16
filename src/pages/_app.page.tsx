import 'leaflet/dist/leaflet.css';
import type { AppProps } from 'next/app';
import 'normalize.css';
import { Provider } from 'react-redux';
import { GlobalStyles } from '~/components/GlobalStyles';
import { store } from '~/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
