import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { ColorContext } from '../contexts/ColorContext';
import { SnackbarContext } from '../contexts/SnackbarContext';
import { UserContext } from '../contexts/UserContext';
import { deleteToken } from '../Helpers/auth-helper';

const AppToolbar = props => {
  const { color } = useContext(ColorContext);
  const { setSnackMessage } = useContext(SnackbarContext);
  const { currentUser } = useContext(UserContext);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl_1, setAnchorEl_1] = React.useState(null);
  const open = Boolean(anchorEl_1);
  let bgColor = color.find(
    c => c.compId === 'toolBar' && c.elementName === 'background'
  ).color;
  let tamColor = color.find(
    c => c.compId === 'toolBar' && c.elementName === 'title and menu'
  ).color;

  const handleChange = change => {
    setAuth(change);
    deleteToken();
    setSnackMessage('Cerrando sesión');
  };

  const handleMenu = event => {
    setAnchorEl_1(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl_1(null);
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
                onClick={handleMenu}
              >
                <AccountCircle />
                <Typography variant="h6">
                  {currentUser.name.split(' ')[0]}
                </Typography>
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
