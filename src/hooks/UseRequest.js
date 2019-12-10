import { useState, useEffect } from 'react';

import axios from '../helpers/axios.conf';

const useGetRequest = URL => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(URL).then(({ data }) => {
      setData(data);
    });
  }, [URL]);

  return { loading: !data ? true : false, data };
};

const usePostRequest = (URL, PARAMS) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.post(URL, PARAMS).then(({ data }) => {
      setData(data);
    });
  }, [URL, PARAMS]);

  return { loading: !data ? true : false, data };
};

export { useGetRequest, usePostRequest };
