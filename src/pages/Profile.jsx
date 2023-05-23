import useApi from "../hooks/useApi";
import { BASE_URL_PROFILES } from "../utils/constants";
import { AuthContext } from "../context/auth";
import { useContext } from "react";

const Profile =  () => {

    const {token} = useContext(AuthContext)
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

    const { data, isLoading, isError } = useApi(BASE_URL_PROFILES + name + "?_bookings=true&_venues=true", options);
    console.log(data);
    
    if (isLoading) {
        return <p>Loading...</p>;
      }
      if (!userInfo) {
        return <p>please log in before viewing your profile</p>;
      }
      if (isError) {
        return <p>An error occured please try again.</p>;
      }

      if (!data.avatar) {
        data.avatar = 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';

      }
    return (

<div className="App">

    {data && <>
    <h1>{data.name}'s profile</h1>
    <img src={data.avatar} alt={`${data.name}'s profile picture`} ></img>
    <p>is manager?: {data.venueManager ? "true" : "false"}</p>
</>
}
</div>
    );
  };
  
  export default Profile;