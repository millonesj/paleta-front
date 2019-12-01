import React, { createContext, useState } from 'react';

const ProyectContext = createContext();

const ProyectContextProvider = ({ children }) => {
  const [currentProyect, setCurrentProyect] = useState({});
  const setCurrentProyectBy = proyect => {
    setCurrentProyect(state => {
      return {
        ...state,
        _id: proyect._id,
        __v: proyect.__v,
        name: proyect.name,
        private: proyect.private,
        owner: proyect.owner
      };
    });
  };
  return (
    <ProyectContext.Provider value={{ currentProyect, setCurrentProyectBy }}>
      {children}
    </ProyectContext.Provider>
  );
};

export { ProyectContext, ProyectContextProvider };
