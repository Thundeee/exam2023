import { useForm } from "react-hook-form";
import { FormField } from "../components/formfield/Formfield";
import { yupResolver } from "@hookform/resolvers/yup";
import { venueSchema } from "../utils/yupSchema";
import useCallApi from "../hooks/useCallApi";
import { AuthContext } from "../context/auth";
import {BASE_URL_VENUES} from '../utils/constants';
import { useContext } from "react";


const VenueCreate =  () => {

    
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
          wifi: true, 
          parking: true, 
          breakfast: true, 
          pets: true 
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
<h1>venueCreate</h1>

<form id="venueForm" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="name"
          label="Venue Name"
            type="name"
          register={register}
          errors={errors}
        />

        <FormField
          name="description"
          label="Venue Description"
          type="description"
          register={register}
          errors={errors}
        />

<FormField
          name="media"
          label="Media"
          type="media"
          register={register}
          errors={errors}
        />

<FormField
          name="price"
          label="Price per night"
          type="price"
          register={register}
          errors={errors}
        />

<FormField
          name="maxGuests"
          label="Maximum Guests"
          type="maxGuests"
          register={register}
          errors={errors}
        />
<FormField
          name="address"
          label="Address"
          type="address"
          register={register}
          errors={errors}
        />

<FormField
          name="city"
          label="City"
          type="city"
          register={register}
          errors={errors}
        />

<FormField
          name="zip"
          label="Zip Code"
          type="zip"
          register={register}
          errors={errors}
        />

<FormField
          name="country"
          label="Country"
          type="country"
          register={register}
          errors={errors}
        />
        
        <button type="submit" variant="contained" color="primary">
            Submit
            </button>

        </form>
</div>
    );
  };
  
  export default VenueCreate;