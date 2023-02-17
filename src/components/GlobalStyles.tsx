import { css, Global } from '@emotion/react';
import { blueGrey, deepOrange } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const globalStyle = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
      Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

export const GlobalStyles = () => (
  <Global
    styles={css`
      ${globalStyle}
    `}
  />
);

export const theme = createTheme({
  palette: {
    primary: {
      main: deepOrange[500],
    },
    secondary: {
      main: blueGrey[500],
    },
  },
});
