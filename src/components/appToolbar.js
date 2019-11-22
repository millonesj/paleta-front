import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const AppToolbar = props => {
  const [auth, setAuth] = React.useState(false);
  const [anchorEl_1, setAnchorEl_1] = React.useState(null);
  const [anchorEl_2, setAnchorEl_2] = React.useState(null);
  const open = Boolean(anchorEl_1);
  const open2 = Boolean(anchorEl_2);

  const handleChange = change => {
    setAuth(change);
  };

  const handleMenu = event => {
    setAnchorEl_1(event.currentTarget);
  };
  const handleMenu2 = event => {
    setAnchorEl_2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl_1(null);
  };
  const handleClose2 = () => {
    setAnchorEl_2(null);
  };

  return (
    <div>
      <AppBar
        position='fixed'
        style={{
          backgroundColor:
            props.backgroundColor == null ? "blue" : props.backgroundColor
        }}
      >
        <Toolbar variant='dense'>
          <Typography
            variant='h6'
            style={{
              flexGrow: 1,
              color: props.titleColor == null ? "white" : props.titleColor
            }}
          >
            Paleta Colaborativa
          </Typography>
          {auth ? (
            <div>
              <IconButton
                edge='end'
                style={{
                  color: props.menuColor == null ? "white" : props.menuColor
                }}
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl_1}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    console.log("Abriendo perfil");
                  }}
                >
                  Mi Perfil
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    handleChange(false);
                    console.log("Cerrando sesión");
                  }}
                >
                  Cerrar Sesion
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <IconButton
                edge='end'
                style={{
                  color: props.menuColor == null ? "white" : props.menuColor
                }}
                onClick={handleMenu2}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl_2}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open2}
                onClose={handleClose2}
              >
                <MenuItem
                  onClick={() => {
                    handleClose2();
                    handleChange(true);
                    console.log("Abriendo Registro");
                  }}
                >
                  Registrarse
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose2();
                    handleChange(true);
                    console.log("Iniciando sesión");
                  }}
                >
                  Iniciar sesión
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppToolbar;
