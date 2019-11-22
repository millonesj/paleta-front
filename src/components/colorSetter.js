import "rc-color-picker/assets/index.css";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
//import ColorPicker from "rc-color-picker";
import { Panel as ColorPickerPanel } from "rc-color-picker";

const ColorSetter = props => {
  const [tbColor, setTbColor] = useState("#345679");
  const [btColor1, setBtColor1] = useState("grey");
  const [btColor2, setBtColor2] = useState("grey");
  function changeHandler(colorObj) {
    console.log(colorObj);
    setTbColor(colorObj.color);
  }
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Seleccionar color</h1>
      <Grid container>
        <Grid item xs={4}>
          <ColorPickerPanel
            enableAlpha={false}
            color={tbColor}
            onChange={changeHandler}
            mode='RGB'
          />
        </Grid>
        <Grid item xs={8}>
          <div>
            <h3>Colores seleccionados</h3>
            <p>App Toolbar</p>
            <button
              style={{ backgroundColor: btColor1 }}
              onClick={() => {
                setBtColor1(tbColor);
              }}
            >
              Background: {btColor1}
            </button>
            <button
              style={{ backgroundColor: btColor2 }}
              onClick={() => {
                setBtColor2(tbColor);
              }}
            >
              Title and menu: {btColor2}
            </button>
            <button
              onClick={() => {
                props.setToolbarColors({
                  backgroundColor: btColor1,
                  titleColor: btColor2,
                  menuColor: btColor2
                });
              }}
            >
              Aplicar Color
            </button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ColorSetter;
