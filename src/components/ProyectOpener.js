import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { initAxiosInterceptors } from '../Helpers/auth-helper';
import Axios from 'axios';
import { navigate } from '@reach/router';
import { SnackbarContext } from '../contexts/SnackbarContext';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { ProyectContext } from '../contexts/ProyectContext';

initAxiosInterceptors();
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  margin: {
    margin: theme.spacing(3, 0, 3)
  },
  root: {
    padding: theme.spacing(3, 2)
  }
}));

export default function ProyectOpener() {
  const classes = useStyles();
  const [proyectList, setProyectList] = useState([]);
  const [idProyectSelected, setIdProyectSelected] = useState('');
  const { setVisible, setMessage } = useContext(SnackbarContext);
  const { setCurrentProyectBy } = useContext(ProyectContext);

  useEffect(() => {
    Axios.get('/proyects').then(response => {
      let proyects = response.data.payload;
      setProyectList(proyects);
    });
  }, []);

  const openNewProyect = () => {
    Axios.post('/proyects/')
      .then(response => {
        let proyect = response.data.payload;
        setCurrentProyectBy(proyect);
        navigate(`/dashboard/${proyect._id}`);
      })
      .catch(response => {
        setMessage(JSON.stringify(response.data));
        setVisible(true);
      });
  };

  function handleOpenExistingProyect() {
    navigate(`/dashboard/${idProyectSelected}`);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <CssBaseline />
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <Button
              variant="contained"
              color="primary"
              className={classes.margin}
              onClick={() => {
                openNewProyect();
              }}
              fullWidth
            >
              Open New Proyect
            </Button>
            <InputLabel id="open-existing-proyect-label">
              Open Existing Proyect
            </InputLabel>
            <Select
              labelId="open-existing-proyect-label"
              fullWidth
              id="open-existing-proyect"
              value={idProyectSelected}
              onChange={event => {
                setIdProyectSelected(event.target.value);
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {proyectList.map((proyect, indice) => {
                return (
                  <MenuItem value={proyect._id} key={indice}>
                    {proyect.name}
                  </MenuItem>
                );
              })}
            </Select>
            <Button
              disabled={!idProyectSelected}
              variant="contained"
              color="primary"
              className={classes.margin}
              fullWidth
              onClick={handleOpenExistingProyect}
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
