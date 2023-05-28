import React, { useContext, useState, useEffect } from 'react';
import useApi from '../../hooks/useApi';
import { BASE_URL_PROFILES } from '../../utils/constants';
import { AuthContext } from '../../context/auth';
import {Box, Button, Tab, Tabs} from '@mui/material/';
import  TabPanel  from '../../components/TabPanel';
import { ProfilePicture } from './profile.styles';
import useCallApi from '../../hooks/useCallApi';
import { ModalContext } from '../../context/modalContent';
import useLocalStorage from '../../hooks/useLocalStorage';


const Profile = () => {

  const [userInfo, setUserInfo] = useLocalStorage('userInfo', '')

  const { token } = useContext(AuthContext);
  const {setOpenModal, setModalInfo, setModalTitle} = useContext(ModalContext);
  const { startFetch, information, isItLoading, isItError } = useCallApi();


  const user = JSON.parse(localStorage.getItem('userInfo'));
  let options;
  let name;
  if (user) {
    options = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };
    name = user.name;
  }

  const { data, isLoading, isError } = useApi(
    BASE_URL_PROFILES + name + '?_bookings=true&_venues=true',
    options
  );

  const [tabValue, setTabValue] = useState(0);



  if (data && !data.avatar) {
    data.avatar =
      'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };



  const pfpChanger = () => {
    setOpenModal(true);
    setModalTitle('Change profile picture');
    setModalInfo( 
    
<form id="changePfpForm" onSubmit={onSubmit}>      
<input type="text" name="avatar" placeholder="Enter image URL" />
    
    <Button type="submit" variant="contained">Submit</Button>
    </form>
    );


  };
  
  async function onSubmit(event) {
    event.preventDefault();
    let link = {};
        link.avatar = event.target.avatar.value;
    let validLink = link.avatar.match(/(^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)$)|(^$)/)
    if (!validLink) {
      setOpenModal(true);
      setModalTitle('Invalid link');
      setModalInfo(
        <div>
          <p>Please enter a valid image URL</p>
        </div>
      )
      return;

    }
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(link),
    };
    await startFetch(BASE_URL_PROFILES + name + '/media', options);
    
  }
  useEffect(() => {
    if (information && !isItLoading && !isItError) {
      setOpenModal(true);
      setModalTitle('Success!');
      setModalInfo('Your profile picture has been changed!');
      setUserInfo(userInfo => ({...userInfo, avatar: information.avatar}));

      
    }
  }, [information, isItLoading, isItError]);

  if (isLoading) {
    
    return (
      <div className="App">

    <p>Loading...</p>
      
      </div>
    )
  }
  if (!user) {
    return(
      <div className="App">
      <p>Please log in before viewing your profile</p>
      </div>
    )
  }
  if (isError) {
    return(        <div className="App">
    <p>An error occurred. Please try again.</p>
    </div>)

  }

  return (
    <div className="App">
      <h1>{data?.name}'s profile</h1>
      <ProfilePicture src={userInfo?.avatar} onClick={pfpChanger} alt={`${data.name}'s profile picture`} />
      <p>Is manager?: {data?.venueManager ? 'true' : 'false'}</p>

      <Box sx={{ width: '100%' }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Bookings" />
          {data?.venueManager ? <Tab label="Venues" /> : 'false'}
        </Tabs>
        <Box sx={{ p: 2 }}>
          <TabPanel value={tabValue} index={0}>
            <div>
              <h2>Bookings</h2>
              {data?.bookings?.map((booking) => (
                <div key={booking.id}>
                  <p>Booking id: {booking.id}</p>
                  <p>Booking start: {booking.dateFrom}</p>
                  <p>Booking end: {booking.dateTo}</p>
                  <p>Booking Guests: {booking.guests}</p>
                  <p>Booking venue: {booking.venue.name}</p>
                </div>
              ))}
            </div>
          </TabPanel>
          {data?.venueManager && (
            <TabPanel value={tabValue} index={1}>
              <div>
                <h2>Venues</h2>
                {data?.venues?.map((venue) => (
                  <div key={venue.id}>
                    <p>Venue id: {venue.id}</p>
                    <p>Venue name: {venue.name}</p>
                    <p>Venue description: {venue.description}</p>
                    <p>Venue price: {venue.price}</p>
                    <p>Venue max guests: {venue.maxGuests}</p>
                  </div>
                ))}
              </div>
            </TabPanel>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
