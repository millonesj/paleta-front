import axios from 'axios';

const getToken = storage => {
  console.log('storage');
  console.log(storage);
  if (storage) {
    let json = JSON.parse(storage);
    if (json.token) {
      let token = json.token.length !== 0 ? json.token : '';
      return token;
    }
  }
  return '';
};

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_API,
  headers: {
    Authorization: {
      toString() {
        return `Bearer ${getToken(
          localStorage.getItem(process.env.REACT_APP_NAME_TOKEN)
        )}`;
      }
    }
  }
});

instance.interceptors.request.use(
  config => {
    const token = getToken(
      localStorage.getItem(process.env.REACT_APP_NAME_TOKEN)
    );
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },

  error => {
    return Promise.reject(error);
  }
);

export default instance;
