import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { navigate } from '@reach/router';
import Axios from 'axios';
import AppToolbar from '../components/AppToolbar';
import ColorSetter from '../components/ColorSetter';
import PaletteList from '../components/PaletteList';
import Chat from '../components/Chat';
import ShareCard from '../components/ShareCard';
import {
  getCurrentUser,
  deleteToken,
  initAxiosInterceptors
} from '../Helpers/auth-helper';

import { ColorProvider } from '../contexts/colorContext';
import { ChatContextProvider } from '../contexts/ChatContext';
import { ProyectContext } from '../contexts/ProyectContext';
import { UserContext } from '../contexts/UserContext';

initAxiosInterceptors();

const Dashboard = prop => {
  const [name, setName] = useState('');
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { currentProyect, setCurrentProyectBy } = useContext(ProyectContext);

  const getUserProyects = async () => {
    Axios.get(`/proyects/${prop.proyectId}`).then(response => {
      const proyect = response.data.payload;
      if (proyect == null) {
        console.log('Proyecto inexistente');
        navigate('/proyect-opener');
      } else {
        setCurrentProyectBy(proyect);
        console.log('El proyecto no estaba asignado');
      }
    });
  };

  useEffect(() => {
    const existUserCurrent = async () => {
      if (currentUser.name === '') {
        const user = await getCurrentUser();
        if (user) {
          setCurrentUser(user);
        } else {
          navigate('/');
          console.log('no hay usuario');
        }
      }
    };
    existUserCurrent().then(() => {
      if (currentProyect._id === '') {
        getUserProyects();
      } else {
        setName(currentProyect.name);
        console.log('Proyecto asignado');
      }
    });
  }, [currentProyect, setCurrentUser, currentUser]);

  return (
    <div>
      <ColorProvider>
        <Grid container>
          <Grid item xs={12} style={{ height: '50px' }}>
            <AppToolbar title={currentProyect.name} />
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
              <ChatContextProvider>
                <Chat></Chat>
              </ChatContextProvider>
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
