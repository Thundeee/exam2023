  import {React, useState } from 'react';
  import { Button } from "@mui/material";
  import Logo from '../Logo.svg';
  import SwipeableDrawer from '@mui/material/SwipeableDrawer';
  import Login from './Login';
  import Register from './Register';
  import useLocalStorage from '../hooks/useLocalStorage';

  const Header = () => {
    const [storage, setStorage] = useLocalStorage('accessToken');
    const [drawer, setDrawer] = useState(false);
    const [formType, setFormType] = useState('');

    function logout() {
      setStorage('');
      localStorage.removeItem('username');
      localStorage.removeItem('avatar');
      localStorage.removeItem('venueManager');
    }

    const toggleDrawer = (type) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }

      setFormType(type);
      setDrawer(true);
    };


    return (
      <header>
        <img src={Logo} alt="Holidaze Logo" />
        <h1>Holidaze</h1>
        <div>
          {storage ? (
            <>
              <img src='' alt="Profile Pic" />
              <Button onClick={logout}>Log out</Button>
            </>
          ) : (
            <>
              <Button onClick={toggleDrawer('signup')}>Sign up</Button>
              <Button onClick={toggleDrawer('login')}>Log in</Button>
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
          {formType === 'login' ? <Login children= {setStorage} /> : <Register />}
        </SwipeableDrawer>
      </header>
    );
  };

  export default Header;