import React from 'react';
import { Modal } from "@mui/material/";
import { Button } from "@mui/material";
import styled from 'styled-components';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';
import { useTheme } from '@mui/material';
import { useContext } from 'react';
import { ModalContext } from "../context/modalContent";


const InfoModal = ({ open, handleClose }) => {
  const { modalInfo, modalTitle } = useContext(ModalContext);
  const theme = useTheme();

  // Define styles for the modal
  const ModalContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${theme.palette.secondary.main};
    border: 1px solid #ccc;
    padding: 20px;
    color: ${theme.palette.text.main};
    width: 30vw;
    border-radius: 10px;
    display: grid;
    max-height: 80vh;
    overflow: auto; 
  `;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <ModalContainer>
          <h2 style={{ color: "white" }}>{modalTitle}</h2>
          <div style={{ color: "white" }}>{modalInfo}</div>
          <Button
            style={{ margin: "auto 0 auto auto" }}
            variant="contained"
            color="tertiary"
            onClick={handleClose}
          >
            Close
          </Button>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};

export default InfoModal;
