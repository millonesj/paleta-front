import React from 'react';
import Router from './Router';
import Snackbar from './components/Snackbar';
import { SnackbarContextProvider } from './contexts/SnackbarContext';
import { ProyectContextProvider } from './contexts/ProyectContext';
import { UserContextProvider } from './contexts/UserContext';
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
        <UserContextProvider>
          <SnackbarContextProvider>
            <ProyectContextProvider>
              <Snackbar></Snackbar>
              <Router></Router>
            </ProyectContextProvider>
          </SnackbarContextProvider>
        </UserContextProvider>
      </ThemeProvider>
    </div>
  );
}
