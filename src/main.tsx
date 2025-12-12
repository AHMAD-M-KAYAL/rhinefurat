import React, { useMemo, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import './i18n';
import App from './App';
import { buildTheme } from './theme';
import './styles.css';
import { ColorModeContext } from './ColorModeContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RootWithTheme />
  </React.StrictMode>
);

function RootWithTheme() {
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('rf-color-mode');
    return stored === 'dark' ? 'dark' : 'light';
  });

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => {
          const next = prev === 'light' ? 'dark' : 'light';
          localStorage.setItem('rf-color-mode', next);
          return next;
        });
      }
    }),
    [mode]
  );

  const theme = useMemo(() => buildTheme(mode), [mode]);

  useEffect(() => {
    // Expose mode to CSS for custom styling
    document.documentElement.setAttribute('data-color-mode', mode);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
