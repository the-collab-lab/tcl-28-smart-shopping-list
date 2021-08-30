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
      },
    },
  },
});
