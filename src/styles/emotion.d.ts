import '@emotion/react';
import type { DefaultTheme } from '@mui/system';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends DefaultTheme {}
}
