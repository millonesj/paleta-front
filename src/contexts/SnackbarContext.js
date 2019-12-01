import React, { createContext, useState } from 'react';

const SnackbarContext = createContext();

const SnackbarContextProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <SnackbarContext.Provider
      value={{ visible, setVisible, message, setMessage }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export { SnackbarContext, SnackbarContextProvider };
