import React, { useEffect, useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  setToken,
  deleteToken,
  getToken,
  initAxiosInterceptors
} from "../Helpers/auth-helper";
import Axios from "axios";
import { navigate } from "@reach/router";
import { SnackbarContext } from "../contexts/SnackbarContext";

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';


initAxiosInterceptors();

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  margin: {
    margin: theme.spacing(3, 0, 3)
  },
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const { setVisible, setMessage } = useContext(SnackbarContext);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    async function loadUser() {
      if (!getToken()) {
        setLoadingUser(false);
        return;
      }

      try {
        const { data: user } = await Axios.get("/users/whoami");
        setUser(user);
        setLoadingUser(false);
        navigate("/dashboard/");
      } catch (error) {
        console.log(error);
      }
    }

    loadUser();
  }, []);



  return (
    <Container component='main' maxWidth='xs' maxHeight='xs'>
      <Paper className={classes.paper}>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
        <Button
          variant="contained"
          color="primary"
          className={classes.margin}
          fullWidth>
          Open New Proyect
        </Button>
        <InputLabel 
          id="demo-simple-select-helper-label">Open Existing Proyect</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          fullWidth

          id="demo-simple-select-helper"
          /* value={age}
          onChange={handleChange} */
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <Button
        variant="contained"
        color="primary"
        className={classes.margin}
        fullWidth
        >
          Open
        </Button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Paper>
    </Container>
  );
}
