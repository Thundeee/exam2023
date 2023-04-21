import React from 'react';
import { useState } from "react";
import { Button } from "@mui/material";
import Logo from '../Logo.svg';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Login from './Login';
import Register from './Register';
import useLocalStorage from '../hooks/useLocalStorage';


const Header = () => {

  const CorrectForm = ({ type }) => {
    return (
      <div>
        {type === 'login' ? <Login/> : <Register/>}
      </div>
    );
  }

  const [storage] = useLocalStorage('accessToken');


 function logout() {
   localStorage.removeItem ('accessToken');
   localStorage.removeItem ('username');
   localStorage.removeItem ('avatar');
   localStorage.removeItem ('venueManager');
  window.location.reload();
}
  
  const CorrectButtons = () => {
    const isLoggedIn = storage;
    const buttons = isLoggedIn
      ? (
        <>
          <img src=''  alt="Profile Pic" />
          <Button onClick={logout}>Log out</Button>
        </>
      )
      : (
        <>
          <Button onClick={toggleDrawer('signup')}>Sign up</Button>
          <Button onClick={toggleDrawer('login')}>Log in</Button>
        </>
      );
    return <div>{buttons}</div>;
  };

  const [drawer, setDrawer] = useState(false);
  const [formType, setFormType] = useState('');
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
            <CorrectButtons/>
            

      <SwipeableDrawer
      PaperProps={{ style: { width: '30%' } }}
  anchor={"right"}
  open={drawer}
  onClose={() => setDrawer(false)}
  onOpen={toggleDrawer(true)}
>
  <CorrectForm type={formType} />
</SwipeableDrawer>
      </header>
    );
  };

  export default Header;