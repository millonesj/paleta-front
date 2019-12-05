import React, { useState } from 'react';

const ColorContext = React.createContext({});

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState([
    {
      color: '#155fa0',
      compId: 'toolBar',
      elementName: 'background'
    },
    {
      color: 'white',
      compId: 'toolBar',
      elementName: 'title and menu'
    },
    {
      color: '#b2102f',
      compId: 'paletteList',
      elementName: 'background'
    },
    {
      color: 'white',
      compId: 'paletteList',
      elementName: 'title'
    },
    {
      color: 'white',
      compId: 'paletteList',
      elementName: 'paletteTitleTxt'
    },
    {
      color: '#ff4569',
      compId: 'paletteList',
      elementName: 'paletteTitleBg'
    },
    {
      color: 'white',
      compId: 'paletteList',
      elementName: 'paletteSubTitleTxt'
    },
    {
      color: '#546e7a',
      compId: 'paletteList',
      elementName: 'paletteSubTitleBg'
    }
  ]);
  const setColorBy = color => {
    setColor(state => {
      return state.map((colorBefore, index) => {
        return {
          ...colorBefore,
          color: color[index].color
        };
      });
    });
  };
  return (
    <ColorContext.Provider
      value={{
        color,
        setColorBy
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export { ColorContext, ColorProvider };
