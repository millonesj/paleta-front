import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

export default class AppToolbar extends Component {
  state = {
    appBarColor: this.props.backgroundColor,
    auth: false,
    open: false
  };
  render() {
    return (
      <AppBar
        position='absolute'
        style={{ backgroundColor: this.state.appBarColor }}
      >
        <Toolbar variant='dense'>
          <Typography variant='h6' style={{ flexGrow: 1 }}>
            Paleta Colaborativa
          </Typography>
          {this.state.auth ? (
            <div>
              <IconButton
                edge='end'
                color='inherit'
                onClick={event => {
                  this.setState(() => {
                    return { open: true };
                  });
                }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                open={this.state.open}
              >
                <MenuItem
                  onClick={() => {
                    this.setState(() => {
                      return { open: false };
                    });
                    console.log("Abriendo perfil");
                  }}
                >
                  Perfil
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    this.setState(() => {
                      return { open: false };
                    });
                    console.log("Cerrando sesión");
                  }}
                >
                  Cerrar sesión
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <IconButton
              edge='end'
              color='inherit'
              onClick={() => {
                this.setState(() => {
                  return { auth: !this.state.auth };
                });
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}
