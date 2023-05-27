import React, { useState, useContext } from 'react';
import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useTheme } from '@mui/material';
import Logo from '../../Logo.svg';
import { AuthContext } from "../../context/auth";
import { ModalContext } from "../../context/modalContent";
import { ThemeContext } from "../../context/themeSelect";
import InfoModal from '../Modal';	
import {
  HeaderContainer,
  Title,
  HeaderButtons,
  ProfileImage,
} from './header.styles';
import Login from '../Login';
import Register from '../Register';

const Header = () => {
  const { openModal, setOpenModal, setModalInfo, setModalTitle } = useContext(ModalContext);

  const theme = useTheme();
  const { toggleDarkMode } = useContext(ThemeContext);
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
    <>
    <HeaderContainer backgroundColor={theme.palette.secondary.main}>
        <Link to='/'>
          <img src={Logo} alt="Holidaze Logo"  style={{marginLeft: '20px'}} width={100} />
        </Link>
        <Link to='/' style={{textDecoration: 'none', paddingLeft: '5px'}}>
      <Title>Holidaze</Title>
      </Link>
      <span style={{flexGrow: '1'}} ></span>
      <HeaderButtons>
      <Button onClick={toggleDarkMode} variant="contained" color="tertiary"   style={{ marginRight: '20px' }}>Toggle Dark Mode</Button>
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
      </HeaderContainer>

      <InfoModal open={openModal} handleClose={()=> {setOpenModal(false)}} />
      <SwipeableDrawer
  PaperProps={{
    sx: {
      width: '25%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px',
      '@media (max-width: 1024px)': {
        width: '40%',
      },
      '@media (max-width: 728px)': {
        width: '50%',
      },
    },
  }}
  anchor="right"
  open={drawer}
  onClose={() => setDrawer(false)}
  onOpen={toggleDrawer(true)}
>
  {formType === 'login' ? <Login children={setDrawer} /> : <Register children={setDrawer} />}
</SwipeableDrawer>

    </>
  );
};

export default Header;
