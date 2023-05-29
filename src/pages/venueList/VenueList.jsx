import { useState, useEffect } from "react";	
import { TextField, InputAdornment, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import heroImage from "../../assets/heroImage.avif";
import useApi from "../../hooks/useApi";
import { BASE_URL_VENUES } from "../../utils/constants";
import { Link } from "react-router-dom";
import { Typography, Button, useTheme } from "@mui/material";
import defaultVenue from "../../assets/defaultVenue.webp";
import Metas from "../../components/Metas";
import {
  VenueWrapper,
  VenueInfoWrapper,
  VenueImageWrapper,
} from "./venueList.styles";
import { debounce } from "lodash";
import Loader from "../../components/Loader";
import Errorer from "../../components/Errorer";


const VenueList = () => {
  const theme = useTheme();
  const { data, isLoading, isError } = useApi(BASE_URL_VENUES);
  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (data) {
      setSearch(data);
      setLoading(false);

    }
  }, [data]);

  const delayedSearch = (
    debounce((value) => {
      const searchFilter = data.filter(
        (item) =>
          item.name.toLowerCase().includes(value) ||
          item.location.city.toLowerCase().includes(value)
      );
      setSearch(searchFilter);

    }, 250)
    
  );

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    delayedSearch(value);
  };
  const descDecreaser = (description) => {
    if (description.length <= 150) {
      return description;
    }
    return description.substring(0, 150) + "...";
  };

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <Errorer />
  }

  return (
    <div className="App">
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
              style: { color: "black" },
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          width: "75%",
          margin: " 0 auto",
          mt: "30px",
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
          '@media (max-width: 1200px)': {
            gridTemplateColumns: "repeat(1, 1fr)",
          },

        }}
      >
        {loading ? (
          <Loader />
        ) : search.length > 0 ? (
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
                    border : "1px solid black"
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
