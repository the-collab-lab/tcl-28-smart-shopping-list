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
    h1: {
      fontSize: '2rem',
      fontWeight: '700',
      '@media (min-width:600px)': {
        fontSize: '3.5rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: '700',
      lineHeight: '5rem',
      '@media (min-width:600px)': {
        fontSize: '4rem',
      },
    },
    h3: {
      cursor: 'pointer',
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '4rem',
      },
    },
    h4: {
      fontSize: '1.4rem',
      margin: '15px 20px',
      backgroundColor: '#FFA770',
      borderRadius: '5px',
      textAlign: 'center',
      padding: '15px',
      boxShadow: '0 1px 8px rgba(0, 0, 0, 0.2)',
      '@media (min-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h5: {
      fontSize: '1.5rem',
      margin: 20,
    },
    h6: {
      fontSize: '1.2rem',
      margin: '0 20px 20px',
      textAlign: 'center',
      '@media (min-width:600px)': {
        fontSize: '2.2rem',
        maxWidth: '70%',
      },
    },
    subtitle1: {
      marginTop: 20,
    },
    subtitle2: {
      fontSize: '1.2rem',
      marginBottom: 20,
      marginTop: 20,
    },
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
        margin: '20px',
      },
    },
  },
});
