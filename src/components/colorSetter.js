import "rc-color-picker/assets/index.css";
import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { Panel as ColorPickerPanel } from "rc-color-picker";
import ColorContext from "../colorContext/colorContext";

var colorList = [
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
];
const BtnColor = props => {
  const [btnColor, setBtnColor] = useState("grey");
  let index = 0;
  return (
    <button
      style={{ backgroundColor: btnColor }}
      onClick={() => {
        index = colorList.findIndex(c => {
          return (
            c.compId === props.compId && c.elementName === props.elementName
          );
        });
        colorList[index] = {
          compId: props.compId,
          elementName: props.elementName,
          color: props.pickedColor
        };
        setBtnColor(props.pickedColor);
      }}
    >
      {props.elementName}: {btnColor}
    </button>
  );
};
const ColorSetter = () => {
  const { setColorBy } = useContext(ColorContext);
  const [pickedColor, setPickedColor] = useState("#345679");
  function changeHandler(colorObj) {
    setPickedColor(colorObj.color);
  }
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Seleccionar color</h1>
      <Grid container>
        <Grid item xs={4}>
          <ColorPickerPanel
            enableAlpha={false}
            color={pickedColor}
            onChange={changeHandler}
            mode='RGB'
          />
        </Grid>
        <Grid item xs={8}>
          <div>
            <h3>Colores seleccionados</h3>
            <p>App Toolbar</p>
            {BtnColor({
              pickedColor: pickedColor,
              compId: "toolBar",
              elementName: "background"
            })}
            {BtnColor({
              pickedColor: pickedColor,
              compId: "toolBar",
              elementName: "title and menu"
            })}
            <p>Lista de paletas</p>
            {BtnColor({
              pickedColor: pickedColor,
              compId: "paletteList",
              elementName: "background"
            })}
            {BtnColor({
              pickedColor: pickedColor,
              compId: "paletteList",
              elementName: "title"
            })}
            {BtnColor({
              pickedColor: pickedColor,
              compId: "paletteList",
              elementName: "paletteTitleTxt"
            })}
            {BtnColor({
              pickedColor: pickedColor,
              compId: "paletteList",
              elementName: "paletteTitleBg"
            })}
            {BtnColor({
              pickedColor: pickedColor,
              compId: "paletteList",
              elementName: "paletteSubTitleTxt"
            })}
            {BtnColor({
              pickedColor: pickedColor,
              compId: "paletteList",
              elementName: "paletteSubTitleBg"
            })}
            <br />
            <br />
            <button
              onClick={() => {
                console.log("Aplicando colores");
                setColorBy(colorList);
              }}
            >
              Aplicar Colores
            </button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ColorSetter;
