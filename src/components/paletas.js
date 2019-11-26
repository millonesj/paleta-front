import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PaletteIcon from "@material-ui/icons/Palette";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import temporalDB from "../utils/temporalDB";
import ColorContext from "../colorContext/colorContext";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
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
    return c.compId === "paletteList" && c.elementName === "paletteTitleBg";
  }).color;
  let pTitleTxt = color.find(c => {
    return c.compId === "paletteList" && c.elementName === "paletteTitleTxt";
  }).color;
  let pSubTitleBg = color.find(c => {
    return c.compId === "paletteList" && c.elementName === "paletteSubTitleBg";
  }).color;
  let pSubTitleTxt = color.find(c => {
    return c.compId === "paletteList" && c.elementName === "paletteSubTitleTxt";
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
      <Collapse in={openPalette} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
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
  const classes = useStyles();
  let pBackground = color.find(c => {
    return c.compId === "paletteList" && c.elementName === "background";
  }).color;
  let pTitle = color.find(c => {
    return c.compId === "paletteList" && c.elementName === "title";
  }).color;
  return (
    <List
      component='nav'
      aria-labelledby='nested-list-subheader'
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          <h3 style={{ textAlign: "center", color: pTitle }}>
            Lista de paletas
          </h3>
        </ListSubheader>
      }
      className={classes.root}
      style={{ backgroundColor: pBackground }}
    >
      {temporalDB[2].map(component => {
        return <div key={component.compId}>{PaletteItem(component)}</div>;
      })}
    </List>
  );
};
export default PaletteList;
