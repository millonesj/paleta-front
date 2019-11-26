import React, { useState } from "react";
import ColorContext from "./colorContext";

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState([
    {
      color: "blue",
      compId: "toolBar",
      elementName: "background"
    },
    {
      color: "white",
      compId: "toolBar",
      elementName: "title and menu"
    },
    {
      color: "grey",
      compId: "paletteList",
      elementName: "background"
    },
    {
      color: "white",
      compId: "paletteList",
      elementName: "title"
    },
    {
      color: "white",
      compId: "paletteList",
      elementName: "paletteTitleTxt"
    },
    {
      color: "blue",
      compId: "paletteList",
      elementName: "paletteTitleBg"
    },
    {
      color: "white",
      compId: "paletteList",
      elementName: "paletteSubTitleTxt"
    },
    {
      color: "grey",
      compId: "paletteList",
      elementName: "paletteSubTitleBg"
    }
  ]);
  return (
    <ColorContext.Provider
      value={{
        color,
        setColor
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export default ColorProvider;
