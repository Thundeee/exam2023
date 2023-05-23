import React, { useContext, useState } from 'react';
import useApi from '../hooks/useApi';
import { BASE_URL_PROFILES } from '../utils/constants';
import { AuthContext } from '../context/auth';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import  TabPanel  from '../components/TabPanel';

const Profile = () => {
  const { token } = useContext(AuthContext);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  let options;
  let name;
  if (userInfo) {
    options = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };
    name = userInfo.name;
  }

  const { data, isLoading, isError } = useApi(
    BASE_URL_PROFILES + name + '?_bookings=true&_venues=true',
    options
  );
  console.log(data);

  const [tabValue, setTabValue] = useState(0);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!userInfo) {
    return <p>Please log in before viewing your profile</p>;
  }
  if (isError) {
    return <p>An error occurred. Please try again.</p>;
  }

  if (!data.avatar) {
    data.avatar =
      'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className="App">
      <h1>{data?.name}'s profile</h1>
      <img src={data?.avatar} alt={`${data.name}'s profile picture`} />
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
