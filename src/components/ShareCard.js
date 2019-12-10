import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ProyectContext } from '../hooks/ProyectContext';
import { SnackbarContext } from '../hooks/SnackbarContext';
import Axios from 'axios';
import { initAxiosInterceptors } from '../helpers/auth-helper';

initAxiosInterceptors();

const ShareCard = props => {
  const [values, setValues] = useState({
    localName: '',
    localRoute: props.proyectId.location.href
  });
  const { setSnackMessage } = useContext(SnackbarContext);
  const { currentProyect, setCurrentProyectBy } = useContext(ProyectContext);
  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };
  const saveProyect = name => {
    Axios.put(`/proyects/${currentProyect._id}`, {
      name: name,
      __v: currentProyect.__v + 1
    });
    setCurrentProyectBy({
      ...currentProyect,
      name: name,
      __v: currentProyect.__v + 1
    });
    setSnackMessage('Guardando Nombre');
    console.log('guardando');
  };
  return (
    <div style={{ textAlign: 'center' }}>
      <Grid container>
        <Grid item xs={6}>
          <Paper
            style={{
              margin: '4px',
              height: '150px',
              padding: '8px',
              backgroundColor: 'white'
            }}
          >
            <h3>Nombre del proyecto</h3>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="projectName"
              label="Project Name"
              name="projectName"
              autoComplete="projectName"
              value={values.localName}
              onChange={handleChange('localName')}
            />
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={() => {
                saveProyect(values.localName);
                props.setName(values.localName);
              }}
            >
              Update Proyect
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            style={{
              margin: '4px',
              height: '150px',
              padding: '8px',
              backgroundColor: 'white'
            }}
          >
            <h3>Compartir proyecto</h3>
            <TextField
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
              required
              fullWidth
              id="projectRoute"
              label="Project Route"
              name="projectRoute"
              autoComplete="projectRoute"
              value={values.localRoute}
              onChange={handleChange('localRoute')}
            />
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={() => {
                setValues({
                  ...values,
                  localRoute: values.localName
                });
              }}
            >
              Generar ruta
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShareCard;
