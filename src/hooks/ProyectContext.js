import React, { createContext, useState } from 'react';

const ProyectContext = createContext();

const ProyectContextProvider = ({ children }) => {
  const [currentProyect, setCurrentProyect] = useState({
    _id: '',
    name: '',
    private: '',
    owner: '',
    palettes: []
  });
  const setCurrentProyectBy = proyect => {
    setCurrentProyect(state => {
      return {
        ...state,
        _id: proyect._id,
        __v: proyect.__v,
        name: proyect.name,
        private: proyect.private,
        owner: proyect.owner,
        palettes: proyect.palettes
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
