import { createTheme } from '@material-ui/core';
import Asap from '../fonts/asap.regular.ttf';

export const theme = createTheme({
  palette: {
    text: {
      primary: '#000000',
    },
    primary: {
      main: '#98D79A',
    },
    secondary: {
      main: '#FFA770',
    },
    background: {
      default: '#C8E7F7',
    },
  },
  typography: {
    fontFamily: 'Asap, sans-serif',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontSize: 16,
    fontWeight: 400,
    src: `
    local('Asap'),
    local('Asap-Regular'),
    url(${Asap}) format('ttf')
  `,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [Asap],
      },
    },
    MuiButton: {
      root: {
        borderRadius: '25px',
        margin: '8px',
      },
    },
  },
});

theme.typography.h2 = {
  fontSize: '2.3rem',
  '@media (min-width:600px)': {
    fontSize: '3rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '4rem',
  },
};
