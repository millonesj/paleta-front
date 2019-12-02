import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React, { useState, useEffect } from 'react';
import AppToolbar from '../components/appToolbar';
import ColorSetter from '../components/colorSetter';
import PaletteList from '../components/paletas';
import ColorProvider from '../colorContext/colorProvider';
import { navigate } from '@reach/router';
import Chat from '../components/Chat';
import Store from '../contexts/Store';
import ShareCard from '../components/shareCard';
import { getCurrentUser, deleteToken } from '../Helpers/auth-helper';

const Dashboard = prop => {
  console.log('>>>> PROP');
  console.log(prop.proyectId);
  const [name, setName] = useState('');
  var currentUser = null;

  useEffect(() => {
    const existUser = async () => {
      currentUser = await getCurrentUser();
      if (!currentUser) {
        console.log('no hay usuario');
        navigate('/');
      }
      console.log(currentUser);
    };
  });

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
                  <ShareCard setName={setName} />
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
