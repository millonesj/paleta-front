import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';

const ShareCard = props => {
  const [values, setValues] = useState({
    localName: '',
    localRoute: 'Generar Ruta'
  });
  const handleChange = name => event => {
    setValues({
      ...values,
      [name]: event.target.value
    });
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
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    /* checked={state.checkedB} */
                    onChange={handleChange('checkedB')}
                    value="checkedB"
                    color="primary"
                  />
                }
                label="Primary"
              />
            </FormGroup>
            <Button
              style={{ color: 'white', backgroundColor: 'blue', margin: '4px' }}
              size="small"
              onClick={() => {
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
              style={{ color: 'white', backgroundColor: 'blue', margin: '4px' }}
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
