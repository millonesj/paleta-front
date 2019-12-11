import { useState, useEffect } from 'react';
import axios from '../helpers/axios.conf';

const UseAuth = (email, password) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    axios.post('/users/login', { email, password }).then(response => {
      setToken(response.data.token);
      /*       navigate('/proyect-opener/'); */
    });
  });
};

export default UseAuth;
