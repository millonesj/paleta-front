import React, { createContext, useState } from 'react';

export const SnackbarContext = createContext(false);

const SnackbarContextProvider = ({children}) => {

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <SnackbarContext.Provider value={{visible, setVisible, message, setMessage}}>
      {children}
    </SnackbarContext.Provider>
  )
}

export default SnackbarContextProvider;
