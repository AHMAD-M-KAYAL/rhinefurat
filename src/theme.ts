import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const buildTheme = (mode: 'light' | 'dark') => {
  const base = createTheme({
    palette: {
      mode,
      primary: {
        main: '#1D3557'
      },
      secondary: {
        main: '#457B9D'
      },
      background: {
        default: mode === 'light' ? '#F1FAEE' : '#0B1320',
        paper: mode === 'light' ? '#FFFFFF' : '#121a2b'
      }
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '3rem'
      },
      h2: {
        fontWeight: 600,
        fontSize: '2.25rem'
      },
      h5: {
        fontSize: '1.25rem'
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6
      }
    }
  });
  return responsiveFontSizes(base);
};
