import Axios from 'axios';

const TOKEN_KEY = process.env.REACT_APP_NAME_TOKEN;

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function deleteToken(e) {
  //e.preventDefault();
  localStorage.removeItem(TOKEN_KEY);
  window.location = '/';
}

export async function getCurrentUser() {
  if (!getToken()) return false;
  try {
    let response = await Axios.get('/users/whoami');
    if (response.data) {
      if (response.data.user) {
        return response.data.user;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
}

export function initAxiosInterceptors() {
  Axios.interceptors.request.use(config => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  Axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        deleteToken();
        window.location = '/';
      } else {
        return Promise.reject(error);
      }
    }
  );
}
