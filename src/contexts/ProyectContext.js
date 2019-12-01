import React, { createContext, useState } from 'react';

const ProyectContext = createContext();

const ProyectContextProvider = ({ children }) => {
  const [currentProyect, setCurrentProyect] = useState({});
  return (
    <ProyectContext.Provider value={{ currentProyect, setCurrentProyect }}>
      {children}
    </ProyectContext.Provider>
  );
};

export { ProyectContext, ProyectContextProvider };
