import '@emotion/react';
import { theme } from '~/components/GlobalStyles';

type MuiTheme = typeof theme;

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}
