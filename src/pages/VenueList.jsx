import useApi from "../hooks/useApi";
import { BASE_URL_VENUES } from "../utils/constants";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
const VenueList =  () => {

    const { data, isLoading, isError } = useApi(BASE_URL_VENUES);

    console.log(data);

    const [search, setSearch] = useState([]);

    useEffect(() => {
      if (data) {
        setSearch(data);
      }
    }, [data]);

    const searcher = (event) => {
      let value = event.target.value;
      setSearch(value);
    

    
    const searchFilter = data.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase()) ||
    item.location.city.toLowerCase().includes(value.toLowerCase())
    );
    setSearch(searchFilter);

  };
    if (isLoading) {
        return <p>Loading...</p>;
      }
      if (isError) {
        return <p>An error occured please try again.</p>;
      }

    return (

<div className="App">
<h1>venuelist</h1>
<TextField id="searchField" label="Search for a Venue or City" variant="outlined" color="secondary" type="search" onChange={searcher}
 />
{search && search.length > 0 ? (
      search.map((venue) => (
        <div key={venue.id}>
          <h2>{venue.name}</h2>{" "}
          <Link to={`/Venue/${venue.id}`}>View</Link>{" "}
        </div>
      ))
    ) : (
      <p>No venues found.</p>
    )}
</div>
    );
  };
  
  export default VenueList;