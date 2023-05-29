import { useState, useContext } from "react";
import { ModalContext } from "../context/modalContent";

const useCallApi = () => {
  const { setModalInfo, setModalTitle, setOpenModal } =
    useContext(ModalContext);
  const [information, setInformation] = useState();
  const [isItLoading, setIsItLoading] = useState(true);
  const [isItError, setIsItError] = useState(false);
  const startFetch = async (url, options = {}) => {
    try {
      setIsItLoading(true);
      setIsItError(false);
      const response = await fetch(url, options);
      if (options.method === "DELETE" && response.ok) {
        setModalTitle("Success");
        setModalInfo("The item has been deleted successfully.");

        setOpenModal(true);
        return;
      }
      const json = await response.json();
      console.log(json);
      if (!response.ok) {
        throw new Error(json.errors[0].message);
      }
      setInformation(json);
    } catch (error) {
      setModalInfo(error.message);
      setModalTitle("Error");
      setOpenModal(true);
      console.log(error);
      setIsItError(true);
    } finally {
      setIsItLoading(false);
    }
  };

  return { information, isItLoading, isItError, startFetch };
};

export default useCallApi;
