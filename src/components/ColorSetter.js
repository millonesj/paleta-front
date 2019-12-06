import 'rc-color-picker/assets/index.css';
import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import { Panel as ColorPickerPanel } from 'rc-color-picker';
import { ColorContext } from '../contexts/colorContext';
import ColorPicker from 'rc-color-picker';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

var colorList = [
  {
    color: 'blue',
    compId: 'toolBar',
    elementName: 'background'
  },
  {
    color: 'white',
    compId: 'toolBar',
    elementName: 'title and menu'
  },
  {
    color: 'grey',
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
    color: 'blue',
    compId: 'paletteList',
    elementName: 'paletteTitleBg'
  },
  {
    color: 'white',
    compId: 'paletteList',
    elementName: 'paletteSubTitleTxt'
  },
  {
    color: 'grey',
    compId: 'paletteList',
    elementName: 'paletteSubTitleBg'
  }
];
const BtnColor = props => {
  const { setColorBy } = useContext(ColorContext);
  const [btnColor, setBtnColor] = useState('grey');
  const [textColor, setTextColor] = useState('black');
  let index = 0;
  return (
    <Button
      style={{ backgroundColor: btnColor, margin: '4px', color: textColor }}
      size="small"
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
        if (
          parseInt(props.pickedColor.toString().substring(1, 3), 16) > 128 ||
          parseInt(props.pickedColor.toString().substring(3, 5), 16) > 128 ||
          parseInt(props.pickedColor.toString().substring(5, 7), 16) > 128
        ) {
          setTextColor('black');
        } else {
          setTextColor('white');
        }
        setColorBy(colorList);
      }}
    >
      {props.elementName}: {btnColor}
    </Button>
  );
};
const ColorSetter = () => {
  const { setColorBy } = useContext(ColorContext);
  const [pickedColor, setPickedColor] = useState('#345679');
  function changeHandler(colorObj) {
    setPickedColor(colorObj.color);
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Seleccionar color</h2>
      <Grid container>
        <Grid item xs={12} lg={4}>
          <Box display={{ xs: 'none', lg: 'block' }}>
            <ColorPickerPanel
              enableAlpha={false}
              color={pickedColor}
              onChange={changeHandler}
              mode="RGB"
            />
          </Box>
          <Box display={{ xs: 'block', lg: 'none' }}>
            <ColorPicker
              animation="slide-up"
              color={pickedColor}
              onChange={changeHandler}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={8}>
          <div>
            <p>App Toolbar</p>
            {BtnColor({
              pickedColor: pickedColor,
              compId: 'toolBar',
              elementName: 'background'
            })}
            {BtnColor({
              pickedColor: pickedColor,
              compId: 'toolBar',
              elementName: 'title and menu'
            })}
            <p>Lista de paletas</p>
            {BtnColor({
              pickedColor: pickedColor,
              compId: 'paletteList',
              elementName: 'background'
            })}
            {BtnColor({
              pickedColor: pickedColor,
              compId: 'paletteList',
              elementName: 'title'
            })}
            {BtnColor({
              pickedColor: pickedColor,
              compId: 'paletteList',
              elementName: 'paletteTitleTxt'
            })}
            {BtnColor({
              pickedColor: pickedColor,
              compId: 'paletteList',
              elementName: 'paletteTitleBg'
            })}
            {BtnColor({
              pickedColor: pickedColor,
              compId: 'paletteList',
              elementName: 'paletteSubTitleTxt'
            })}
            {BtnColor({
              pickedColor: pickedColor,
              compId: 'paletteList',
              elementName: 'paletteSubTitleBg'
            })}
            <br />
            <br />
            <button
              onClick={() => {
                console.log('Aplicando colores');
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
