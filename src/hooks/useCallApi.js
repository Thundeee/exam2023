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
      console.log(response)

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

  return { data, isLoading, isError, startFetch };
};

export default useCallApi;