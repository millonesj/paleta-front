import React from "react";
import Router from "./Router";
import Snackbar from "./components/Snackbar";
import { SnackbarContextProvider } from "./contexts/SnackbarContext";
import { ProyectContextProvider } from "./contexts/ProyectContext";

export default function App() {
  return (
    <div>
      <SnackbarContextProvider>
        <ProyectContextProvider>
        <Snackbar></Snackbar>
        <Router></Router>
        </ProyectContextProvider>
      </SnackbarContextProvider>
    </div>
  );
}
