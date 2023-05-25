import useApi from "../hooks/useApi";
import { BASE_URL_VENUES } from "../utils/constants";
import { Link } from "react-router-dom";
import { TextField, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import defaultVenue from "../assets/defaultVenue.webp";

const VenueList = () => {
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

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>An error occurred. Please try again.</p>;
  }

  return (
    <Box sx={{ width: "75%", margin: "0 auto", mt: "5px", }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        All Venues
      </Typography>
      <TextField
        id="searchField"
        label="Search for a Venue or City"
        variant="outlined"
        color="tertiary"
        type="search"
        fullWidth
        onChange={searcher}
        sx={{ mb: 2, }}
      />
      {search.length > 0 ? (
        search.map((venue) => (
          <Box
            key={venue.id}
            sx={{
              border: "1px solid #ccc",
              borderRadius: 4,
              p: 2,
              mb: 2,
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              backgroundColor: "tertiary.main",
              color: "black",
              inlineSize: "fit-content",
            }}
          >
            <div style={{ marginRight: "1rem" }}>
              <Typography variant="h5">{venue.name}</Typography>
              <Typography variant="subtitle1">
                Price: {venue.price},- / Night | Max Guests: {venue.maxGuests}
              </Typography>
              <Typography variant="body1" style={{ fontSize: "14px", maxHeight: "60px", overflow: "hidden" }}>
                {venue.description}
              </Typography>
              <Typography variant="subtitle2">Meta:</Typography>
              <ul>
                <li>WiFi: {venue.meta.wifi ? "Available" : "Not Available"}</li>
                <li>Parking: {venue.meta.parking ? "Available" : "Not Available"}</li>
                <li>Breakfast: {venue.meta.breakfast ? "Available" : "Not Available"}</li>
                <li>Pets: {venue.meta.pets ? "Allowed" : "Not Allowed"}</li>
              </ul>
            </div>
            <div style={{ flex: 1, marginLeft: "1rem", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
            {venue.media[0] ? (
                <img
                  src={venue.media[0]}
                  alt={venue.name}
                  style={{ width: "250px", height: "250px", objectFit: "cover", marginBottom: "1rem" }}
                />
              ) : (
                <img
                  src={defaultVenue}
                  alt={venue.name}
                  style={{ width: "250px", height: "250px", objectFit: "cover", marginBottom: "1rem" }}
                />
              )}
              <Button variant="contained" color="primary" component={Link} to={`/Venue/${venue.id}`}>
                View Details
              </Button>
            </div>
          </Box>
        ))
      ) : (
        <Typography variant="body1">No venues found.</Typography>
      )}
    </Box>
  );
};

export default VenueList;
