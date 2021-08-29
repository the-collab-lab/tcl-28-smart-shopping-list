import { createTheme } from '@material-ui/core';
import Asap from '../fonts/asap.regular.ttf';

export const theme = createTheme({
  palette: {
    primary: { main: '#98D79A', active: '#98D79A' },
    active: { main: '#98D79A' },
    background: { main: '#C8E7F7', active: '#C8E7F7' },
    text: { main: '#000000' },
    soon: { main: '#CAFFBF' },
    'kind-of-soon': { main: '#FFD6A5', active: '#000000' },
    'not-soon': { main: '#FFADAD' },
    delete: { main: '#FFA770' },
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
  },
});
