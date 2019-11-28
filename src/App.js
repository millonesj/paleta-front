import React from "react";
import Router from "./Router";
import Snackbar from "./components/Snackbar";
import { SnackbarContextProvider } from "./contexts/SnackbarContext";

export default function App() {
  return (
    <div>
      <SnackbarContextProvider>
        <Snackbar></Snackbar>
        <Router></Router>
      </SnackbarContextProvider>
    </div>
  );
}
