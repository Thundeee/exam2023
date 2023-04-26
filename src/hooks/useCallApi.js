import { useState } from "react";

const useCallApi = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const startFetch = async (url, options = {}) => {
    console.log(options)
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

  return { data, isLoading, isError, startFetch };
};

export default useCallApi;