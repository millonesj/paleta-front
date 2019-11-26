import "rc-color-picker/assets/index.css";
import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import { Panel as ColorPickerPanel } from "rc-color-picker";
import ColorContext from "../colorContext/colorContext";

var colorList = [];
const BtnColor = props => {
  const [btnColor, setBtnColor] = useState("grey");
  return (
    <button
      style={{ backgroundColor: btnColor }}
      onClick={() => {
        colorList.push({
          compId: props.compId,
          elementName: props.elementName,
          color: props.pickedColor
        });
        setBtnColor(props.pickedColor);
        console.log(colorList);
      }}
    >
      {props.elementName}: {btnColor}
    </button>
  );
};
const ColorSetter = () => {
  const { setColor } = useContext(ColorContext);
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
                setColor(colorList);
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
