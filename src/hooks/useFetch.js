import { useState, useRef, useCallback } from "react";
import axios from "axios";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false); // Tracks active requests
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const controllerRef = useRef(null); // Tracks ongoing API calls

  const fetchData = useCallback(async (url, method = "GET", data = null, token = "") => {
    if (controllerRef.current) {
      controllerRef.current.abort(); // Cancel previous request
    }
    
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setIsFetching(true);
    setError(null);

    try {
      const res = await axios({
        url,
        method,
        data,
        signal: controller.signal, // Attach the AbortController
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
      });

      setResponse(res.data);
      return res.data; // Return response for chaining
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request canceled:", err.message);
      } else {
        setError(err);
      }
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  }, []);

  return { fetchData, response, error, loading, isFetching };
};

export default useFetch;
