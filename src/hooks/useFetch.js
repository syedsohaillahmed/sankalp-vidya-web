import { useState } from 'react';
import axios from 'axios';

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const fetchData = async (url, method = 'GET', data = null, token = '') => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios({
        url,
        method,
        data,
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json',
        },
      });

      setResponse(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, response, error, loading };
};

export default useFetch;
