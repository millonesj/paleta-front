import 'rc-color-picker/assets/index.css';
import React, { useState, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Panel as ColorPickerPanel } from 'rc-color-picker';
import { ColorContext } from '../hooks/ColorContext';
import ColorPicker from 'rc-color-picker';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

var colorList = [
  {
    color: '#0000FF',
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
    color: '#0000FF',
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
];
const getIndex = props => {
  return colorList.findIndex(c => {
    return c.compId === props.compId && c.elementName === props.elementName;
  });
};
const getTextColor = bgColor => {
  const R = parseInt(bgColor.toString().substring(1, 3), 16);
  const G = parseInt(bgColor.toString().substring(3, 5), 16);
  const B = parseInt(bgColor.toString().substring(5, 7), 16);
  if ((R > 100 && G > 100) || (R > 100 && B > 100) || (B > 100 && G > 100)) {
    return 'black';
  } else {
    return 'white';
  }
};
const BtnColor = props => {
  let index = getIndex(props);
  const { color, setColorBy } = useContext(ColorContext);
  const [btnColor, setBtnColor] = useState(color[index].color);
  const [textColor, setTextColor] = useState(getTextColor(color[index].color));
  useEffect(() => {
    colorList = color;
    setBtnColor(colorList[index].color);
    setTextColor(getTextColor(colorList[index].color));
  }, [color]);
  return (
    <Button
      style={{
        backgroundColor: btnColor,
        margin: '2px',
        color: textColor,
        padding: '2px'
      }}
      size="small"
      onClick={() => {
        index = getIndex(props);
        colorList[index] = {
          compId: props.compId,
          elementName: props.elementName,
          color: props.pickedColor
        };
        setBtnColor(props.pickedColor);
        setTextColor(getTextColor(props.pickedColor));
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
