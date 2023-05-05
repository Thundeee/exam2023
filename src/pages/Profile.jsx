import useApi from "../hooks/useApi";
import { BASE_URL_PROFILES } from "../utils/constants";
import { AuthContext } from "../context/auth";
import { useContext } from "react";

const Profile =  () => {

    const {token} = useContext(AuthContext)
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let options;
    let name
    if (userInfo) {
        options = {
            headers: {
                Authorization: `Bearer ${userInfo.accessToken}`,
            },
        };
        name = userInfo.name;
    }

    const { data, isLoading, isError } = useApi(BASE_URL_PROFILES + name, options);
    console.log(data);

    return (

<div className="App">
    {isLoading && <p>Loading...</p>}
    {isError && <p>Something went wrong</p>}
    {!userInfo && <p>please log in before viewing your profile</p>}
    {data && <>
    <h1>{data.name}'s profile</h1>
    <img src={data.avatar}></img>
    <p>is manager?: {data.venueManager ? "true" : "false"}</p>
</>
}
</div>
    );
  };
  
  export default Profile;