import React, { useContext, useState, useEffect } from 'react';
import useApi from '../../hooks/useApi';
import { BASE_URL_PROFILES, BASE_URL_VENUES } from '../../utils/constants';
import { AuthContext } from '../../context/auth';
import { Typography, Button, useTheme, Tab, Tabs, Box } from "@mui/material";
import defaultVenue from "../../assets/defaultVenue.webp";
import { Link } from "react-router-dom";
import defaultPfp from '../../assets/defaultPfp.png';
import TabPanel from '../../components/TabPanel';
import useCallApi from '../../hooks/useCallApi';
import { ModalContext } from '../../context/modalContent';
import useLocalStorage from '../../hooks/useLocalStorage';
import { ProfilePicture, VenueWrapper, VenueInfoWrapper, VenueImageWrapper } from './profile.styles';
import Metas from '../../components/Metas';

const Profile = () => {
  const [userInfo, setUserInfo] = useLocalStorage('userInfo', '');
  const theme = useTheme();
  const { token } = useContext(AuthContext);
  const { setOpenModal, setModalInfo, setModalTitle } = useContext(ModalContext);
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

  const { data, isLoading, isError } = useApi(BASE_URL_PROFILES + name + '?_bookings=true&_venues=true', options);

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
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    );
  };

  async function onSubmit(event) {
    event.preventDefault();
    let link = {};
    link.avatar = event.target.avatar.value;
    let validLink = link.avatar.match(/(^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)$)|(^$)/);
    if (!validLink) {
      setOpenModal(true);
      setModalTitle('Invalid link');
      setModalInfo(
        <div>
          <p>Please enter a valid image URL</p>
        </div>
      );
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

  const handleDelete = async (id) => {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    };
    await startFetch(BASE_URL_VENUES + id, options);
    data.venues = data.venues.filter((venue) => venue.id !== id);


  };



  useEffect(() => {
    if (information && !isItLoading && !isItError) {
      if (!information.avatar) {
        information.avatar = defaultPfp;
      }
      setOpenModal(true);
      setModalTitle('Success!');
      setModalInfo('Your profile picture has been changed!');
      setUserInfo((userInfo) => ({ ...userInfo, avatar: information.avatar }));
    }
  }, [information, isItLoading, isItError]);

  if (isLoading) {
    return (
      <div className="App">
        <p>Loading...</p>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="App">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="App">
        <p>Error fetching data. Please try again later.</p>
      </div>
    );
  }

  const descDecreaser = (description) => {
    if (description.length <= 150) {
      return description;
    }
    return description.substring(0, 150) + "...";
  };
  

  return (
    <div>
      <div>
        <ProfilePicture onClick={pfpChanger} src={userInfo?.avatar} alt="your profile picture"/>
        <h2 style={{textAlign: 'center'}}>Hi, {data?.name}!</h2>
        <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ bgcolor: 'tertiary.main', width: 'fit-content', margin: '0 auto'}}>
          <Tab label="Upcoming Bookings" sx={{ color: 'black',}} />
          <Tab label="Your Venues" sx={{ color: 'black'}}/>
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <div style={{ margin: "0 auto", minWidth: "100%", }}>
            {data?.bookings?.map((booking) => (
              <Box
                sx={{
                  width: "50%",
                  margin: " 0 auto",
                  mt: "30px",
                  display: "grid",
                  gridTemplateColumns: "repeat(1, 1fr)",
                }}
              >
                <VenueWrapper
                  key={booking.id}
                  backgroundColor={theme.palette.tertiary.main}
                >
                  <VenueInfoWrapper>
                    <Typography variant="h5">{booking.venue.name}</Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontStyle: "italic" }}
                    >
                      Guests: {booking.guests}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "14px",
                        width: "100%",
                      }}
                    >
                      {descDecreaser(booking.venue.description)}
                    </Typography>
                    <Metas path={booking.venue.meta} />

                  </VenueInfoWrapper>
                  <VenueImageWrapper>
                    <img
                      src={booking.venue.media[0] ? booking.venue.media[0] : defaultVenue}
                      alt={booking.venue.name}
                      style={{
                        width: "250px",
                        height: "250px",
                        objectFit: "cover",
                        marginBottom: "1rem",
                        border: "1px solid black",
                      }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/Venue/${booking.venue.id}`}
                    >
                      View Details
                    </Button>
                  </VenueImageWrapper>
                </VenueWrapper>
              </Box>
            ))}
          </div>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <div>
            {data?.venues?.map((venue) => (
              <Box
                sx={{
                  width: "50%",
                  margin: " 0 auto",
                  mt: "30px",
                  display: "grid",
                  gridTemplateColumns: "repeat(1, 1fr)",
                }}
              >
                <VenueWrapper
                  key={venue.id}
                  backgroundColor={theme.palette.tertiary.main}
                >
                  <VenueInfoWrapper>
                    <Typography variant="h5">{venue.name}</Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontStyle: "italic" }}
                    >
                      Max Guests: {venue.maxGuests}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: "14px",
                        width: "100%",
                      }}
                    >
                      {descDecreaser(venue.description)}
                    </Typography>
                  <Metas path={venue.meta} />
                  </VenueInfoWrapper>
                  <VenueImageWrapper>
                    <img
                      src={venue.media[0] ? venue.media[0] : defaultVenue}
                      alt={venue.name}
                      style={{
                        width: "250px",
                        height: "250px",
                        objectFit: "cover",
                        marginBottom: "1rem",
                        border: "1px solid black",
                      }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/Venue/${venue.id}`}
                    >
                      View Venue
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      style={{ marginTop: "1rem" }}
                      component={Link}
                      to={`/Venue/edit/${venue.id}`}
                    >
                      Edit Venue
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      style={{ marginTop: "1rem" }}
                      onClick={() => handleDelete(venue.id)}
                    >
                      Delete Venue
                    </Button>
                  </VenueImageWrapper>
                </VenueWrapper>
              </Box>
            ))}
          </div>
        </TabPanel>
      </div>
    </div>
  );
};

export default Profile;
