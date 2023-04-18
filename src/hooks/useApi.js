import { useState, useEffect } from "react";

const useApi = (url, options = {}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const accesData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(response.status);
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    accesData();
  }, [url, options]);

  return { data, isLoading, isError };
};

export default useApi;