import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SaveIcon from '@material-ui/icons/Save';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ColorContext from '../colorContext/colorContext';
import { SnackbarContext } from '../contexts/SnackbarContext';
import { deleteToken, initAxiosInterceptors } from '../Helpers/auth-helper';
import Axios from 'axios';
import { ProyectContext } from '../contexts/ProyectContext';

initAxiosInterceptors();

const AppToolbar = props => {
  const { color } = useContext(ColorContext);
  const { setVisible, setMessage } = useContext(SnackbarContext);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl_1, setAnchorEl_1] = React.useState(null);
  const open = Boolean(anchorEl_1);
  let bgColor = color.find(
    c => c.compId === 'toolBar' && c.elementName === 'background'
  ).color;
  let tamColor = color.find(
    c => c.compId === 'toolBar' && c.elementName === 'title and menu'
  ).color;

  const { currentProyect, setCurrentProyect } = useContext(ProyectContext);

  const handleChange = change => {
    setAuth(change);
    deleteToken();
    setMessage('Cerrando sesión');
    setVisible(true);
  };

  const handleMenu = event => {
    setAnchorEl_1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl_1(null);
  };

  const saveProject = () => {
    Axios.put(`/proyects/${currentProyect._id}`, {
      name: props.title,
      __v: currentProyect.__v + 1
    });
    setCurrentProyect({
      ...currentProyect,
      name: props.title,
      __v: currentProyect.__v + 1
    });
    console.log({ ...currentProyect, name: props.title });
    console.log(props.title);
    console.log(color);
    console.log('guardando');
  };
  return (
    <div>
      <AppBar
        position="fixed"
        style={{
          backgroundColor: bgColor
        }}
      >
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
              color: tamColor
            }}
          >
            Paleta Colaborativa: {props.title}
          </Typography>
          {auth ? (
            <div>
              <IconButton
                edge="end"
                style={{
                  color: tamColor
                }}
                onClick={saveProject}
              >
                <SaveIcon />
              </IconButton>
              <IconButton
                edge="end"
                style={{
                  color: tamColor
                }}
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl_1}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleChange(false);
                    console.log('Cerrando sesión');
                  }}
                >
                  Cerrar Sesion
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div></div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppToolbar;
