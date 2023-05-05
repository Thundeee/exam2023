import useApi from "../hooks/useApi";
import { BASE_URL_VENUES } from "../utils/constants";
import { useParams } from "react-router-dom";

const Venue =  () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useApi(BASE_URL_VENUES + id);
    console.log(data);
    return (

<div className="App">
{isLoading && <p>Loading...</p>}
{isError && <p>Something went wrong</p>}
<h1>{data.name}</h1>
<p>{data.description}</p>
<p>{data.maxGuests}</p>



</div>
    );
  };
  
  export default Venue;