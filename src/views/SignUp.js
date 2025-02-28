import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { setToken } from '../helpers/auth-helper';
import Axios from 'axios';
import { navigate } from '@reach/router';
import { SnackbarContext } from '../hooks/SnackbarContext';
import { getMessageResponse } from '../helpers/utils';
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function FormDialog(prop) {
  const [name, setName] = useState('');
  const { setSnackMessage } = useContext(SnackbarContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageResponse, setMessageResponse] = useState('');

  const getToken = async (name, email, password) => {
    try {
      Axios.post('/users/register', { name, email, password })
        .then(response => {
          setToken(response.data.token);
          navigate('/proyect-opener/');
          setSnackMessage('Registrando');
        })
        .catch(response => {
          const message = getMessageResponse(response);
          setSnackMessage(message);
          setMessageResponse(message);
        });
    } catch (error) {
      setMessageResponse(error);
      console.log(error);
    }
  };

  const handleSignUp = () => {
    getToken(name, email, password);
    setName('');
    setEmail('');
    setPassword('');
  };

  const classes = useStyles();

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              label="Name"
              name="name"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              onKeyPress={ev => {
                if (ev.key === 'Enter') {
                  handleSignUp();
                }
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {'Already have an account? Log in'}
                </Link>
              </Grid>
            </Grid>
          </form>
          <div>{messageResponse}</div>
        </div>
      </Container>
    </div>
  );
}
