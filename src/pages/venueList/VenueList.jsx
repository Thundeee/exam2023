import useApi from "../../hooks/useApi";
import { BASE_URL_VENUES } from "../../utils/constants";
import { Link } from "react-router-dom";
import { TextField, Typography, Button, Tooltip, Fade, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import defaultVenue from "../../assets/defaultVenue.webp";
import WifiIcon from "@mui/icons-material/Wifi";
import PetsIcon from "@mui/icons-material/Pets";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import {
  VenueWrapper,
  VenueInfoWrapper,
  VenueImageWrapper,
  Description,
} from "./venueList.styles";


const VenueList = () => {

  const theme = useTheme();

  const { data, isLoading, isError } = useApi(BASE_URL_VENUES);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    if (data) {
      setSearch(data);
    }
  }, [data]);

  const searcher = (event) => {
    let value = event.target.value;
    const searchFilter = data.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.location.city.toLowerCase().includes(value.toLowerCase())
    );
    setSearch(searchFilter);
  };

  const descDecreaser = (description) => {
    if (description.length <= 500) {
      return description;
    }
    return description.substring(0, 500) + "...";
  };

  if (isLoading) {
    return (
      <div className="App">
        <p>Loading...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="App">
        <p>An error occurred. Please try again.</p>
      </div>
    );
  }

  return (
    <Box sx={{ width: "75%", margin: "0 auto", mt: "5px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Browse Venues
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        A good time starts with a great venue!
      </Typography>
      <TextField
        id="searchField"
        label="Search for a Venue or City"
        color="tertiary"
        type="search"
        fullWidth
        onChange={searcher}
        sx={{ mb: 5 }}
      />
      {search.length > 0 ? (
        search.map((venue) => (
          <VenueWrapper key={venue.id} backgroundColor={theme.palette.tertiary.main}>
            <VenueInfoWrapper>
              <Typography variant="h5">{venue.name}</Typography>
              <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>
                Price: {venue.price},- | Max Guests: {venue.maxGuests}
              </Typography>
              <Description
                variant="body1"
                sx={{
                  fontSize: "14px",
                  maxHeight: "60px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%",
                }}
              >
                {descDecreaser(venue.description)}
              </Description>
              <ul>
                <li>
                  <Tooltip
                    title="WiFi"
                    placement="right-end"
                    arrow
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                  >
                    <WifiIcon />
                  </Tooltip>
                  {venue.meta.wifi ? (
                    <CheckIcon style={{ color: "green" }} />
                  ) : (
                    <ClearIcon style={{ color: "red" }} />
                  )}
                </li>
                <li>
                  <Tooltip
                    title="Parking"
                    placement="right-end"
                    arrow
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                  >
                    <LocalParkingIcon />
                  </Tooltip>
                  {venue.meta.parking ? (
                    <CheckIcon style={{ color: "green" }} />
                  ) : (
                    <ClearIcon style={{ color: "red" }} />
                  )}
                </li>
                <li>
                  <Tooltip
                    title="Breakfast"
                    placement="right-end"
                    arrow
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                  >
                    <FreeBreakfastIcon />
                  </Tooltip>
                  {venue.meta.breakfast ? (
                    <CheckIcon style={{ color: "green" }} />
                  ) : (
                    <ClearIcon style={{ color: "red" }} />
                  )}
                </li>
                <li>
                  <Tooltip
                    title="Pets"
                    placement="right-end"
                    arrow
                    TransitionComponent={Fade}
                    TransitionProps={{ timeout: 600 }}
                  >
                    <PetsIcon />
                  </Tooltip>
                  {venue.meta.pets ? (
                    <CheckIcon style={{ color: "green" }} />
                  ) : (
                    <ClearIcon style={{ color: "red" }} />
                  )}
                </li>
              </ul>
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
                }}
              />

              <Button variant="contained" color="primary" component={Link} to={`/Venue/${venue.id}`}>
                View Details
              </Button>
            </VenueImageWrapper>
          </VenueWrapper>
        ))
      ) : (
        <Typography variant="body1">No venues found.</Typography>
      )}
    </Box>
  );
};

export default VenueList;
