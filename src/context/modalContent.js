import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContentProvider = ({ children }) => {
  const [modalInfo, setModalInfo] = useState("qwdqwdqx");
  const [modalTitle, setModalTitle] = useState("ssaddqqwd");
  const [openModal, setOpenModal] = useState(false);
  return (
    <ModalContext.Provider
      value={{
        modalInfo,
        setModalInfo,
        modalTitle,
        setModalTitle,
        openModal,
        setOpenModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
