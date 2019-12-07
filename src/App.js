import React from 'react';
import Router from './Router';
import Snackbar from './components/Snackbar';
import { SnackbarContextProvider } from './contexts/SnackbarContext';
import { ProyectContextProvider } from './contexts/ProyectContext';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#e91e63' },
    secondary: { main: '#cddc39' }
  }
});

export default function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <SnackbarContextProvider>
          <ProyectContextProvider>
            <Snackbar></Snackbar>
            <Router></Router>
          </ProyectContextProvider>
        </SnackbarContextProvider>
      </ThemeProvider>
    </div>
  );
}
