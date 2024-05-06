import { useEffect, useState, useContext } from "react";
import { Context } from "../App.jsx";

import axios from "axios";
const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { success, setSuccess } = useContext(Context);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      const result = res.data;
      setData(result.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url, success]);

  setTimeout(() => {
    setSuccess(false);
  }, 100);
  return { data, loading, error, fetchData };
};

export default useFetch;
