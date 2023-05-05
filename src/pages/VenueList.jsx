import useApi from "../hooks/useApi";
import { BASE_URL_VENUES } from "../utils/constants";
import { Link } from "react-router-dom";

const VenueList =  () => {

    const { data, isLoading, isError } = useApi(BASE_URL_VENUES);


    console.log(data);

    return (

<div className="App">
<h1>venuelist</h1>
{isLoading && <p>Loading...</p>}
{isError && <p>Something went wrong</p>}
{data && data.map((venue) => <div key={venue.id}><h2>{venue.name}</h2> <Link to={`/Venue/${venue.id}`}>View</Link> </div>)}

</div>
    );
  };
  
  export default VenueList;