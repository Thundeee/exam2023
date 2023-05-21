import React, { useState, useContext } from 'react';
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useTheme } from '@mui/material';
import Logo from '../../Logo.svg';
import { AuthContext } from "../../context/auth";
import { ModalContext } from "../../context/modalContent";
import {
  HeaderContainer,
  LogoContainer,
  Title,
  HeaderButtons,
  ProfileImage,
} from './header.styles';
import Login from '../Login';
import Register from '../Register';

const Header = () => {
  const { openModal, setOpenModal, setModalInfo, setModalTitle } = useContext(ModalContext);

  const theme = useTheme();

  const [drawer, setDrawer] = useState(false);
  const [formType, setFormType] = useState('');
  const { token, setToken } = useContext(AuthContext);

  function logout() {
    localStorage.removeItem('userInfo');
    setToken(false);
    setOpenModal(true);
    setModalTitle('Success!');
    setModalInfo('You have been logged out');
  }

  const toggleDrawer = (type) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setFormType(type);
    setDrawer(true);
  };

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  return (
    <HeaderContainer backgroundColor={theme.palette.secondary.main}>
        <Link to='/'>
          <img src={Logo} alt="Holidaze Logo" style={{marginLeft: '20px'}} width={100} />
        </Link>
      <Title>Holidaze</Title>
      <HeaderButtons>
        {token ? (
          <>
          <Link to='/profile'>
            <ProfileImage src={userInfo.avatar} alt="Profile Pic" />
          </Link>
            <Button variant="contained" color="tertiary" onClick={logout}>Log out</Button>
          </>
        ) : (
          <>

              <Button variant="contained" color="tertiary" style={{ marginRight: '20px' }} onClick={toggleDrawer('signup')}>Sign up</Button>

            <Button variant="contained" color="tertiary" onClick={toggleDrawer('login')}>Log in</Button>
          </>
        )}
      </HeaderButtons>

      <SwipeableDrawer
 PaperProps={{
  sx: {
    width: '25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px',
  },
}}        anchor="right"
        open={drawer}
        onClose={() => setDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {formType === 'login' ? <Login children={setDrawer} /> : <Register children={setDrawer} />}
      </SwipeableDrawer>
    </HeaderContainer>
  );
};

export default Header;
