import React from 'react';
import { Router } from '@reach/router';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Dashboard from './views/Dashboard';
import OpenerProyect from './components/ProyectOpener';

const router = () => {
  return (
    <Router>
      <SignIn path="/" />
      <SignUp path="signup" show="true" />
      <OpenerProyect path="proyect-opener" />
      <Dashboard path="dashboard" />
    </Router>
  );
};

export default router;
