import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, { useState, useEffect, useContext } from 'react';
import AppToolbar from '../components/appToolbar';
import ColorSetter from '../components/colorSetter';
import PaletteList from '../components/paletas';
import ColorProvider from '../colorContext/colorProvider';
import { navigate } from '@reach/router';
import Chat from '../components/Chat';
import Store from '../contexts/Store';
import ShareCard from '../components/shareCard';
import { getCurrentUser, deleteToken } from '../Helpers/auth-helper';
import { ProyectContext } from '../contexts/ProyectContext';
import { initAxiosInterceptors } from '../Helpers/auth-helper';
import Axios from 'axios';

initAxiosInterceptors();

const Dashboard = prop => {
  const [name, setName] = useState('');
  const { currentProyect, setCurrentProyectBy } = useContext(ProyectContext);
  var currentUser = null;

  const getUserProyects = async () => {
    Axios.get('/proyects').then(response => {
      const proyects = response.data.payload;
      const proyect = proyects.find(proyect => {
        return proyect._id === prop.proyectId;
      });
      if (proyect == null) {
        console.log('Proyecto inexistente');
        navigate('/proyect-opener');
      } else {
        setCurrentProyectBy(proyect);
        console.log('El proyecto no estaba asignado');
      }
    });
  };
  const existUser = async () => {
    currentUser = await getCurrentUser();
    if (!currentUser) {
      console.log('no hay usuario');
      navigate('/');
    }
    if (currentProyect._id == null) {
      getUserProyects();
    } else {
      console.log('Proyecto asignado');
    }
  };

  useEffect(() => {
    setName(currentProyect.name);
    existUser();
  }, [currentProyect]);

  return (
    <div>
      <ColorProvider>
        <Grid container>
          <Grid item xs={12} style={{ height: '50px' }}>
            <AppToolbar title={name} />
          </Grid>
          <Grid item xs={3}>
            <Paper
              style={{
                display: 'flex',
                marginInline: '4px',
                height: '87vh',
                padding: '8px',
                backgroundColor: '#e0e0e0'
              }}
            >
              <Store>
                <Chat></Chat>
              </Store>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Grid container>
              <Grid item xs={12}>
                <Paper
                  style={{
                    marginInline: '4px',
                    height: '57vh',
                    padding: '8px',
                    backgroundColor: '#e0e0e0'
                  }}
                >
                  <ColorSetter />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  style={{
                    marginInline: '4px',
                    marginTop: '8px',
                    height: '27vh',
                    padding: '8px',
                    backgroundColor: '#e0e0e0'
                  }}
                >
                  <ShareCard setName={setName} proyectId={prop} />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Paper
              style={{
                marginInline: '4px',
                height: '87vh',
                padding: '8px',
                backgroundColor: '#e0e0e0'
              }}
            >
              <PaletteList />
            </Paper>
          </Grid>
        </Grid>
      </ColorProvider>
    </div>
  );
};
export default Dashboard;
