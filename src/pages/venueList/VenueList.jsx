import React from "react";
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import heroImage from "../../assets/heroImage.avif";
import useApi from "../../hooks/useApi";
import { BASE_URL_VENUES } from "../../utils/constants";
import { Link } from "react-router-dom";
import { Typography, Button, Tooltip, Fade, useTheme } from "@mui/material";
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
} from "./venueList.styles";

const VenueList = () => {
  const theme = useTheme();
  const { data, isLoading, isError } = useApi(BASE_URL_VENUES);
  const [search, setSearch] = React.useState([]);

  React.useEffect(() => {
    if (data) {
      setSearch(data);
    }
  }, [data]);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const searchFilter = data.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.location.city.toLowerCase().includes(value)
    );
    setSearch(searchFilter);
  };

  const descDecreaser = (description) => {
    if (description.length <= 300) {
      return description;
    }
    return description.substring(0, 150) + "...";
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>An error occurred. Please try again.</p>;
  }

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom marginTop={1}>
        Browse Venues
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        A good time starts with a great venue!
      </Typography>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "400px",
          overflow: "hidden",
        }}
      >
        <img
          src={heroImage}
          alt="Hero"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            padding: "16px",
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        >
          <TextField
            id="searchField"
            label="Search for a Venue or City"
            color="secondary"
            type="search"
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton disabled>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
              disableUnderline: true,
              style: { color: "black" },
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: "75%",
          margin: " 0 auto",
          mt: "50px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
          '@media (max-width: 1200px)': {
            gridTemplateColumns: "repeat(1, 1fr)",
          },

        }}
      >
        {search.length > 0 ? (
          search.map((venue) => (
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
                  Price: {venue.price},- | Max Guests: {venue.maxGuests}
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
                <ul style={{          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",}}>
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

                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/Venue/${venue.id}`}
                >
                  View Details
                </Button>
              </VenueImageWrapper>
            </VenueWrapper>
          ))
        ) : (
          <Typography variant="body1">No venues found.</Typography>
        )}
      </Box>
    </div>
  );
};

export default VenueList;
