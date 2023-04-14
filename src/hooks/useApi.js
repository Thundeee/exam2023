import { useState, useEffect } from "react";

const useApi = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const fetchedData = await fetch(url);
        if (!fetchedData.ok) {
          throw new Error(fetchedData.status);
        }
        const json = await fetchedData.json();
        setData(json);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [url]);
  return { data, isLoading, isError };
};

export default useApi;