import { useState, useContext } from "react";
import { ModalContext } from "../context/modalContent";

const useCallApi = () => {

  const { setModalInfo, setModalTitle, setOpenModal } = useContext(ModalContext);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const startFetch = async (url, options = {}) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(url, options);

      const json = await response.json();
      console.log(json)
            if (!response.ok) {
        throw new Error(json.errors[0].message);
      }
      setData(json);
    } catch (error) {
      setModalInfo(error.message);
      setModalTitle("Error");
      setOpenModal(true);
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, isError, startFetch };
};

export default useCallApi;