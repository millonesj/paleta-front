import React, { createContext, useState } from 'react';

const SnackbarContext = createContext();

const SnackbarContextProvider = ({ children }) => {
  const [snackMessage, setSnackMessage] = useState('');

  return (
    <SnackbarContext.Provider value={{ snackMessage, setSnackMessage }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export { SnackbarContext, SnackbarContextProvider };
