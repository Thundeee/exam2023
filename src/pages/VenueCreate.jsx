import { useForm } from "react-hook-form";
import { FormField } from "../components/formfield/Formfield";
import { yupResolver } from "@hookform/resolvers/yup";
import { venueSchema } from "../utils/yupSchema";
import useCallApi from "../hooks/useCallApi";
import { AuthContext } from "../context/auth";
import {BASE_URL_VENUES} from '../utils/constants';
import { useState, useContext } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const VenueCreate =  () => {
  const {token} = useContext(AuthContext)
  const [internet, setInternet] = useState(false);
  const [parkingSpace, setParkingSpace] = useState(false);
  const [breakfastMeal, setbreakfastMeal] = useState(false);
  const [petFriendly, setpetFriendly] = useState(false);

    
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(venueSchema),
  });

  
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const { startFetch, data, isLoading, isError } = useCallApi();

  async function onSubmit(venueData) {
console.log(venueData);
    const modifiedData = {
        ...venueData,
        meta: {
          wifi: internet, 
          parking: parkingSpace, 
          breakfast: breakfastMeal, 
          pets: petFriendly 
        },
        location: {
          address: venueData.address,
          city: venueData.city,
          country: venueData.country,
          zip: venueData.zip,
          continent: "Unknown",
          lat: 0,
          lng: 0 

        },
        rating: 0,
        media : [venueData.media]
      };
      
      delete modifiedData.address;
      delete modifiedData.city;
      delete modifiedData.country;
      delete modifiedData.zip;

    console.log(modifiedData);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
      body: JSON.stringify(modifiedData),
    };
    await startFetch(BASE_URL_VENUES, options);
  }


  
    return (

<div className="App">
{!token && <p>please log in before trying to create a venue</p>}
{token && !userInfo.venueManager && <p>Only Venue managers can list venues.</p>}
{token && userInfo.venueManager &&
 <>
  <form id="venueForm" onSubmit={handleSubmit(onSubmit)}>
  <FormField
    name="name"
    label="Venue Name"
    type="text"
    register={register}
    errors={errors}
  />

  <FormField
    name="description"
    label="Venue Description"
    type="text"
    register={register}
    errors={errors}
  />

<FormField
    name="media"
    label="Media"
    type="text"
    register={register}
    errors={errors}
  />

<FormField
    name="price"
    label="Price per night"
    type="text"
    register={register}
    errors={errors}
  />

<FormField
    name="maxGuests"
    label="Maximum Guests"
    type="text"
    register={register}
    errors={errors}
  />
          <FormControlLabel control={<Switch onChange={()=>setInternet(!internet)} />} label="Wifi?" />
          <FormControlLabel control={<Switch onChange={()=>setParkingSpace(!parkingSpace)} />} label="Parking?" />
          <FormControlLabel control={<Switch onChange={()=>setbreakfastMeal(!breakfastMeal)} />} label="Breakfast?" />
          <FormControlLabel control={<Switch onChange={()=>setpetFriendly(!petFriendly)} />} label="Pets?" />
<FormField
    name="address"
    label="Address"
    type="text"
    register={register}
    errors={errors}
  />

<FormField
    name="city"
    label="City"
    type="text"
    register={register}
    errors={errors}
  />

<FormField
    name="zip"
    label="Zip Code"
    type="text"
    register={register}
    errors={errors}
  />

<FormField
    name="country"
    label="Country"
    type="text"
    register={register}
    errors={errors}
  />
  
  <button type="submit" variant="contained" color="primary">
      Submit
      </button>

  </form>

</>
    }


      

</div>
    );
  };
  
  export default VenueCreate;