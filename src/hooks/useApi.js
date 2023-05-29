import { useState, useEffect } from "react";

const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const accesData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(url, options);

        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.errors[0].message);
        }
        setData(json);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    accesData();
    //eslint-disable-next-line
  }, [url]);

  return { data, isLoading, isError };
};

export default useApi;
