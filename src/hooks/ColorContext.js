import React, { useState } from 'react';

const ColorContext = React.createContext({});

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState([
    {
      color: '#2196f3',
      compId: 'toolBar',
      elementName: 'background'
    },
    {
      color: '#FFFFFF',
      compId: 'toolBar',
      elementName: 'title and menu'
    },
    {
      color: '#AAAAAA',
      compId: 'paletteList',
      elementName: 'background'
    },
    {
      color: '#FFFFFF',
      compId: 'paletteList',
      elementName: 'title'
    },
    {
      color: '#FFFFFF',
      compId: 'paletteList',
      elementName: 'paletteTitleTxt'
    },
    {
      color: '#2196f3',
      compId: 'paletteList',
      elementName: 'paletteTitleBg'
    },
    {
      color: '#FFFFFF',
      compId: 'paletteList',
      elementName: 'paletteSubTitleTxt'
    },
    {
      color: '#AAAAAA',
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
