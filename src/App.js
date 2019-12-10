import React from 'react';
import Router from './Router';
import Snackbar from './components/Snackbar';
import { SnackbarContextProvider } from './hooks/SnackbarContext';
import { ProyectContextProvider } from './hooks/ProyectContext';
import { UserContextProvider } from './hooks/UserContext';
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
