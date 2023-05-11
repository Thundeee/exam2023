  import {React, useState, useContext } from 'react';
  import { Button } from "@mui/material";
  import Logo from '../Logo.svg';
  import SwipeableDrawer from '@mui/material/SwipeableDrawer';
  import Login from './Login';
  import Register from './Register';
  import { AuthContext } from "../context/auth";
  import { useTheme } from '@mui/material';
  import { Link } from 'react-router-dom';
  import SimpleModal from './Modal';
  import { ModalContext } from "../context/modalContent";


  const Header = () => {
  
const {openModal, setOpenModal, setModalInfo, setModalTitle} = useContext(ModalContext);

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
      <header style={{ backgroundColor: theme.palette.secondary.main }}>
        <Link to='/'><img src={Logo} alt="Holidaze Logo" /></Link>
        <h1>Holidaze</h1>
        <Button variant="contained" color="primary" onClick={()=> {setOpenModal(true)}}>
        Open Modal
      </Button>
      <SimpleModal open={openModal} handleClose={()=> {setOpenModal(false)}} />
        <div>
          {token ? (
            <>
            <Link to={'/Profile'}><img src={userInfo.avatar} width={100} height={100} alt="Profile Pic" /></Link>
              <Button variant="contained" color="terrtiary" onClick={logout}>Log out </Button>
            </>
          ) : (
            <>
              <Button variant="contained" color="terrtiary" onClick={toggleDrawer('signup')}>Sign up</Button>
              <Button variant="contained" color="terrtiary" onClick={toggleDrawer('login')}>Log in</Button>
            </>
          )}
        </div>

        <SwipeableDrawer
          PaperProps={{ style: { width: '30%' } }}
          anchor={"right"}
          open={drawer}
          onClose={() => setDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          {formType === 'login' ? <Login children= {setDrawer} /> : <Register children= {setDrawer} />}
        </SwipeableDrawer>
      </header>
    );
  };

  export default Header;