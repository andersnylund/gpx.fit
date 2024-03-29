import { css, Global } from '@emotion/react';

const globalStyle = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: Public Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
      Droid Sans, Helvetica Neue, sans-serif;
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
