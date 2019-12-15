import React from 'react';
import { Router } from '@reach/router';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Dashboard from './views/Dashboard';
import OpenerProyect from './views/ProyectOpener';

const router = () => {
  return (
    <Router>
      <SignIn path="/" />
      <SignUp path="signup" show="true" />
      <OpenerProyect path="proyect-opener" />
      <OpenerProyect path="dashboard" />
      <Dashboard path="dashboard/:proyectId" />
    </Router>
  );
};

export default router;
