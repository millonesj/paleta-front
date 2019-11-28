import React from "react";
import Router  from "./Router"
import Snackbar from "./components/Snackbar"
import SnackbarContext from './contexts/SnackbarContext'

export default function App() {

  return (
    <div>
      <SnackbarContext>
        <Snackbar></Snackbar>
        <Router></Router>
      </SnackbarContext>
    </div>
  );
}
