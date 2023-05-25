import { useForm } from "react-hook-form";
import { FormField } from "../components/formfield/Formfield";
import { yupResolver } from "@hookform/resolvers/yup";
import { venueSchema } from "../utils/yupSchema";
import useCallApi from "../hooks/useCallApi";
import { AuthContext } from "../context/auth";
import {BASE_URL_VENUES} from '../utils/constants';
import { useState, useContext, useEffect } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { ModalContext } from "../context/modalContent";


const VenueCreate =  () => {
  const {setOpenModal, setModalInfo, setModalTitle} = useContext(ModalContext);
  const {token} = useContext(AuthContext)
  const [internet, setInternet] = useState(false);
  const [parkingSpace, setParkingSpace] = useState(false);
  const [breakfastMeal, setbreakfastMeal] = useState(false);
  const [petFriendly, setpetFriendly] = useState(false);

  const [media, setMedia] = useState([]);
  
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(venueSchema),
  });

  
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const { startFetch, information, isItLoading, isItError } = useCallApi();

  async function onSubmit(venueData) {
console.log(venueData);
if (media[0]) {
  venueData.media = [media[0]];
  console.log("bilder",venueData.media);
} 

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
        media : venueData.media,
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

  useEffect(() => {
    if (information && !isItLoading && !isItError) {
      setOpenModal(true);
      setModalTitle('Success!');
      setModalInfo('Venue was created');
    }
  }, [information, isItLoading, isItError]);

  
  const handleMediaInputChange = (event) => {
    const imageValue = event.target.value;
    if (imageValue.match(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)$/i)) {
      setMedia([...media, imageValue]);
      event.target.value = '';
    }
  };

  const removeMedia = (mediaValue) => {
    setMedia(media.filter((item) => item !== mediaValue));
  };
  if (!token ) {
    return (
    <div className="App">
<p>please log in before trying to create a venue</p>
</div>
    );
  }
  if (!userInfo?.venueManager) {
    return (
    <div className="App">
<p>Only Venue managers can list venues.</p></div>
  )}
  
    return (

<div className="App">

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
        inputProps={{ onChange: handleMediaInputChange }}
      />
      {media.map((mediaItem, index) => (
        <div key={index}>
          <img src={mediaItem} alt={`Media ${index}`} />
          <button onClick={() => removeMedia(mediaItem)}>Remove</button>
        </div>
      ))}


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

</div>
    );
  };
  
  export default VenueCreate;