import axios from "axios";
import { useState, useEffect } from "react";

const useAxiosDataFunction = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); //different!
  const [controller, setController] = useState();

  const axiosPost = async (configObj) => {
    const { axiosInstance, method, url, data, token="" } = configObj;

    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axios({url,method, data, 
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          },
        signal: ctrl.signal,
      });
      setResponse(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // useEffect cleanup function
    return () => controller && controller.abort();
  }, [controller]);
  return [response, error, loading, axiosPost];
};

export default useAxiosDataFunction;