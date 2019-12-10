import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PaletteIcon from '@material-ui/icons/Palette';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import paletteListModel from '../utils/paletteListModel';
import { ColorContext } from '../hooks/ColorContext';
import { initAxiosInterceptors } from '../helpers/auth-helper';
import Axios from 'axios';
import { ProyectContext } from '../hooks/ProyectContext';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

initAxiosInterceptors();

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  card: {
    display: 'flex',
    width: '100%'
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  nameBox: {
    width: '85%'
  },
  actionBox: {
    width: '15%'
  },
  CardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%'
  }
}));

const PaletteItem = props => {
  const { color } = useContext(ColorContext);
  const classes = useStyles();
  const [openPalette, setOpenPalette] = React.useState(false);
  const handleClick = () => {
    setOpenPalette(!openPalette);
  };
  let pTitleBg = color.find(c => {
    return c.compId === 'paletteList' && c.elementName === 'paletteTitleBg';
  }).color;
  let pTitleTxt = color.find(c => {
    return c.compId === 'paletteList' && c.elementName === 'paletteTitleTxt';
  }).color;
  let pSubTitleBg = color.find(c => {
    return c.compId === 'paletteList' && c.elementName === 'paletteSubTitleBg';
  }).color;
  let pSubTitleTxt = color.find(c => {
    return c.compId === 'paletteList' && c.elementName === 'paletteSubTitleTxt';
  }).color;
  return (
    <div>
      <ListItem
        button
        onClick={handleClick}
        style={{ backgroundColor: pTitleBg, color: pTitleTxt }}
      >
        <ListItemIcon>
          <PaletteIcon style={{ color: pTitleTxt }} />
        </ListItemIcon>
        <ListItemText primary={props.compId} />
        {openPalette ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openPalette} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.compElements.map(e => {
            return (
              <ListItem
                button
                className={classes.nested}
                key={e.elementName}
                style={{ backgroundColor: pSubTitleBg, color: pSubTitleTxt }}
              >
                <ListItemText primary={e.elementName} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </div>
  );
};

const PaletteList = () => {
  const { color } = useContext(ColorContext);
  const { currentProyect } = useContext(ProyectContext);
  const [palettes, setPalettes] = useState([]);
  const [nameValue, changeNameValue] = useState('');
  const [idPaletteSelected, setIdPaletteSelected] = useState('default');
  const [paletteSelectedName, setPaletteSelectedName] = useState('default');

  useEffect(() => {
    if (currentProyect._id !== '') {
      Axios.get(`/proyects/${currentProyect._id}/palettes`).then(response => {
        const currentPalettes = response.data.payload;
        setPalettes(currentPalettes);
      });
    }
  }, [currentProyect]);

  const classes = useStyles();
  let pBackground = color.find(c => {
    return c.compId === 'paletteList' && c.elementName === 'background';
  }).color;
  let pTitle = color.find(c => {
    return c.compId === 'paletteList' && c.elementName === 'title';
  }).color;

  const getPaletteIndex = id => {
    const index = palettes.findIndex(palette => {
      return palette._id === id;
    });
    return index;
  };
  const SelectedName = id => {
    const index = getPaletteIndex(id);
    setPaletteSelectedName(palettes[index].name);
  };
  const changePaletteName = () => {
    Axios.put(`/palettes/${idPaletteSelected}`, {
      name: nameValue
    });
    let palettesAux = palettes;
    const index = getPaletteIndex(idPaletteSelected);
    palettesAux[index].name = nameValue;
    console.log(palettesAux);
    setPalettes(palettesAux);
  };

  const addSaveAction = () => {
    if (paletteSelectedName === 'default') {
      console.log('añadiendo paleta');
    } else {
      changePaletteName();
    }
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.CardContent}>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              <h3 style={{ textAlign: 'center', color: pTitle }}>
                Lista de paletas
              </h3>
            </ListSubheader>
          }
          className={classes.root}
          style={{ backgroundColor: pBackground }}
        >
          <Select
            labelId="open-existing-palette-label"
            fullWidth
            style={{ paddingInline: '8px' }}
            id="open-existing-palette"
            value={idPaletteSelected}
            onChange={event => {
              console.log(event.target.value);
              SelectedName(event.target.value);
              setIdPaletteSelected(event.target.value);
            }}
          >
            {palettes.map(palette => {
              return (
                <MenuItem value={palette._id} key={palette._id}>
                  {palette.name}
                </MenuItem>
              );
            })}
          </Select>
          {paletteListModel.map(component => {
            return <div key={component.compId}>{PaletteItem(component)}</div>;
          })}
        </List>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TextField
            label="Nombre de paleta"
            value={nameValue}
            onChange={e => changeNameValue(e.target.value)}
            className={classes.nameBox}
            onKeyPress={ev => {
              if (ev.key === 'Enter') {
                // Do code here
                ev.preventDefault();
                addSaveAction();
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.actionBox}
            onClick={() => {
              addSaveAction();
            }}
          >
            {paletteSelectedName === 'default' ? 'Add' : 'Save'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default PaletteList;
