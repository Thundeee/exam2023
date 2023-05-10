import useApi from "../hooks/useApi";
import { BASE_URL_VENUES } from "../utils/constants";
import { Link } from "react-router-dom";

const VenueList =  () => {

    const { data, isLoading, isError } = useApi(BASE_URL_VENUES);


    console.log(data);

    if (isLoading) {
        return <p>Loading...</p>;
      }
      if (isError) {
        return <p>An error occured please try again.</p>;
      }

    return (

<div className="App">
<h1>venuelist</h1>
{data && data.map((venue) => <div key={venue.id}><h2>{venue.name}</h2> <Link to={`/Venue/${venue.id}`}>View</Link> </div>)}

</div>
    );
  };
  
  export default VenueList;